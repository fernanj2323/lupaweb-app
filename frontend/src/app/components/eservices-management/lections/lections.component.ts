import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { UserService } from 'src/app/services/users/user.service';
import  { JpactivityService } from 'src/app/services/jpactivity/jpactivity.service'  //update
import { Jpactivity } from 'src/app/models/jpactivity/jpactivity';
import { ClosingPhaseService } from 'src/app/services/eservices/closing-phase.service';
import { closingPhase } from 'src/app/models/eservices/closingPhase/closingPhase';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { Photo } from 'src/app/models/photos/photos';
import {LectionsService} from 'src/app/services/eservices/lections.service'
import { from } from 'rxjs';
var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-lections',
  templateUrl: './lections.component.html',
  styleUrls: ['./lections.component.css']
})
export class LectionsComponent implements OnInit {
   public aprobationMode = 0; 
   public managementId ; 
   public authId ; 
   public createOrEdit; 
   public selectedLection
  constructor( 
    public router:Router,
    public route: ActivatedRoute,
    public emailsService: EmailsService,
    public UserService: UserService, 
    public NotificationsService: NotificationsService,  
    public jpactivityService: JpactivityService,
    public ClosingPhaseService: ClosingPhaseService,
    public PhotoService: PhotoService, 
    public LectionsService:LectionsService, 
  ) { }

  ngOnInit() {
    this.managementId = this.route.snapshot.params["managementId"];
    // console.log('managementID', this.managementId);
    this.authId = localStorage.getItem("ID");
    this.consultViewOrEdit()
    this.material()
    this.consultIfExist()
  }
  consultIfExist(){
    console.log('consultIfExist');
    this.LectionsService.getLectionByManagementId(this.managementId).subscribe
    (res=>{
      
      console.log(res);
      if(res[0]){
        this.createOrEdit = 'edit';
        this.LectionsService.selectedLection = res[0] as any;
        
      }else{ 
        this.createOrEdit = 'create';
        this.LectionsService.selectedLection = ' ' as any
      }

    })
  }

  consultViewOrEdit(){
    var viewOrEdit =  this.route.snapshot.params["viewOrEdit"]   
    this.aprobationMode = 0;
    if (viewOrEdit == '1'){
      this.aprobationMode = 1;
    }else { 
      if (viewOrEdit == '0'){
        this.aprobationMode = 0;
      }
    }
    console.log('consultViewOrEdit', this.aprobationMode)
    
  }

  saveLection(form: NgForm){
    form.value.managementId =  this.managementId;
    if (this.createOrEdit == 'create'){
      this.LectionsService.postLection(form.value).subscribe
      (res=>{
        console.log(res);
        M.toast({html: 'Creado!'});
      //  this.createOrEdit = 'edit';
        this.consultIfExist();

      })
    }else{ 
        
      this.LectionsService.putLection(form.value._id ,form.value).subscribe
      (res=>{
        console.log(res);
        M.toast({html: 'Guardado!'});
        //Ingresamos un mensaje a mostrar
        var mensaje = confirm("¿Quieres marcar como finalizada?");
        //Detectamos si el usuario acepto el mensaje
        if (mensaje) {
       // alert("¡1!");
        this.finalizeManagement()
        }
        //Detectamos si el usuario denegó el mensaje
        else {
       // alert("¡Haz denegado el mensaje!");
        }
        
      })
    }
  }

  finalizeManagement(){
  
    this.jpactivityService.checkFinish(this.managementId).subscribe
    (res=>{
      console.log(res)
    })
  }

  back(){

  }

  material(){
      
  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
   });
      
        
  $(document).ready(function(){
    $('.modal').modal();
   }); 
  }

}
