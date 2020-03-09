
//dependencies 
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//models 
import { wellCondition } from 'src/app/models/config-master/criticalRequirements/wellCondition';
import { operationCondition } from 'src/app/models/config-master/criticalRequirements/operationCondition';
import { hseCondition } from 'src/app/models/config-master/criticalRequirements/hseCondition'; 
import { technologyCondition} from 'src/app/models/config-master/criticalRequirements/technologyCondition';
import { Notification } from 'src/app/models/notification/notification';
import { Departments } from 'src/app/models/config-master/deparments/deparments';


//services 
import { CriticalRequirementsService } from 'src/app/services/config-master/criticalReq/critical-requirements.service';
import { DeparmentsService } from '../../../../services/config-master/deparments/deparments.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';

import { from } from 'rxjs';

var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 


@Component({
  selector: 'app-critical-req',
  templateUrl: './critical-req.component.html',
  styleUrls: ['./critical-req.component.css'], 
  providers: [CriticalRequirementsService, DeparmentsService, EmailsService , NotificationsService]
})
export class CriticalReqComponent implements OnInit {

  //variables globales 

  public selectList:string[] | wellCondition[] | operationCondition[] | hseCondition[] | technologyCondition[];
  public moduleName:string; 
  public moduleSelected:number=0; 
  public placeholder:string; 
  public placeholder2:string; 
  form:string; 

  constructor(
    private CriticalRequirementsService:CriticalRequirementsService,
    private departmentService: DeparmentsService, 
    private EmailsService:EmailsService, 
    private NotificationsService:NotificationsService, 
  ) { }

