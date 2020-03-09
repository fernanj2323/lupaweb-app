import { Component, OnInit } from '@angular/core';
import  { JpactivityService } from 'src/app/services/jpactivity/jpactivity.service'  //update
import { Jpactivity } from 'src/app/models/jpactivity/jpactivity';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { CriticalRequirementsService } from 'src/app/services/config-master/criticalReq/critical-requirements.service';
import { from } from 'rxjs';
//models 
import { wellCondition } from 'src/app/models/config-master/criticalRequirements/wellCondition';
import { operationCondition } from 'src/app/models/config-master/criticalRequirements/operationCondition';
import { hseCondition } from 'src/app/models/config-master/criticalRequirements/hseCondition'; 
import { technologyCondition} from 'src/app/models/config-master/criticalRequirements/technologyCondition';
import { CriticalReq } from 'src/app/models/jpactivity/criticalReq';
import { JpQuestions } from 'src/app/models/jpactivity/jpQuestions';
import { Departments } from 'src/app/models/config-master/deparments/deparments';
import { User } from 'src/app/models/auth/user';
import { Notification } from 'src/app/models/notification/notification';

//services 
import { DeparmentsService } from 'src/app/services/config-master/deparments/deparments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { workPreparationQuestions } from 'src/app/models/eservices/workPreparationQuestions';
import { UserService } from 'src/app/services/users/user.service';
import { Profile } from 'src/app/models/users/profile';
import { workPreparation } from 'src/app/models/eservices/workPreparation';


var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-phase1',
  templateUrl: './phase1.component.html',
  styleUrls: ['./phase1.component.css']
})
export class Phase1Component implements OnInit {


  public managementId: string;
  //para capturar la linea de servicio del usuario logueado
  public wtsl : boolean =false; 
  public ctsl: boolean =false; 
  public slsl: boolean =false; 
  public wlsl: boolean =false; 
  public fisl: boolean =false; 

  //para capturar la linea de servicio del management

    public wtslM : number =0; 
    public ctslM: number =0; 
    public slslM: number =0; 
    public wlslM: number =0; 
    public fislM: number =0; 
    public userServiceLine: string; 

    //funciones de mostrar u ocultar 
    public showOb2q1: string; 
    public showOb3q1: string;  
    public showOb2q2:string; 
    public showOb3q2:string; 
    public showOb2q3:string; 
    public showOb3q3: string; 
    public showOb2q4:string; 
    public showOb3q4: string; 
    public showOb2q5:string; 
    public showOb3q5: string; 
    public showOb2q6:string; 
    public showOb3q6: string; 
    public showOb2q7:string; 
    public showOb3q7: string;
    public showOb2q8:string; 
    public showOb3q8: string; 
    public showOb2q9:string; 
    public showOb3q9: string; 
    public showOb2q10:string; 
    public showOb3q10: string; 
    public showOb2q11:string; 
    public showOb3q11: string; 
    public showOb2q12:string; 
    public showOb3q12: string; 
    public showOb2q13:string; 
    public showOb3q13: string; 
    public showOb2q14:string; 
    public showOb3q14: string; 
    public showOb2q15:string; 
    public showOb3q15: string;
    public showOb2q16:string; 
    public showOb3q16: string;
    public showOb2q17:string; 
    public showOb3q17: string; 
    public showOb2q18:string; 
    public showOb3q18: string; 
    public showOb2q19:string; 
    public showOb3q19: string; 
    public showOb2q20:string; 
    public showOb3q20: string; 


    public AuthuserId:string;
    public profile:any; 
    
    public LogedRole:string; 

    public MannagementserviceLines: any; 
    public userId:any;
    public selectCase:any;  
    public ifAdmin:any; 
    public showServiceLine:any='0' ;
    public basicUserServiceLine:any; 

    public createOrEdit:any; 
    public workId:any; 



  constructor(
    public jpactivityService: JpactivityService,
    public UserService: UserService,
    public router:Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    
      //validar el rol del usuario logueado
      //aqui capturamos si tiene los permismos de ver todas las lineas o solo su linea 
      //y si es solo su linea filtramos las preguntas por su linea 
      this.validationrole()   
      this.materializecss();
  }

