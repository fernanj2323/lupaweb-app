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
import { hseElements } from 'src/app/models/eservices/hseElements';
//services 
import { DeparmentsService } from 'src/app/services/config-master/deparments/deparments.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { workPreparationQuestions } from 'src/app/models/eservices/workPreparationQuestions';
import { UserService } from 'src/app/services/users/user.service';
import { Profile } from 'src/app/models/users/profile';
import { workPreparation } from 'src/app/models/eservices/workPreparation';
import { ClientesService }from 'src/app/services/config-master/clientes/clientes.service'
import{LocationsService } from 'src/app/services/config-master/locations/locations.service';
import {MatDatepickerModule} from '@angular/material/datepicker';


var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; ;

@Component({
  selector: 'app-work-phase3',
  templateUrl: './work-phase3.component.html',
  styleUrls: ['./work-phase3.component.css'],
  providers: [ UserService, MatDatepickerModule, JpactivityService, AuthService, EmailsService, NotificationsService, ClientesService, DeparmentsService, LocationsService]
})
export class WorkPhase3Component implements OnInit {

  public selectCase: string; 
  public managementId: string;
  public serviceLine: string;
  public showServiceLine: string;
  public AuthuserId : string; 
  public profile : any; 
  public LogedRole : string; 
  public ifAdmin : string; 
  public MannagementserviceLines: any; 
  public workEditedId:any;
  public hseElements: any;  
  public hseEdit : string = '0';
  public hseEditedId: string;

  responsableNotificated:any; 
  fullname:string; 

  public maildata:({ 
    'to' : string,//email de quien recibe
    'toName':string, //nombre de quien recibe
    'from': string, //nombre de quien envia 
     'type': string, 
     'module': string, //modulo de donde se emite el mensaje 
     'subject': string, //titulo del correo 
     'description': string, //descripcion de la actividad asignada 
  });
  
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
  public tab:number = 0 ; 
  
  showCT:any;
  showSL:any;
  showWT:any;
  showWL:any;
  showFI:any; 

  constructor(
    public clientesService: ClientesService,
    public departmentService: DeparmentsService, 
    public NotificationsService: NotificationsService,  
    public emailsService: EmailsService, 
    public router:Router, 
    public route: ActivatedRoute,  
    public jpactivityService: JpactivityService, 
    public authService: AuthService,
    public locationsService: LocationsService,
    public UserService: UserService, 
  ) { }

