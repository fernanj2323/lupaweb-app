import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../../../models/config-master/teachers/teachers';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  selectedTeacher: Teacher;
  teachers: Teacher[];
  readonly URL_API = "http://localhost:3000/api/teachers";

  constructor(private http: HttpClient) { 
    //this.selectedTeacher = new Teacher();
  }

  getTeachers(){
    return this.http.get(this.URL_API);
  }
  getTeacher(teacher_id: String){
    return this.http.get(this.URL_API+`/${teacher_id}`);
  }
  postTeacher(teacher: Teacher){
    return this.http.post(this.URL_API, teacher);
  }
  putTeacher(teacher: Teacher){
    return this.http.put(this.URL_API + `/${teacher._id}`, teacher);
  }
  deleteTeacher(_id: string)  {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}