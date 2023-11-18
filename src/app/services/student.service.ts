import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private myAppUrl = 'https://localhost:7052/';
  private myApiUrl = 'api/Students/';

  constructor(private http: HttpClient) { }

  getListStudent(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  
  deleteStudent(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  saveStudent(student: any): Observable <any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, student);
  }

  updateStudent(id: number, student: any): Observable <any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, student);
  }
}
