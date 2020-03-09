import { Component, OnInit } from '@angular/core';
import  { JpactivityService } from '../../../../services/jpactivity/jpactivity.service'  //update
import { Jpactivity } from '../../../../models/jpactivity/jpactivity';
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
import { DeparmentsService } from '../../../../services/config-master/deparments/deparments.service';
import { AuthService } from '../../../../services/auth/auth.service';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { workPreparationQuestions } from 'src/app/models/eservices/workPreparationQuestions';
import { UserService } from 'src/app/services/users/user.service';
import { Profile } from 'src/app/models/users/profile';
import { workPreparation } from 'src/app/models/eservices/workPreparation';


@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.css'],
  providers: [JpactivityService,NotificationsService, CriticalRequirementsService, DeparmentsService, UserService]
})
export class EditWorkComponent implements OnInit {


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


  constructor(
    public jpactivityService: JpactivityService,
    public UserService: UserService,
    public router:Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.findWorkPreparation()
      this.findResponsables()
  }
  
  findWorkPreparation(){
    
    this.managementId = this.route.snapshot.params["id"];
    this.jpactivityService.getWorkpreparationByManagementId(this.managementId).subscribe
  (res => { 
        this.jpactivityService.selectedWorkPreparation = res as any;
  });

  }

  findResponsables(){
    this.UserService.getProfiles().subscribe
    (res=>{
      console.log(res);
      this.UserService.Profiles = res as Profile[];
    })
  }
   

  addObservation(q){

    //pregunta 1
    if (q == 1 ){
      if (this.showOb2q1 == '1'){
        this.showOb3q1 = '1'; 
      }else{
        this.showOb2q1 = '1'; 
      }
      
    }


    console.log('addObesrvaiton')
  }

  saveWork(form: NgForm){
    console.log(form.value);

    //manipular boleano de show 

  }

}

