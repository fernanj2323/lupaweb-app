import { Component, OnInit } from '@angular/core';
import  { JpactivityService } from '../../../services/jpactivity/jpactivity.service'  //update
import { Jpactivity } from '../../../models/jpactivity/jpactivity';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { CriticalRequirementsService } from 'src/app/services/config-master/criticalReq/critical-requirements.service';

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
import { DeparmentsService } from '../../../services/config-master/deparments/deparments.service';
import { AuthService } from '../../../services/auth/auth.service';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { workPreparationQuestions } from 'src/app/models/eservices/workPreparationQuestions';
import { UserService } from 'src/app/services/users/user.service';
import { Profile } from 'src/app/models/users/profile';

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 
 


@Component({
  selector: 'app-work-preparation',
  templateUrl: './work-preparation.component.html',
  styleUrls: ['./work-preparation.component.css'], 
  providers: [JpactivityService,NotificationsService, CriticalRequirementsService, DeparmentsService, UserService]
})
export class WorkPreparationComponent implements OnInit {

  public managementId: string;
  public wtsl : boolean; 
  public ctsl: boolean; 
  public slsl: boolean; 
  public wlsl: boolean; 
  public fisl: boolean; 
  public tab: number; 
  public enruted: string; 
  

  constructor(
    public UserService: UserService, 
    public deparmentsService:DeparmentsService,
    public router:Router,
    public route: ActivatedRoute, 
    public authService: AuthService,
    public NotificationsService: NotificationsService,
    public departmentService: DeparmentsService, 
    public emailsService: EmailsService, 
    public jpactivityService: JpactivityService,
    public  CriticalRequirementsService: CriticalRequirementsService,


  ) { }

  ngOnInit() {
    // this.findServiceLine()
    this.findProfileUser()
    this.caputeN()
    this.managementId = this.route.snapshot.params["id"];
    // this.findQuestions();
  }
  caputeN(){

  this.enruted = this.route.snapshot.params["n"];
  console.log(this.enruted)
  }


  findProfileUser(){
    var id= localStorage.getItem("ID") 
    console.log(id)
    this.UserService.getProfileByAuthId(id).subscribe
    (res=> {
      this.UserService.selectedProfile = res[0] as Profile; 
       console.log('profile',   this.UserService.selectedProfile)
      this.consultPermises()
    });
  }


  consultPermises(){
    //aqui cambiamos el estado del tab y tambien consultamos si tienen permisos 
    //ver y editar 

    if (this.enruted == '1'){
      if ( this.UserService.selectedProfile.permisology.eservices.WorkPreparation.edit == true){
        console.log('el usuario tiene permisos para ver editar modulo');
        this.tab = 1; 
      }else{
        console.log('el usuario no tiene permisos para ver editar modulo');
        this.tab=1.1; 
      }
    }
    
    if (this.enruted == '2'){
      if ( this.UserService.selectedProfile.permisology.eservices.WorkPreparation.edit == true){
        console.log('el usuario tiene permisos para ver editar modulo');
        this.tab = 2; 
      }else{
        console.log('el usuario no tiene permisos para ver editar modulo');
        this.tab=2.1; 
      }
    }

    if (this.enruted == '3'){
      if ( this.UserService.selectedProfile.permisology.eservices.WorkPreparation.edit == true){
        console.log('el usuario tiene permisos para ver editar modulo');
        this.tab = 3; 
      }else{
        console.log('el usuario no tiene permisos para ver editar modulo');
        this.tab=3.1; 
      }
    }


    
    if (this.enruted == '4'){
      if ( this.UserService.selectedProfile.permisology.eservices.WorkPreparation.edit == true){
        console.log('el usuario tiene permisos para ver editar modulo');
        this.tab = 4; 
      }else{
        console.log('el usuario no tiene permisos para ver editar modulo');
        this.tab=4.1; 
      }
    }
  

  }


  // findServiceLine(){
  //   this.managementId = this.route.snapshot.params["id"];
  //   this.jpactivityService.getJpactivity(this.managementId).subscribe 
  //   (res=> {
  //   this.jpactivityService.selectedJpactivity = res as Jpactivity;
  //   console.log('jpActivity', this.jpactivityService.selectedJpactivity )
  //   });
    



    // this.fisl == this.jpactivityService.selectedJpactivity.fi; 
    // this.ctsl == this.jpactivityService.selectedJpactivity.ct; 
    // this.wlsl == this.jpactivityService.selectedJpactivity.wl; 
    // this.wtsl == this.jpactivityService.selectedJpactivity.wt; 
    // this.slsl == this.jpactivityService.selectedJpactivity.sl; 

    // if (this.fisl == true){
    //  this.findQuestions(this.fisl)
    // }
    // if (this.ctsl == true){
    //   this.findQuestions(this.ctsl)
    // }
    // if (this.wlsl == true){
    //   this.findQuestions(this.wlsl)
    // }
    // if (this.wtsl == true){
    //   this.findQuestions(this.wtsl)
    // }
    // if (this.slsl == true){
    //   this.findQuestions(this.slsl)
    // }

   //}

  findQuestions(serviceLine){
    this.jpactivityService.getPreparationQuestions().subscribe
    (res=>{
      this.jpactivityService.workPreparationQuestions = res as workPreparationQuestions[];
      console.log(this.jpactivityService.workPreparationQuestions)
    })
  }





}
