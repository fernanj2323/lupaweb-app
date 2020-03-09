import { Component, OnInit } from '@angular/core';
import { DeparmentsService } from '../../../../services/config-master/deparments/deparments.service';
import { Departments } from 'src/app/models/config-master/deparments/deparments';

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css'],
  providers: [DeparmentsService]
})
export class DepartmentsListComponent implements OnInit {

  constructor(
    public departmentService: DeparmentsService
  ) { }
  
  pageActual: number = 1;
  ngOnInit() {
    this.getDepartments();
  }

  //Obtener lista de linea de servicio
  getDepartments(){
    this.departmentService.getDepartments()
    .subscribe(res => {
      this.departmentService.departments = res as Departments[];
    });
  }

  //Delete
  deleteDepartment(_id){
    if(confirm('¿Esta seguro que desea Eliminar este registro?')){
      this.departmentService.deleteDepartment(_id)
      .subscribe(res => {
        this.getDepartments();
      });
    }
  }  
}
