import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { UserService } from 'src/app/services/users/user.service';
import { JobBriefService } from 'src/app/services/eservices/job-brief.service';
import { jobBrief } from 'src/app/models/eservices/jobBrief/jobBrief';
import  { JpactivityService } from 'src/app/services/jpactivity/jpactivity.service'  //update
import { Jpactivity } from 'src/app/models/jpactivity/jpactivity';

var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 


@Component({
  selector: 'app-job-brief',
  templateUrl: './job-brief.component.html',
  styleUrls: ['./job-brief.component.css']
})
export class JobBriefComponent implements OnInit {
      public adminUser:number=0 ; 
      public MannagementserviceLines: any; 
      public selectCase:any;  
    //dependencias de notificaciones 
    public notificationData:({
      'creator': string, 
      'creatorId':string,
      'responsable': string, 
      'responsableId': string,
      'title':string, 
      'longTitle':string,
      'description':string, 
      'read':number, 
      'action':string,  
      'color': string, 
      'form': string,
      'managementId': any, 
      /// 'created':string, 
      // 'modified':string,
      });

      public isMyUserAprover = false ; 
      
    public maildata:({ 
      'to' : string,//email de quien recibe
      'toName':string, //nombre de quien recibe
      'from': string, //nombre de quien envia 
       'type': string, 
       'module': string, //modulo de donde se emite el mensaje 
       'subject': string, //titulo del correo 
       'description': string, //descripcion de la actividad asignada 
       
    });
     public selectedSL 
    public createOrEdit:string ='create'; 
    public managementId: string;
    public viewOrEdit: string =  '0'; 
    public jobId:string ; 
    public authId: string;
    public aprobationMode:string='0'; 
    public serviceLineSelected:string; 
    public aprovatorUserBySL:string ;
    public aprovator:string='empty';

    public showCompoonent:boolean = false; 
 
  constructor(
    public router:Router,
    public route: ActivatedRoute,
    public emailsService: EmailsService,
    public UserService: UserService, 
    public NotificationsService: NotificationsService,  
    public JobBriefService: JobBriefService,
    public jpactivityService: JpactivityService,

  ) { }

  ngOnInit() {
    this.managementId = this.route.snapshot.params["managementId"];
    // console.log('managementID', this.managementId);
    this.authId = localStorage.getItem("ID");
    this.consultIfExistNoAdmin();
    this.consultViewOrEdit();
    this.materializecss();
    this.consultServiceLines();
  }

  consultIfExistNoAdmin(){

   //this.UserService.getProfileByAuthId(this.authId).subscribe(
   //  res=>{
     //para usuario no administrativo, vemos cual es su linea de servicio y en base a eso buscamos un job
     //para saber si es un create o un edit
     //debe estar en false 
      // if (res[0].permisology.eservices.PrejobIndex.create == false){
      //    this.adminUser = 0; 
      //    if(res[0].serviceLine.operations.wt == true){
      //     this.serviceLineSelected = 'wt';
      //   }
      //   if(res[0].serviceLine.operations.sl == true){
      //     this.serviceLineSelected = 'sl';
      //   }
      //   if(res[0].serviceLine.operations.fi == true){
      //     this.serviceLineSelected = 'fi';
      //   }
      //   if(res[0].serviceLine.operations.ct == true){
      //     this.serviceLineSelected = 'ct';
      //   }
      //   if(res[0].serviceLine.operations.wl == true){
      //     this.serviceLineSelected = 'wl';
      //   }
        //consultamos quien aprueba viendo el modulo de aprobador interno del componente
        //vemos cual es el aprobador segun la linea de servicio que se va a mostrar 
      //  this.aprovatorModule(this.serviceLineSelected);
      //  this.JobBriefService.getJobBymanagementIdAndServiceLine(this.managementId, this.serviceLineSelected).subscribe
      //  (res=>{  
           // console.log(res);
      //      if (res[0]){
      //        this.JobBriefService.selectedJob = res[0] as jobBrief;
      //        this.createOrEdit = 'edit';
      //        this.jobId = res[0]._id; 
              
       //     }
           // console.log(this.createOrEdit);
    //    })
   //  } else{
      this.adminUser = 1; 
    // }
     // console.log(res);
     
     // console.log( this.serviceLineSelected);
    
     //});
  }


