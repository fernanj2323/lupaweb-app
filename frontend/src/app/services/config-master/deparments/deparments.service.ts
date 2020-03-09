import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departments } from '../../../models/config-master/deparments/deparments';

@Injectable({
  providedIn: 'root'
})
export class DeparmentsService {
  selectedDepartment: Departments;
  departments: Departments[];
  readonly URL_API = "http://localhost:3000/api/departments";

  constructor(private http: HttpClient) { 
 //   this.selectedDepartment = new Departments();
  }

  getDepartments(){
    return this.http.get(this.URL_API);
  }
  getDepartment(department_id: String){
    return this.http.get(this.URL_API+`/${department_id}`);
  }
  postDepartment(Department: Departments){
    return this.http.post(this.URL_API, Department);
  }
  putDepartment(department: Departments){
    // console.log('put')
    return this.http.put(this.URL_API + `/${department._id}`, department);
  }
  deleteDepartment(_id: string)  {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}