import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  listStudents: any[]=[];
  accion = 'ADD';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _studentService: StudentService){
    this.form = this.fb.group({
      txtUsername:['',Validators.required],
      txtFirstName:['',Validators.required],
      txtLastName:['',Validators.required],
      txtAge:['',Validators.required],
      txtCareer:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.getStudents();
  }
// get the list of students to fill the table 
  getStudents(){
    this._studentService.getListStudent().subscribe(data => {
      //console.log(data);
      this.listStudents = data;
    }, error =>{
      console.log(error);
    });
  }

  //insert students
  saveStudent(){    
    const student: any ={
      Username: this.form.get('txtUsername')?.value,
      FirstName: this.form.get('txtFirstName')?.value,
      LastName: this.form.get('txtLastName')?.value,
      Age: this.form.get('txtAge')?.value,
      Career: this.form.get('txtCareer')?.value
    }

    //if id variable is undefined create a new register but if id has value will update this register with this id   
    if(this.id==undefined){
      this._studentService.saveStudent(student).subscribe(data => {
        this.toastr.success('The student was successfully registered', 'Registered student');
        this.getStudents();
        this.form.reset();
      },error =>{
        this.toastr.error('An error occurred while registering the student', 'Error');
        console.log(error);
      });
    }else{
      student.id = this.id;
      this._studentService.updateStudent(this.id, student).subscribe(data =>{
        this.form.reset();
        this.accion = 'ADD';
        this.id = undefined;
        this.toastr.info('The student was successfully updated','Updated student');
        this.getStudents();
      },error =>{
        this.toastr.error('An error occurred while updating the student', 'Error');
        console.log(error);
      });
    }
  }

  //delete students
  deleteStudent(id: number) {
    this._studentService.deleteStudent(id).subscribe(data=>{
      this.toastr.error('The student was successfully eliminated', 'Eliminated student');
      this.getStudents();
    }, error =>{
      console.log(error);
    });
  }

  //set data of students in the form for update student
  editStudent (student: any){
    this.accion = 'UPDATE';
    this.id = student.id;

    this.form.patchValue({
      txtUsername: student.username,
      txtFirstName: student.firstName,
      txtLastName: student.lastName,
      txtAge: student.age,
      txtCareer: student.career
    })
  }
}