  aprovatorModule(serviceLine){

    if(serviceLine == 'wt'){
      //fernando pinango
      this.aprovatorUserBySL = '5de6ac220e122c333807b2c8';
    }
    if(serviceLine == 'sl'){
      //fernando pinango
      this.aprovatorUserBySL = '5de6ac220e122c333807b2c8';
    }
    if(serviceLine == 'fi'){
      //fernando pinango
      this.aprovatorUserBySL = '5de6ac220e122c333807b2c8';
    }
    if(serviceLine == 'ct'){
      //fernando pinango
      this.aprovatorUserBySL = '5de6ac220e122c333807b2c8';
    }
    if(serviceLine == 'wl'){
      //fernando pinango
      this.aprovatorUserBySL = '5de6ac220e122c333807b2c8';
    }
  if ( localStorage.getItem('ID') == this.aprovatorUserBySL){
    console.log('soy aprobador')
    this.isMyUserAprover = true; 
  }


    this.UserService.getProfileByAuthId(this.aprovatorUserBySL).subscribe
    (res=>{
      // console.log(res[0]);
      this.aprovator= res[0];
      // console.log(this.aprovatorName);
      this.UserService.selectedProfile = res[0].firstName + ' ' + res[0].lastName as any; 
    
    })

  }





  consultViewOrEdit(){
    this.viewOrEdit = this.route.snapshot.params["viewOrEdit"];
    //si es 1 es vista solo ver, no editar
    //variable que consultamos en vista con NgSwitch 
    this.validationAprovator() //validamos que el usuario tenga permisos para validar 
    
  }

  validationAprovator(){
    
  
    this.UserService.getProfileByAuthId(this.authId).subscribe
    (res=>{
    // console.log(res);
    if (this.viewOrEdit == '1'){
      //consultamos que sea solo vista para aprobador 
        if (res[0].permisology.eservices.PrejobIndex.aprobation == true){
          //tiene permisos de aprobador
          this.aprobationMode='1' //aprobador
        } 

        if (res[0].permisology.eservices.PrejobIndex.aprobation == false){
          //no tiene permisos de aprobador y viene en el enlace de aprobador
          this.aprobationMode='2' //solo ver
        } 

    }else if ( this.viewOrEdit == '2'){ 
      //viene en el enlace de solo vista 
      // consultamos si tiene permisos para ver
      if (res[0].permisology.eservices.PrejobIndex.observe == true){
        this.aprobationMode='2' //solo vista
      }else{ 
        console.log('no tiene permisos para ver')
        alert('no tiene permisos para ver este JobBrief Gerencial');
      }

      this.aprobationMode='2'
      } else if (this.viewOrEdit == '0') {  // viene en el enlace de creador 
        if (res[0].permisology.eservices.PrejobIndex.create == true){
          this.aprobationMode='0' //crear
      }else{
        this.aprobationMode='2' //solo ver
      }
    }
    if (res[0].permisology.eservices.PrejobIndex.admin == true){
      //debe estar en true 
      //usuario aadministrador, tiene selector para cambiar de linea de serivico 
      //para cada Job brief 
        this.adminUser = 1; 
        this.consultServiceLines(); 
    }

  });
  }
  
  captureServiceSelected(event){
   // console.log(event);
    this.showCompoonent = true; 
    this.selectedSL = event; 
    this.JobBriefService.getJobBymanagementIdAndServiceLine(this.managementId, event).subscribe
    (res=>{
      //enviamos al modulo de aprobador la linea seleccioanda para que nos traiga el perfil del aprobador
      this.aprovatorModule(event)
      if (res[0]){
        this.JobBriefService.selectedJob = res[0] as jobBrief;
          console.log(res[0]);
          this.createOrEdit = 'edit'
          this.jobId = res[0]._id; 
      }else{ 
        this.createOrEdit = 'create'
        this.JobBriefService.selectedJob = res as any; 
      }
    
      
    });
  }
 
 
  saveJob(form:NgForm){
 
   //si es administrador tomamos la linea de servicio de form.value.well4
// if( this.adminUser == 1){
//   form.value.serviceLine = form.value.well4; 
//   //si es basico lo tomamos del perfil del usuario en   this.serviceLineSelected 
// }else if (this.adminUser == 0){
//   form.value.serviceLine = this.serviceLineSelected; 
// }
form.value.serviceLine = this.selectedSL
  console.log(form.value)
    
  
    form.value.managementId = this.managementId;
  //  console.log(form.value);
      if (this.createOrEdit == 'create'){
            this.JobBriefService.postJob(form.value).subscribe
            (res=>{
           //   console.log(res);
              M.toast({html: 'Creado!'});
              this.notificationToresponsible();
            });
      }else if(this.createOrEdit =='edit'){
       // console.log('edit', this.jobId);
        this.JobBriefService.putJob(this.jobId, form.value).subscribe
        (res=>{
         // console.log(res); 
           M.toast({html: 'Editado!'});
          this.notificationToresponsible();
        })
      }
  }