  validationrole(){
    this.AuthuserId= localStorage.getItem("ID"),
    this.UserService.getProfileByAuthId(this.AuthuserId).subscribe
    (res =>{
      this.UserService.selectedProfile = res as any; 
       this.profile = this.UserService.selectedProfile[0]; 
      //  console.log( this.profile);
      // if (this.profile.permisology.eservices.WorkPreparation.admin == true){
        if (this.profile.permisology.eservices.WorkPreparation.admin == true){
        //si es admin nos traemos todas las lineas de servicio 
         console.log('admin user');
        this.LogedRole = 'admin';
         this.ifAdmin = '1'
        console.log('seguimiento******************')
      //buscamos la histria del management, capturar las lineas de servicio 
      this.findManagement_admin()

        }else{
        //si no es admin buscamos solo su linea de servico vs linea de servicio del management id 
         console.log('no admin user')
        this.LogedRole = 'basic';
        this.ifAdmin = '0'
      //buscamos el management 
      this.findManagement_basic()
      }
    })
  
  }
  


  findManagement_basic(){
    this.managementId = this.route.snapshot.params["id"];
    this.jpactivityService.getJpactivity(this.managementId).subscribe
    (res => {
      this.jpactivityService.selectedJpactivity = res as any;
      console.log('****************************************') 
      console.log(this.jpactivityService.selectedJpactivity)

      if (this.profile.serviceLine.operations.wt === true){
        this.basicUserServiceLine ='wt';
     }
     if (this.profile.serviceLine.operations.sl === true){
       this.basicUserServiceLine ='sl';
     }
     if (this.profile.serviceLine.operations.wl === true){
       this.basicUserServiceLine ='wl';
     }  
     if (this.profile.serviceLine.operations.ct === true){
       this.basicUserServiceLine ='ct';
     }
     if(this.profile.serviceLine.operations.fi === true){
       this.basicUserServiceLine ='fi';
     }
    });

     //aqui decimos que nos muestre las preguntas de la linea de servicio del usuario 
      //en vez de la tomada por el selector
    this.showServiceLine = this.basicUserServiceLine; 


    // this.jpactivityService.getWorkpreparationByManagementIdandAuthId(this.managementId, this.AuthuserId)
    // .subscribe (res =>{
    //   if (res[0]){
    //     this.jpactivityService.selectedWorkPreparation = res[0] as workPreparation; 
    //     this.workId = this.jpactivityService.selectedWorkPreparation._id; 
    //     console.log('es un edit', this.workId)
    //     this.createOrEdit = 'edit';
    //           //consultamos si mostramos observaciones 1 y 2 
    //           //this.consultShow()
    //   }else{
    //     console.log('es un create')
    //     this.createOrEdit = 'create';
    //   }
    
    // })
  }


  findManagement_admin(){
       
    this.managementId = this.route.snapshot.params["id"];
    this.jpactivityService.getJpactivity(this.managementId).subscribe
    (res => {
      this.jpactivityService.selectedJpactivity = res as any; 
      console.log(this.jpactivityService.selectedJpactivity )
      this.jpactivityService.getWorkpreparationByManagementId(this.managementId).subscribe 
    
      this.MannagementserviceLines = ({
        wt :  this.jpactivityService.selectedJpactivity.wt,
        sl :  this.jpactivityService.selectedJpactivity.sl,
        fi :  this.jpactivityService.selectedJpactivity.fi,
        ct :  this.jpactivityService.selectedJpactivity.ct,
        wl :  this.jpactivityService.selectedJpactivity.wl,
       })

     if( this.createOrEdit == 'edit'){
            this.jpactivityService.getWorkpreparationByManagementId(this.managementId).subscribe 
            (res=>{
                console.log(res); 
                this.jpactivityService.selectedWorkPreparation = res as any; 
                this.workId = this.jpactivityService.selectedWorkPreparation._id; 
                console.log('***********************1111',  this.workId)
                this.findOptionsForSelect()
            })
     }else{
      this.jpactivityService.selectedWorkPreparation = res as any;
      this.findOptionsForSelect()
     }
      
    })
  }


