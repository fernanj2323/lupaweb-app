import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeparmentsService } from '../../../../services/config-master/deparments/deparments.service';
import { Departments } from '../../../../models/config-master/deparments/deparments';

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-departments-add',
  templateUrl: './departments-add.component.html',
  styleUrls: ['./departments-add.component.css'],
  providers: [DeparmentsService]
})
export class DepartmentsAddComponent implements OnInit {

  constructor(
    public departmentService: DeparmentsService
  ) { }

  ngOnInit() {
  }

  //Agregar curso a la BD
  addDepartment(form: NgForm){
    if(form.value.id) {
      this.departmentService.putDepartment(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Línea de servicio actualizada'});
        var url = (`config/departments`);
        location.assign(url);
      })
    }else{
      this.departmentService.postDepartment(form.value)
      .subscribe(res => {
        M.toast({ html: 'Línea de servicio agregada'});
        var url = (`config/departments`);
        location.assign(url);
      })
    }
  }

  //Reincia el form
  resetForm(form?: NgForm) {
    if(form){
      form.reset();
    //  this.departmentService.selectedDepartment = new Departments();
    }
  }  
  
}