  notificationToresponsible(){
    var fullnameCreator =  localStorage.getItem('FIRSTNAME') + ' ' + localStorage.getItem('LASTNAME');
    var aprovator =  this.aprovator as any; 
    //console.log(aprovator);
    var aprovatorName = aprovator.firstName + ' ' + aprovator.lastName as any;
    //console.log(aprovator);
      
    this.notificationData = ({
      'creator': fullnameCreator , 
      'creatorId': localStorage.getItem("ID"),
      'responsable': aprovatorName, 
      'responsableId': aprovator.authId,
      'form': fullnameCreator,
      'title': 'E-services - JobBrief a espera de aprobación ',
      'longTitle':'JobBrief a espera de aprobación, ingrese mediante el acceso directo ',
      'color':'yellow accent-4',  
      'description':'Su IRO ha sido revisado ',
      'read': 0,
      'action':  "eservices-management/JobBrief/"+ this.managementId + '/1',
      'managementId': this.managementId + ' '
    });


    this.maildata = ({
      'to': aprovator.email,
      'toName': aprovatorName + '', 
      'from': fullnameCreator + '', 
      'type':'accion',
      'module': 'E-Services',
      'subject':'E-services - JobBrief a espera de aprobación ',
      'description':   "eservices-management/JobBrief/"+ this.managementId + '/1',
     }); 

     this.sendNotification();
  }

  notificationToCreator(){

  }

  sendNotification(){
    console.log('sendNotification')
    this.NotificationsService.createNotification(this.notificationData).subscribe
    (res => {
      console.log(res);
      if (res == 202){
        console.log('no sera notificado ya existe notificacion previa');
      } else { 
       this.sendEmail()
      }
    })
  }

  sendEmail(){
    console.log(this.maildata);
    this.emailsService.postMail(this.maildata).subscribe
    (res =>{
       console.log(res);         
    });
  }


  back(){
    window.history.back();
  }

































materializecss(){

  $(document).ready(function(){
    $('.tooltipped').tooltip();
    // $('.tooltip').tooltip('outDuration', 5000);
    // $('.tooltip').tooltip('inDuration', 150);
  });


  $(document).ready(function(){
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
    });
  });


$(document).ready(function(){
 $('.fixed-action-btn').floatingActionButton();
});
   
