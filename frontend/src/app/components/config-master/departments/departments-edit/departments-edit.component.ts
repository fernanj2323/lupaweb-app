import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DeparmentsService } from '../../../../services/config-master/deparments/deparments.service';
import { Departments } from '../../../../models/config-master/deparments/deparments';

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-departments-edit',
  templateUrl: './departments-edit.component.html',
  styleUrls: ['./departments-edit.component.css'],
  providers: [DeparmentsService]
})
export class DepartmentsEditComponent implements OnInit {

  constructor(
    public departmentsService: DeparmentsService, public route: ActivatedRoute
  ) { }

  ngOnInit() {
    const department_id = this.route.snapshot.params["_id"];
    this.getDepartment(department_id);
  }
  getDepartment(department_id: String){
    this.departmentsService.getDepartment(department_id)
    .subscribe(res=>{
      this.departmentsService.selectedDepartment = res as Departments;
    })
  }

  //This method is for edit deparment
  addDepartment(form?: NgForm) {
    if(confirm('Esta seguro que desea Editar este curso?')){
      if(form.value._id) { //si tiene un ID 
        this.departmentsService.putDepartment(form.value)
          .subscribe(res => {
            console.log(res);
            M.toast({
              html: 'Cambios realizados correctamente!'
              })
          });
          var url = (`/config/departments`);
          location.assign(url);
      } else {
        this.departmentsService.postDepartment(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Se guardo satisfactoriamente'});
        });
      }
    }
  }
  resetForm(form? : NgForm ){
    if (form){
      form.reset();
      //de esta forma reseteamos todo el formulario
     // this.departmentsService.selectedDepartment = new Departments ();
    }
  }   
}