  ngOnInit() {
    this.materializecss();
    this.findServiceLine()
  
  }
  materializecss(){
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      //var instances = M.FormSelect.init(elems, options);
    });
  }

  //linea de servicio
  findServiceLine(){

    // this.departmentService.getDepartments().subscribe 
    // (res => {
    //   this.departmentService.departments = res as Departments[];
    //   console.log('departamentos:' , this.departmentService.departments )
    // });
  }


  enableLocation(n){


    this.placeholder2= 'Ingrese una justificación *opcional* ';
    if (n == 0){
      M.toast({
        html: 'Ocultado'
        })
      this.moduleSelected = 0; 
    }
    if (n == 1){
      this.moduleSelected = n; 
      this.moduleName= 'Condiciones críticas de Pozo'; 
      this.placeholder= 'Ingrese condición crítica de pozo';
      console.log('condiciones de pozo')
      this.CriticalRequirementsService.getWellConditions()
        .subscribe
        (res => {
          this.CriticalRequirementsService.wellCondition = res as wellCondition[];
          this.selectList =  this.CriticalRequirementsService.wellCondition;
          console.log('lista de condiciones criticas seleccionada', this.selectList )
        });
      
    }
    if (n == 2){
      this.moduleSelected = 1; 
      this.moduleName= 'Condiciones críticas de Operación';
      this.placeholder= 'Ingrese condición crítica de Operación';
      console.log('Condiciones de operación')
      this.CriticalRequirementsService.getOperationConditions()
      .subscribe
      (res => {
        this.CriticalRequirementsService.operationCondition = res as operationCondition[]; 
        this.selectList =  this.CriticalRequirementsService.operationCondition; 
        console.log('lista de condiciones criticas seleccionada', this.selectList )
      });
  
    }
    if (n == 3){
      this.moduleSelected = 1; 
      this.moduleName= 'Condiciones críticas de HSE / HSEQ'
      this.placeholder= 'Ingrese condición crítica de HSE / HSEQ ';
      console.log('Condiciones de HSE')
      this.CriticalRequirementsService.getHseConditions()
      .subscribe
      (res => {
        this.CriticalRequirementsService.hseConditicon = res as hseCondition[]; 
        this.selectList =  this.CriticalRequirementsService.hseConditicon;
        console.log('lista de condiciones criticas seleccionada', this.selectList )
      });
    }
    if (n ==4){
      this.moduleSelected = 1; 
      this.moduleName= 'Condiciones críticas de Tecnologías'
      this.placeholder= 'Ingrese condición crítica de Tecnologías';
      console.log('condiciones de Tecnología')
      this.CriticalRequirementsService.getTechnologyConditions()
      .subscribe
      (res => {
        this.CriticalRequirementsService.technologyCondition = res as technologyCondition[]; 
        this.selectList =  this.CriticalRequirementsService.technologyCondition;
        console.log('lista de condiciones criticas seleccionada', this.selectList )
      });
    }
    // console.log('lista de condiciones criticas seleccionada', this.selectList )
  }


  dinamicAddAndEdit(diferenciador, form?: NgForm){



  console.log(form.value); 

  if (diferenciador == 1)
  {


    if (form.value.ct == ''){
      form.value.ct = false; 
    }
    if (form.value.sl == ''){
      form.value.sl = false; 
    } 
    if (form.value.wt == ''){
      form.value.wt = false; 
    }
    if (form.value.wl == ''){
      form.value.wl = false; 
    }
    if (form.value.fi == ''){
      console.log('false')
      form.value.fi = false; 
    }

    if(this.moduleName == 'Condiciones críticas de Pozo')
    {
      // console.log(form.value); 
      this.CriticalRequirementsService.postWellCondition(form.value)
      .subscribe
      (res => {
        M.toast({
          html: 'Condición critica creada '
          })
          console.log(res);
          this.enableLocation(1);
      });
    }

    if(this.moduleName == 'Condiciones críticas de Operación')
    {
      // console.log(form.value); 
      this.CriticalRequirementsService.postOperationCondition(form.value)
      .subscribe
      (res => {
        M.toast({
          html: 'Condición critica creada '
          })
          console.log(res);
          this.enableLocation(2);
      });
    }

    if(this.moduleName == 'Condiciones críticas de HSE / HSEQ')
    {
      // console.log(form.value); 
      this.CriticalRequirementsService.postHseCondition(form.value)
      .subscribe
      (res => {
        M.toast({
          html: 'Condición critica creada '
          })
          console.log(res);
          this.enableLocation(3);
      });
    }



    if(this.moduleName == 'Condiciones críticas de Tecnologías')
    {
      // console.log(form.value); 
      this.CriticalRequirementsService.postTechnologyCondition(form.value)
      .subscribe
      (res => {
        M.toast({
          html: 'Condición critica creada '
          })
          console.log(res);
          this.enableLocation(4);
      });
    }
    this.resetForm(form); 


  //es un edit 
  }else{ 

    console.log('edit',form.value) 
 
  }
 
}

EditCriticalReq(form?: NgForm){
  
  console.log('edit',form.value) 
  console.log('module name ', this.moduleName)
  if (this.moduleName == 'Condiciones críticas de Pozo'){
  this.CriticalRequirementsService.putWellCondition(form.value)
  .subscribe
  (res => {
    console.log(res);
    M.toast({
      html: 'Condición critica Editada '
      })
  });

  }
  if(this.moduleName == 'Condiciones críticas de Operación'){
    this.CriticalRequirementsService.putOperationCondition(form.value)
    .subscribe
    (res => {
      console.log(res);
      M.toast({
        html: 'Condición critica Editada '
        })
    });
  }

  if(this.moduleName == 'Condiciones críticas de HSE / HSEQ'){
    this.CriticalRequirementsService.putHseCondition(form.value)
    .subscribe
    (res => {
      console.log(res);
      M.toast({
        html: 'Condición critica Editada '
        })
    });
  }
  if(this.moduleName == 'Condiciones críticas de Tecnologías')
  {
    this.CriticalRequirementsService.putTechnologyCondition(form.value)
    .subscribe
    (res => {
      console.log(res);
      M.toast({
        html: 'Condición critica Editada '
        })
    });
  }
 
}

resetForm(form?: NgForm) {
  form.reset();
}








}