  ngOnInit() {

    this.captureEnrutedSL();
    this.materializecss();
    this.consultView();
  }
  consultView(){
    if (this.route.snapshot.params.edit == 1){
      this.tab = 1; 
    }else {
      this.tab = 0; 
    }
  }
  materializecss(){
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


   
  findWordPreparationifExist(){
    this.jpactivityService.getWorkpreparationByManagementIdandSl(this.serviceLine, this.managementId, this.AuthuserId).subscribe
    (res => { 
      if (res[0]){
        this.jpactivityService.selectedWorkPreparation = res[0] as any;     
      }
     
    });
  }

  captureEnrutedSL(){
    this.serviceLine = this.route.snapshot.params["sl"];
    this.showServiceLine = this.serviceLine;
    console.log(this.showServiceLine)
    this.managementId = this.route.snapshot.params["id"];
    this.validationrole();
    
      //traemos la lista de responsables hay que buscar la linea de servicio seleccionada
      this.findResponsables()
      this.findWordPreparationifExist();
      this.findHseElements();
  }


  validationrole(){
    this.AuthuserId= localStorage.getItem("ID"),  
    this.UserService.getProfileByAuthId(this.AuthuserId).subscribe
    (res =>{
      this.UserService.selectedProfile = res as any; 
       this.profile = this.UserService.selectedProfile[0]; 
      //  console.log( this.profile);

        if (this.profile.permisology.eservices.WorkPreparation.admin == true){
        //si es admin nos traemos todas las lineas de servicio 
         console.log('admin user');
        this.LogedRole = 'admin';
         this.ifAdmin = '1'
         if (this.profile.serviceLine.operations.wt == true){
          this.showWT = true; 
      }
      if (this.profile.serviceLine.operations.sl == true){
        this.showSL =  true; 
      }

      if (this.profile.serviceLine.operations.fi == true){
          this.showFI =  true; 
      }

      if (this.profile.serviceLine.operations.wl == true){
        this.showWL =  true; 
      }


      if (this.profile.serviceLine.operations.ct == true){
        this.showCT =  true; 
      }
        
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
    });
  };


  findManagement_admin(){
    this.managementId = this.route.snapshot.params["id"];
    this.jpactivityService.getJpactivity(this.managementId).subscribe
    (res => {
      this.jpactivityService.selectedJpactivity = res as any;
      this.MannagementserviceLines = this.jpactivityService.selectedJpactivity; 
      console.log(this.MannagementserviceLines)
      this.findOptionsForSelect();
    });

  };







  findResponsables(){
    this.UserService.getProfiles().subscribe
    (res=>{
      console.log(res);
      this.UserService.Profiles = res as any[];
    })
  }


  findOptionsForSelect(){
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

              
                  console.log( this.MannagementserviceLines)
                console.log(this.selectCase);
             
                 
                  console.log( this.MannagementserviceLines)
                console.log(this.selectCase);



 
  }





  saveWork(form: NgForm){
      // console.log(form.value)
      // console.log('serviceLine',this.serviceLine)
      // console.log('managementId',this.managementId)
      // console.log('AuthuserId',this.AuthuserId)
      this.jpactivityService.getWorkpreparationByManagementIdandSl(this.serviceLine, this.managementId, this.AuthuserId).subscribe
      (res => { 
    
          if (res[0]){
            if (res[0]._id){
              this.workEditedId = res[0]._id;
            console.log(this.workEditedId);     
            this.jpactivityService.editWork(form.value, this.workEditedId).subscribe
            (res => {
              console.log(res);
              M.toast({html: 'Guardado!'})          
             this.appNotification(form);
             this.notifictionResponsable(form);
            })
            }else{
                
              M.toast({html: 'Debe crear antes!'})
              console.log('no existe match con esta linea de servicio para editar')  
       
            } 
          }else{ 
                  
          M.toast({html: 'Debe crear antes!'})
          console.log('no existe match con esta linea de servicio para editar')  
          }

      
       
 
      });
  }

  captureServiceSelected(sl){
   
    if (sl == 'wl'){
     
      this.showServiceLine = 'wl';
      this.serviceLine= 'wl';
      // this.creatorSL = 'wl'; 

      console.log(this.showServiceLine)
    
    }
    if (sl == 'ct'){
     
      this.showServiceLine = 'ct';
      this.serviceLine= 'ct';
      // this.creatorSL = 'ct'; 

      console.log(this.showServiceLine)
    }
    if (sl == 'fi'){
     
      this.showServiceLine = 'fi';
      this.serviceLine= 'fi';
      // this.creatorSL = 'fi'; 

      console.log(this.showServiceLine)
    }
    if (sl == 'wt'){
     
      this.showServiceLine = 'wt';
      this.serviceLine= 'wt';
      // this.creatorSL = 'wt'; 

      console.log(this.showServiceLine)
    }
    if (sl == 'sl'){
     
      this.showServiceLine = 'sl';
      this.serviceLine= 'sl';
      // this.creatorSL = 'sl'; 

      console.log(this.showServiceLine)
    }

    this.findWordPreparationifExist(); 
  }


  saveHseElement(hseForm: NgForm){
    console.log(hseForm.value);
    hseForm.value.userId = this.AuthuserId;

    this.jpactivityService.getWorkpreparationByManagementIdandSl(this.serviceLine, this.managementId, this.AuthuserId).subscribe
    (res => { 
      if (res[0]){
        if (res[0]._id){
          this.workEditedId = res[0]._id;
          hseForm.value.workPreparationId = this.workEditedId;  
        }else{
          console.log('no existe match con esta linea de servicio para editar')
        }
      }


      console.log(hseForm.value);
        console.log('hseEdit', this.hseEdit)
      if ( this.hseEdit === '1'){ //es un edit
        console.log('hseEdit', this.hseEdit)
        this.jpactivityService.editHseElements(hseForm.value,this.hseEditedId)
        .subscribe(res =>{
          console.log(res)
          M.toast({html: 'Editado!'})    
        })

      }else{ //es un create
        this.jpactivityService.saveHseElements(hseForm.value)
        .subscribe(res=>{
          console.log(res); 
           M.toast({html: 'Guardado!'})      
         })
      }
    })
  }


  findHseElements(){
    // console.log('findhse')
    // console.log(this.serviceLine, this.managementId, this.AuthuserId)
    this.jpactivityService.getWorkpreparationByManagementIdandSl(this.serviceLine, this.managementId, this.AuthuserId).subscribe
    (res => { 
      console.log('findhse 2')
      console.log(res[0]);
      if (res[0]){
        if (res[0]._id){
          this.workEditedId = res[0]._id; 

          console.log('findhse 2',this.workEditedId)
          this.jpactivityService.getHseElements(this.workEditedId, this.AuthuserId)
          .subscribe (res=>{

            console.log('findhse 3',this.workEditedId)
            console.log(res);
  
             if(res[0]){
               this.hseEdit = '1';  // es un edit
               this.hseEditedId = res[0]._id; 
              this.jpactivityService.selectedhseElements = res[0] as any;
              console.log('this.jpactivityService.selectedhseElements',this.jpactivityService.selectedhseElements)
             }
            
          });


        }else{
          console.log('no existe match con esta linea de servicio para editar')
        }
       
      }
    });
  }



  back(){
    window.history.back();
  }




  
  // ----------------------------------
  //funciones de notificaciones 
  //--------------------------------


  notifictionResponsable(form){

  //  console.log(form.value);

    if(form.value.responsable){
      this.responsableNotificated = form.value.responsable;
      this.notificationPhase1(this.responsableNotificated);
    }

  }


  notificationPhase1(responsableId:string, question? ){

    // console.log('****************responsableId: ', responsableId)
     
     
     this.UserService.getProfileById(responsableId).subscribe(
     res=>{
      
       this.UserService.selectedProfile = res as any;
       this.fullname =  this.UserService.selectedProfile.firstName +  ' ' + this.UserService.selectedProfile.lastName;
       if (question == 0){
         this.notificationData = ({ 
           'creator': this.fullname , 
           'creatorId': localStorage.getItem("ID"),
           'responsable': this.fullname, 
           'responsableId': this.UserService.selectedProfile.authId,
           'form': localStorage.getItem("ID"),
           'title': 'E-services - Preparacion de trabajo',
           'longTitle':'Ha sido asignado como responsable Principal de una preparación de trabajo;',
           'color':'yellow accent-4',  
           'description':'editado',
           'read':0,
           'action':  "eservices-management/workpreparation/1/"+ this.managementId + '/' + this.serviceLine ,
           'managementId': this.managementId
         });
       }else{ 
         this.notificationData = ({ 
           'creator': this.fullname , 
           'creatorId': localStorage.getItem("ID"),
           'responsable': this.fullname, 
           'responsableId': this.UserService.selectedProfile.authId,
           'form': localStorage.getItem("ID"),
           'title': 'E-services - Preparacion de trabajo',
           'longTitle':'Ha sido asignado como responsable de una preparación de trabajo;',
           'color':'yellow accent-4',  
           'description':'editado',
           'read':0,
           'action':  "eservices-management/workpreparation/1/"+ this.managementId + '/' + this.serviceLine ,
           'managementId': this.managementId
         });
       }
    
   
       this.maildata = ({
         'to': this.UserService.selectedProfile.email,
         'toName': this.fullname + '', 
         'from': this.fullname + '', 
         'type':'accion',
         'module': 'E-Services',
         'subject':'Ha sido asignado como responsable de una preparación de trabajo;',
         'description': "eservices-management/workpreparation/1/"+ this.managementId + '/' + this.serviceLine ,
        }); 
         
   
       
       this.NotificationsService.createNotification(this.notificationData).subscribe
       (res => {
         console.log(res);
         if (res == 202){
           console.log('no sera notificado ya existe notificacion previa');
         } else { 
           this.emailsService.postMail(this.maildata).subscribe
           (res =>{
              console.log(res);         
           });
         }
       })
     })
   }

    

  appNotification(form){
    console.log(form.value); 
    this.fullname =  localStorage.getItem("FIRSTNAME") + localStorage.getItem("LASTNAME");
     
    this.notificationData = ({
      'creator': this.fullname, 
      'creatorId':localStorage.getItem("ID"),
      'responsable': localStorage.getItem("ID"), 
      'responsableId': localStorage.getItem("ID"),
      'form': localStorage.getItem("ID"),
      'title': 'E-services - Preparacion de trabajo', 
      'longTitle':'Ha editado una preparacion de trabajo de E-Services;',
       'color':'yellow accent-4',
      'description':'editado', 
      'read':0, 
      'action':  ".eservices-management/workpreparation/3/"+ this.managementId + '/' + this.serviceLine ,
      'managementId': this.managementId
      // 'modified':string,
    });



    // this.NotificationsService.createNotification(this.notificationData).subscribe
    // (res => {
    //   console.log(res);
    //   // this.getNotificationsByCreatorId()
    //   // const url = (`./eservices-management/start-management/1/${managementId}`);
    //   // location.assign(url); 
    // })
  //  this.emailNotification();
  }

  emailNotification(){

    this.maildata = ({
      'to':localStorage.getItem("EMAIL"),
      'toName': this.fullname, 
      'from': this.fullname, 
      'type':'accion',
      'module': 'E-Services',
      'subject':'Ha editado una preparacion de trabajo de E-Services;',
      'description': ".eservices-management/workpreparation/3/"+ this.managementId + '/' + this.serviceLine ,
  }); 


    this.emailsService.postMail(this.maildata).subscribe
    (res =>{
       console.log(res);         
    });
    
  }


  
}