  //consultar cuales opciones vamos a mostrar en el selector
  findOptionsForSelect(){

  console.log('///////////////////////////this.MannagementserviceLines');
     console.log(this.MannagementserviceLines);
    if ( 
      this.MannagementserviceLines.wt == false && 
      this.MannagementserviceLines.fi == false && 
      this.MannagementserviceLines.ct == false && 
      this.MannagementserviceLines.sl == false && 
      this.MannagementserviceLines.wl == true      
      ){
          this.selectCase = '1'; 
          console.log('caso 1')
      }

      if ( 
        this.MannagementserviceLines.wt == false && 
        this.MannagementserviceLines.fi == false && 
        this.MannagementserviceLines.ct == false && 
        this.MannagementserviceLines.sl == true && 
        this.MannagementserviceLines.wl == false      
        ){
            this.selectCase = '2'; 
        }

        
      if ( 
        this.MannagementserviceLines.wt == false && 
        this.MannagementserviceLines.fi == false && 
        this.MannagementserviceLines.ct == false && 
        this.MannagementserviceLines.sl == true && 
        this.MannagementserviceLines.wl == true      
        ){
            this.selectCase = '3'; 
        }

        if ( 
          this.MannagementserviceLines.wt == false && 
          this.MannagementserviceLines.fi == false && 
          this.MannagementserviceLines.ct == true && 
          this.MannagementserviceLines.sl == false && 
          this.MannagementserviceLines.wl == false      
          ){
              this.selectCase = '4'; 
          }


          if ( 
            this.MannagementserviceLines.wt == false && 
            this.MannagementserviceLines.fi == false && 
            this.MannagementserviceLines.ct == true && 
            this.MannagementserviceLines.sl == false && 
            this.MannagementserviceLines.wl == true      
            ){
                this.selectCase = '5'; 
            }


            if ( 
              this.MannagementserviceLines.wt == false && 
              this.MannagementserviceLines.fi == false && 
              this.MannagementserviceLines.ct == true && 
              this.MannagementserviceLines.sl == true && 
              this.MannagementserviceLines.wl == true      
              ){
                  this.selectCase = '6'; 
              }
  

              if ( 
              this.MannagementserviceLines.wt == true && 
              this.MannagementserviceLines.fi == true && 
              this.MannagementserviceLines.ct == true && 
              this.MannagementserviceLines.sl == true && 
              this.MannagementserviceLines.wl == true      
              ){
               
                  this.selectCase = '99'; 
              }


 
  }




    //capturar el cambio de select para luego mostar las preguntas de esa linea 
    captureServiceSelected(sl){
  
      if (sl == 'wl'){
       
        this.showServiceLine = 'wl';
        console.log(this.showServiceLine)
      
      }
      if (sl == 'ct'){
       
        this.showServiceLine = 'ct';
        console.log(this.showServiceLine)
      }
      if (sl == 'fi'){
       
        this.showServiceLine = 'fi';
        console.log(this.showServiceLine)
      }
      if (sl == 'wt'){
       
        this.showServiceLine = 'wt';
        console.log(this.showServiceLine)
      }
      if (sl == 'sl'){
       
        this.showServiceLine = 'sl';
        console.log(this.showServiceLine)
      }
      //ahora buscamos si hay algun work preparation con este management id, la linea seleccionada.
  


      if( this.createOrEdit == 'edit'){
        this.jpactivityService.getWorkpreparationByManagementIdandSl(this.showServiceLine, this.managementId, this.AuthuserId).subscribe
        (res=>{
          if (res[0]){
            console.log(' no vacio')
          this.jpactivityService.selectedWorkPreparation = res[0] as any;
          console.log( this.jpactivityService.selectedWorkPreparation);
          
        }else{
          console.log(' vacio')
          this.jpactivityService.selectedWorkPreparation = res as any;
          console.log(res);
        }
        });
      }
    }
     



  saveWork(form: NgForm){


    if (this.createOrEdit == 'create'){
      console.log('++++++++++create+++++++++++')
      console.log(form.value);
      this.jpactivityService.saveWorkPreparation(form.value).subscribe
      (res => { 
        console.log(res);
      });

    }else{ 
        //crear editar
        console.log('++++++++++editar+++++++++++')
        console.log(form.value);


        this.jpactivityService.editWork(form.value, this.workId).subscribe
        (res => {
           console.log(res);
        });
        
    }
 
  
    //manipular boleano de show 

  }

  materializecss(){
    $(document).ready(function(){
       $('.datepicker').datepicker({
         format: 'dd/mm/yyyy',
       });
     });
   
       document.addEventListener('DOMContentLoaded', function() {
         var elems = document.querySelectorAll('.fixed-action-btn');
         var instances = M.FloatingActionButton.init(elems, {
           direction: 'left',
           hoverEnabled: false
         });
       });
       document.addEventListener('DOMContentLoaded', function() {
         var elems = document.querySelectorAll('select');
         //var instances = M.FormSelect.init(elems, options);
       });
       //FUNCTION DE MODALES 
       $(document).ready(function(){
         $('.modalAddLocation').modal();
         console.log('modal')
       });
       console.log('modal')
   
   }
  

}