$(document).ready(function(){
 $('.modal').modal();
});
  //  console.log('modal')

  }
  



  consultServiceLines(){
      this.jpactivityService.getJpactivity(this.managementId).subscribe
      (res => {
        this.jpactivityService.selectedJpactivity = res as any; 
      //  console.log('consultServiceLines', this.jpactivityService.selectedJpactivity)
           //capturar las lineas de servicio del management 
       this.MannagementserviceLines = ({
        wt :  this.jpactivityService.selectedJpactivity.wt,
        sl :  this.jpactivityService.selectedJpactivity.sl,
        fi :  this.jpactivityService.selectedJpactivity.fi,
        ct :  this.jpactivityService.selectedJpactivity.ct,
        wl :  this.jpactivityService.selectedJpactivity.wl,
       })

       if ( 
        this.MannagementserviceLines.wt == false && 
        this.MannagementserviceLines.fi == false && 
        this.MannagementserviceLines.ct == false && 
        this.MannagementserviceLines.sl == false && 
        this.MannagementserviceLines.wl == true      
        ){
            this.selectCase = '1'; 
       //     console.log('caso 1')
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
                this.MannagementserviceLines.wl == false      
                ){
                    this.selectCase = '6'; 
                }
  
  
                if ( 
                  this.MannagementserviceLines.wt == false && 
                  this.MannagementserviceLines.fi == false && 
                  this.MannagementserviceLines.ct == true && 
                  this.MannagementserviceLines.sl == true && 
                  this.MannagementserviceLines.wl == true      
                  ){
                      this.selectCase = '7'; 
                  }
  
                  if ( 
                    this.MannagementserviceLines.wt == false && 
                    this.MannagementserviceLines.fi == true && 
                    this.MannagementserviceLines.ct == false && 
                    this.MannagementserviceLines.sl == false && 
                    this.MannagementserviceLines.wl == false      
                    ){
                        this.selectCase = '8'; 
                        // console.log(this.selectCase, '8');
                    }
  
  
                    
                  if ( 
                    this.MannagementserviceLines.wt == false && 
                    this.MannagementserviceLines.fi == true && 
                    this.MannagementserviceLines.ct == false && 
                    this.MannagementserviceLines.sl == false && 
                    this.MannagementserviceLines.wl == true      
                    ){
                        this.selectCase = '9'; 
                        // console.log(this.selectCase, '8');
                    }
  
                    if ( 
                      this.MannagementserviceLines.wt == false && 
                      this.MannagementserviceLines.fi == true && 
                      this.MannagementserviceLines.ct == false && 
                      this.MannagementserviceLines.sl == true && 
                      this.MannagementserviceLines.wl == false      
                      ){
                          this.selectCase = '10'; 
                      }
  
                      if ( 
                        this.MannagementserviceLines.wt == false && 
                        this.MannagementserviceLines.fi == true && 
                        this.MannagementserviceLines.ct == false && 
                        this.MannagementserviceLines.sl == true && 
                        this.MannagementserviceLines.wl == true      
                        ){
                            this.selectCase = '11'; 
                        }
                    
  
                    if ( 
                      this.MannagementserviceLines.wt == false && 
                      this.MannagementserviceLines.fi == true && 
                      this.MannagementserviceLines.ct == true && 
                      this.MannagementserviceLines.sl == false && 
                      this.MannagementserviceLines.wl == false      
                      ){
                        this.selectCase = '12'; 
                      }
  
  
                      if ( 
                        this.MannagementserviceLines.wt == false && 
                        this.MannagementserviceLines.fi == true && 
                        this.MannagementserviceLines.ct == true && 
                        this.MannagementserviceLines.sl == false && 
                        this.MannagementserviceLines.wl == true      
                        ){
                          this.selectCase = '13'; 
                        }
  
  
                        if ( 
                          this.MannagementserviceLines.wt == false && 
                          this.MannagementserviceLines.fi == true && 
                          this.MannagementserviceLines.ct == true && 
                          this.MannagementserviceLines.sl == true && 
                          this.MannagementserviceLines.wl == false      
                          ){
                            this.selectCase = '14'; 
                          }
  
  
                          if ( 
                            this.MannagementserviceLines.wt == false && 
                            this.MannagementserviceLines.fi == true && 
                            this.MannagementserviceLines.ct == true && 
                            this.MannagementserviceLines.sl == true && 
                            this.MannagementserviceLines.wl == true      
                            ){
                              this.selectCase = '15'; 
                            }
  
  
                       if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == false && 
                            this.MannagementserviceLines.ct == false && 
                            this.MannagementserviceLines.sl == false && 
                            this.MannagementserviceLines.wl == false      
                            ){
                              this.selectCase = '16'; 
                            }
  
  
                        if ( 
                          this.MannagementserviceLines.wt == true && 
                          this.MannagementserviceLines.fi == false && 
                          this.MannagementserviceLines.ct == false && 
                          this.MannagementserviceLines.sl == false && 
                          this.MannagementserviceLines.wl == true      
                          ){
                            this.selectCase = '17'; 
                          }
  
                          if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == false && 
                            this.MannagementserviceLines.ct == false && 
                            this.MannagementserviceLines.sl == true && 
                            this.MannagementserviceLines.wl == false      
                            ){
                              this.selectCase = '18'; 
                            }
  
  
                        if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == false && 
                            this.MannagementserviceLines.ct == false && 
                            this.MannagementserviceLines.sl == true && 
                            this.MannagementserviceLines.wl == true      
                            ){
                              this.selectCase = '19'; 
                            }
  
  
                            if ( 
                              this.MannagementserviceLines.wt == true && 
                              this.MannagementserviceLines.fi == false && 
                              this.MannagementserviceLines.ct == true && 
                              this.MannagementserviceLines.sl == false && 
                              this.MannagementserviceLines.wl == false      
                              ){
                                this.selectCase = '20'; 
                              }
  
  
  
                          if ( 
                              this.MannagementserviceLines.wt == true && 
                              this.MannagementserviceLines.fi == false && 
                              this.MannagementserviceLines.ct == true && 
                              this.MannagementserviceLines.sl == false && 
                              this.MannagementserviceLines.wl == true      
                            ){
                              this.selectCase = '21'; 
                            }
  
                            
                          if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == false && 
                            this.MannagementserviceLines.ct == true && 
                            this.MannagementserviceLines.sl == true && 
                            this.MannagementserviceLines.wl == false      
                          ){
                            this.selectCase = '22'; 
                          }
  
  
                        if ( 
                          this.MannagementserviceLines.wt == true && 
                          this.MannagementserviceLines.fi == false && 
                          this.MannagementserviceLines.ct == true && 
                          this.MannagementserviceLines.sl == true && 
                          this.MannagementserviceLines.wl == true      
                        ){
                          this.selectCase = '23'; 
                        }
  
  
                    if ( 
                      this.MannagementserviceLines.wt == true && 
                      this.MannagementserviceLines.fi == true && 
                      this.MannagementserviceLines.ct == false && 
                      this.MannagementserviceLines.sl == false && 
                      this.MannagementserviceLines.wl == false      
                      ){
                      this.selectCase = '24'; 
                      }
  
  
                      if ( 
                      this.MannagementserviceLines.wt == true && 
                      this.MannagementserviceLines.fi == true && 
                      this.MannagementserviceLines.ct == false && 
                      this.MannagementserviceLines.sl == false && 
                      this.MannagementserviceLines.wl == true      
                        ){
                      this.selectCase = '25'; 
                      }
                      
  
                      if ( 
                        this.MannagementserviceLines.wt == true && 
                        this.MannagementserviceLines.fi == true && 
                        this.MannagementserviceLines.ct == false && 
                        this.MannagementserviceLines.sl == true && 
                        this.MannagementserviceLines.wl == false      
                          ){
                        this.selectCase = '26'; 
                        }
  
  
  
                        
                      if ( 
                        this.MannagementserviceLines.wt == true && 
                        this.MannagementserviceLines.fi == true && 
                        this.MannagementserviceLines.ct == false && 
                        this.MannagementserviceLines.sl == true && 
                        this.MannagementserviceLines.wl == true      
                          ){
                        this.selectCase = '27'; 
                        }
  
  
                        if ( 
                          this.MannagementserviceLines.wt == true && 
                          this.MannagementserviceLines.fi == true && 
                          this.MannagementserviceLines.ct == true && 
                          this.MannagementserviceLines.sl == false && 
                          this.MannagementserviceLines.wl == false      
                            ){
                          this.selectCase = '28'; 
                          }
  
  
                          if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == true && 
                            this.MannagementserviceLines.ct == true && 
                            this.MannagementserviceLines.sl == false && 
                            this.MannagementserviceLines.wl == true      
                              ){
                            this.selectCase = '29'; 
                            }
  
  
                if ( 
                    this.MannagementserviceLines.wt == true && 
                    this.MannagementserviceLines.fi == true && 
                    this.MannagementserviceLines.ct == true && 
                    this.MannagementserviceLines.sl == true && 
                    this.MannagementserviceLines.wl == false      
                    ){
                    this.selectCase = '30'; 
                    }
                      
               if ( 
                this.MannagementserviceLines.wt == true && 
                this.MannagementserviceLines.fi == true && 
                this.MannagementserviceLines.ct == true && 
                this.MannagementserviceLines.sl == true && 
                this.MannagementserviceLines.wl == true      
                ){
                 
                    this.selectCase = '31'; 
                }





















      });
  }

}
