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
import { PhotoService }from'src/app/services/photo/photo.service';

var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

export interface photo{}
interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}



@Component({
  selector: 'app-work-phase1',
  templateUrl: './work-phase1.component.html',
  styleUrls: ['./work-phase1.component.css']
})
export class WorkPhase1Component implements OnInit {


  public tab: number = 0 ; 
  public managementId: string;
  //para capturar la linea de servicio del usuario logueado
  public wtsl : boolean =false; 
  public ctsl: boolean =false; 
  public slsl: boolean =false; 
  public wlsl: boolean =false; 
  public fisl: boolean =false; 
  public res: any; 
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
    public lineForSelect:any; 
    public creatorSL:any; 
    public serviceLine:string;  
    public bloquedCicle:string = '0'; 

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

    responsableNotificated:any; 
    public photos; 
    showCT:any;
    showSL:any;
    showWT:any;
    showWL:any;
    showFI:any;

    file: File; //archivo tipo file que viene de HTML 

  constructor(
    public emailsService: EmailsService, 
    public jpactivityService: JpactivityService,
    public UserService: UserService,
    public router:Router,
    public route: ActivatedRoute,
    public NotificationsService: NotificationsService,
    public PhotoService: PhotoService, 

  ) { }




  //debemos validad primero el rol de usuario 
  //luego consultar si es basico mostrarle un work preparation de management id + service line 
  //en caso de ser administrador hay que traerle una linea de servicio primero y 
  //poder manipular si selecciona con un selector cambiar de linea dee servicio 

  ngOnInit() {
    const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 

      //validar el rol del usuario logueado
      //aqui capturamos si tiene los permismos de ver todas las lineas o solo su linea 
      //y si es solo su linea filtramos las preguntas por su linea 
      this.validationrole()   
       
      //buscamos workPreparation segun el status de validacion
      // this.findWorkPreparation()


      //traemos la lista de responsables hay que buscar la linea de servicio seleccionada
      this.findResponsables();
      this.materializecss();
      this.consultView();

      this.findPhotos(managementId);
  }




  notification(event:Event, question){
    if(question == 0){
      
    }
   console.log(event, question);
   this.UserService.getProfileById(event).subscribe
   (res=>{
     console.log(res);
   })
  }

  consultView(){
    if (this.route.snapshot.params.edit == 1){
      this.tab = 1; 
    }else {
      this.tab = 0; 
    }
  }

  validationrole(){
    this.AuthuserId= localStorage.getItem("ID"),
    this.UserService.getProfileByAuthId(this.AuthuserId).subscribe
    (res =>{
      this.UserService.selectedProfile = res as any; 
       this.profile = this.UserService.selectedProfile[0]; 
    //  console.log( this.profile);
      // if (this.profile.permisology.eservices.WorkPreparation.admin == true){
        if (this.profile.permisology.eservices.WorkPreparation.edit == true){
        //si es admin nos traemos todas las lineas de servicio 
          //  console.log('admin user');
        //alert('admin')
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
        //  alert('true 2');
        }


      //buscamos la histria del management, capturar las lineas de servicio 
      this.findManagement_admin()

        }else{
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
        // con esto todos los usuarios son admins 
        this.ifAdmin = '1'
        //si no es admin buscamos solo su linea de servico vs linea de servicio del management id 
        //    console.log('no admin user')
        this.LogedRole = 'admin';
       // this.LogedRole = 'basic';
        //this.ifAdmin = '0'
        this.findManagement_admin()

      //buscamos el management 
 //     this.findManagement_basic()
      }
    })
  
  }
 
  findManagement_basic(){




    this.managementId = this.route.snapshot.params["id"];
    this.jpactivityService.getJpactivity(this.managementId).subscribe
    (res => {
      this.jpactivityService.selectedJpactivity = res as Jpactivity;
     // console.log(res)
    //  alert('estop')
    //  console.log('****************************************') 
      // console.log(this.jpactivityService.selectedJpactivity)
      // console.log(this.MannagementserviceLines)
    




    // bloque de aprobacion para usuarios basicos, reivsamos si hay match entre el profile y el maangemt 
    var aprobationct = 0; 
    var aprobationsl = 0; 
    var aprobationwt = 0; 
    var aprobationfi = 0; 
    var aprobationwl = 0; 


    //console.log(this.profile.serviceLine.operations);
    //console.log(this.jpactivityService.selectedJpactivity);

    
    if (this.jpactivityService.selectedJpactivity.ct == true && this.profile.serviceLine.operations.ct == true){
     // console.log(' tiene perimisos 1')
      aprobationct = 1; 
    }
    if (this.jpactivityService.selectedJpactivity.wt == true && this.profile.serviceLine.operations.wt == true){
     // console.log(' tiene perimisos 2')
      aprobationwt = 1; 
    }
    if (this.jpactivityService.selectedJpactivity.sl == true && this.profile.serviceLine.operations.sl == true){
     // console.log(' tiene perimisos 3')
      aprobationsl = 1; 
    }
    if (this.jpactivityService.selectedJpactivity.fi == true && this.profile.serviceLine.operations.fi == true){
    //  console.log(' tiene perimisos 4')
      aprobationfi = 1; 
    }
    if (this.jpactivityService.selectedJpactivity.wl == true && this.profile.serviceLine.operations.wl == true){
    //  console.log(' tiene perimisos 5')
      aprobationwl = 1; 
    } 
    
    if ( aprobationct == 1 || aprobationwt == 1 ||  aprobationsl == 1 || aprobationfi == 1 || aprobationwl == 1 ){
     // console.log('tiene una aprobacion')
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
 //aqui decimos que nos muestre las preguntas de la linea de servicio del usuario 
      //en vez de la tomada por el selector
      this.showServiceLine = this.basicUserServiceLine; 
      //console.log(this.profile)
     // console.log(this.showServiceLine)
      this.jpactivityService.getWorkpreparationByManagementIdandAuthId(this.managementId, this.AuthuserId, this.basicUserServiceLine )
      .subscribe (res =>{
        this.jpactivityService.selectedWorkPreparation = res[0] as any; 
      //  console.log(res);
     //   console.log('***********************22222',)
        if ( this.jpactivityService.selectedWorkPreparation ){
          this.workId = this.jpactivityService.selectedWorkPreparation._id; 
       //   console.log('es un edit', this.workId)
          this.createOrEdit = 'edit';
            //consultamos si mostramos observaciones 1 y 2 
        //  this.consultShow()
        }else{ 
         // console.log('es un create')
          this.createOrEdit = 'create';
          if (this.UserService.Profiles[0].serviceLine.operations.ct == true){
            this.creatorSL = 'ct'; 
            // form.value.serviceLineCt == true; 
          }
          if (this.UserService.Profiles[0].serviceLine.operations.fi == true){
            this.creatorSL = 'fi'; 
            // form.value.serviceLineFi == true; 
          }

          if (this.UserService.Profiles[0].serviceLine.operations.sl == true){
            this.creatorSL = 'sl'; 
            // form.value.serviceLineSl == true; 
          }
          if (this.UserService.Profiles[0].serviceLine.operations.wl == true){
            this.creatorSL = 'wl'; 
            // form.value.serviceLineWl == true; 
          }
            if (this.UserService.Profiles[0].serviceLine.operations.wt == true){
            this.creatorSL = 'wt'; 
           
            // form.value.serviceLineWt == true; 
            }
        }
      })
    } else {
    //  console.log(' no tiene  ninguna aprobacion ')
      alert('No tiene permisos para crear una orden de trabajo ya que su linea de servicio no pertenece a la orden de trabajo, contacte a un administrador')
    }  
  })
  }
 
  findManagement_admin(){


    this.managementId = this.route.snapshot.params["id"];
    this.jpactivityService.getJpactivity(this.managementId).subscribe
    (res => {
      this.jpactivityService.selectedJpactivity = res as any; 
     // console.log(this.jpactivityService.selectedJpactivity )
     //console.log(res)
     //alert('estop')
      //capturar las lineas de servicio del management 
       this.MannagementserviceLines = ({
        wt :  this.jpactivityService.selectedJpactivity.wt,
        sl :  this.jpactivityService.selectedJpactivity.sl,
        fi :  this.jpactivityService.selectedJpactivity.fi,
        ct :  this.jpactivityService.selectedJpactivity.ct,
        wl :  this.jpactivityService.selectedJpactivity.wl,
       })


    
    //   console.log(this.MannagementserviceLines)
       this.findWorkPreparationByManagementid();
        this.findOptionsForSelect();
    })
  }




  // 1 
   //buscar workPreparation by managemt id   
  findWorkPreparationByManagementid(){
    this.serviceLine = this.route.snapshot.params["sl"];
    this.jpactivityService.getWorkpreparationByManagementIdandSl(this.serviceLine, this.managementId, this.AuthuserId).subscribe
    (res=>{
     
    //  console.log(res[0]); 
    // alert('alerta here')
       if (res[0]){

        this.jpactivityService.selectedWorkPreparation = res[0] as any; 
        this.workId = this.jpactivityService.selectedWorkPreparation._id; 
      //  console.log('***********************1111',   this.jpactivityService.selectedWorkPreparation)
       // console.log('es un edit', this.workId)
        this.createOrEdit = 'edit';
       }else{
      //  console.log('es un create')
    //  alert('es un create')
        this.createOrEdit = 'create';
       } 
    })
  }
 








  saveWork(form: NgForm){
    if (this.createOrEdit == 'create'){
      console.log('++++++++++create+++++++++++')
    //  console.log(form.value);
      this.jpactivityService.saveWorkPreparation(form.value).subscribe
      (res => { 
    //    console.log(res);
        M.toast({html: 'Creado!'})  
        this.appNotification(form);
        this.notifictionResponsable(form);
      });

    }else{ 
        //crear editar
        console.log('++++++++++editar+++++++++++')
     //   console.log(form.value);
        this.jpactivityService.editWork(form.value, this.workId).subscribe
        (res => {
      //     console.log(res);
           M.toast({html: 'Guardado!'})  
           this.appNotification(form);
           this.notifictionResponsable(form); 
        });
        
    }  
    //manipular boleano de show 
  }

  //capturar el cambio de select para luego mostar las preguntas de esa linea 
  captureServiceSelected(sl){
  
    if (sl == 'wl'){
     
      this.showServiceLine = 'wl';
      this.creatorSL = 'wl'; 

  //   console.log(this.showServiceLine)
    
    }
    if (sl == 'ct'){
     
      this.showServiceLine = 'ct';
      this.creatorSL = 'ct'; 

  //    console.log(this.showServiceLine)
    }
    if (sl == 'fi'){
     
      this.showServiceLine = 'fi';
      this.creatorSL = 'fi'; 

  //    console.log(this.showServiceLine)
    }
    if (sl == 'wt'){
     
      this.showServiceLine = 'wt';
      this.creatorSL = 'wt'; 

  //    console.log(this.showServiceLine)
    }
    if (sl == 'sl'){
     
      this.showServiceLine = 'sl';
      this.creatorSL = 'sl'; 

  //    console.log(this.showServiceLine)
    }

 




    //ahora buscamos si hay algun work preparation con este management id, la linea seleccionada.

    this.jpactivityService.getWorkpreparationByManagementIdandSl(this.showServiceLine, this.managementId, this.AuthuserId).subscribe
    (res=>{
       
    
      if (res[0]){
      //  console.log(' no vacio')
        this.jpactivityService.selectedWorkPreparation = res[0] as any;
       // console.log( this.jpactivityService.selectedWorkPreparation);
         
      //  console.log(res);
        this.workId = this.jpactivityService.selectedWorkPreparation._id;
        this.createOrEdit = 'edit';
      }else{
        
       // console.log(' vacio')
        this.createOrEdit = 'create';
        this.jpactivityService.selectedWorkPreparation = res as any;

   //     console.log(res);
    
      }
     
     
    })
  }  






  //----------------------------------
  //-----------no criticals 
 //------------------------------------
   findResponsables(){
    this.UserService.getProfiles().subscribe
    (res=>{
      //console.log(res);
      this.UserService.Profiles = res as any[];
    })
  }

  //consultar cuales opciones vamos a mostrar en el selector
  findOptionsForSelect(){
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
             // alert('caso 4')
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

              
              // console.log( this.MannagementserviceLines)
              // console.log(this.selectCase);
             
                 
              // console.log( this.MannagementserviceLines)
              // console.log(this.selectCase);



 
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
     
    
    if(q == 2){
      if(this.showOb2q2 == '1'){
        this.showOb3q2 = '1'
      }else{
          this.showOb2q2 = '1';
      }
    }

    
    if(q == 3){
      if(this.showOb2q3 == '1'){
        this.showOb3q3 = '1'
      }else{
          this.showOb2q3 = '1';
      }
    }

   
    if(q == 4){
      if(this.showOb2q4 == '1'){
        this.showOb3q4 = '1'
      }else{
          this.showOb2q4 = '1';
      }
    }


    if(q == 5){
      if(this.showOb2q5 == '1'){
        this.showOb3q5 = '1'
      }else{
          this.showOb2q5 = '1';
      }
    }


    
    if(q == 6){
      if(this.showOb2q6 == '1'){
        this.showOb3q6 = '1'
      }else{
          this.showOb2q6 = '1';
      }
    }

      
    if(q == 7){
      if(this.showOb2q7 == '1'){
        this.showOb3q7 = '1'
      }else{
          this.showOb2q7 = '1';
      }
    }


      
    if(q == 8){
      if(this.showOb2q8 == '1'){
        this.showOb3q8 = '1'
      }else{
          this.showOb2q8 = '1';
      }
    }

      
    if(q == 9){
      if(this.showOb2q9 == '1'){
        this.showOb3q9 = '1'
      }else{
          this.showOb2q9 = '1';
      }
    }



    if(q == 10){
      if(this.showOb2q10 == '1'){
        this.showOb3q10 = '1'
      }else{
          this.showOb2q10 = '1';
      }
    }


    if(q == 11){
      if(this.showOb2q11 == '1'){
        this.showOb3q11 = '1'
      }else{
          this.showOb2q11 = '1';
      }
    }

    if(q == 12){
      if(this.showOb2q12 == '1'){
        this.showOb3q12 = '1'
      }else{
          this.showOb2q12 = '1';
      }
    }
    if(q == 13){
      if(this.showOb2q13 == '1'){
        this.showOb3q13 = '1'
      }else{
          this.showOb2q13 = '1';
      }
    }
    if(q == 14){
      if(this.showOb2q14 == '1'){
        this.showOb3q14 = '1'
      }else{
          this.showOb2q14 = '1';
      }
    }
    if(q == 15){
      if(this.showOb2q15 == '1'){
        this.showOb3q15 = '1'
      }else{
          this.showOb2q15 = '1';
      }
    }
    if(q == 16){
      if(this.showOb2q16 == '1'){
        this.showOb3q16 = '1'
      }else{
          this.showOb2q16 = '1';
      }
    }
    if(q == 17){
      if(this.showOb2q17 == '1'){
        this.showOb3q17 = '1'
      }else{
          this.showOb2q17 = '1';
      }
    }
    if(q == 18){
      if(this.showOb2q18 == '1'){
        this.showOb3q18 = '1'
      }else{
          this.showOb2q18 = '1';
      }
    }
    if(q == 19){
      if(this.showOb2q19 == '1'){
        this.showOb3q19 = '1'
      }else{
          this.showOb2q19 = '1';
      }
    }
    if(q == 20){
      if(this.showOb2q20 == '1'){
        this.showOb3q20 = '1'
      }else{
          this.showOb2q20 = '1';
      }
    }





   // console.log('addObesrvaiton')
  }


  fileUpload(event?: htmlInputEvent): void{



    if (event.target.files && event.target.files[0])
    {
      const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
      if(managementId)
      {
        this.file = <File>event.target.files[0]; 
        var array = ({
          'idAutor' : localStorage.getItem("ID"),
          'managementId' :managementId, 
          'item'  : 'wp1' //work preparation 1
        })
        this.PhotoService.postPhotoOrDocument(this.file, array).subscribe
        (res=>{
          console.log(res)
          this.findPhotos(managementId);
        
        })
      }
    }
  }


      //buscamos las fotos relacionadas con el usuario LOGEADO 
  findPhotos(managementId){
        // console.log(managementId);
      
        var array = ({
          managementId : managementId, 
          item: 'wp1', 
          userId:  localStorage.getItem("ID"),
        })

        this.PhotoService.getPhotoByClosingPhase(array).subscribe
        (res=> {
          console.log(res);
          this.photos = res; 
        })
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

 
    //-----------------------------
    // funciones de nnotificaciones 
    //-----------------------------


    notifictionResponsable(form){

     //capturar aqui todos el responsableId de toddas las preguntas en if 
     //luego enviar a notificationPhase1 una variable pulica para cada if 


     //******pending
     // no notificar a un usuario dos veces  como responsable en la misma pagina 
     // pensar como seria si ya fuern notificados anteriormente, no pueden ser notificados pos veces en cada edit  
    //  console.log(form.value)


    //  if (this.bloquedCicle == '0'){


        console.log(form.value);

        if(form.value.responsable){
          this.responsableNotificated = form.value.responsable;
          this.notificationPhase1(this.responsableNotificated);
        }
        // if (form.value.planeationFormatresponsable){
        //   this.bloquedCicle ='1'; 
        //   this.responsableNotificated  = form.value.planeationFormatresponsable;
        //   // this.notificationPhase1(this.responsableNotificated);
        // }
    //  } 


    //  if (this.bloquedCicle == '0'){
        // if(form.value.requestIresponsable){
        //   this.bloquedCicle ='1'; 
        //     this.responsableNotificated  = form.value.requestIresponsable;
        //     // this.notificationPhase1(this.responsableNotificated);
        // }
    // }


    // if (this.bloquedCicle == '0'){
        // if (form.value.opScoperesponsable){
        //   this.bloquedCicle ='1'; 
        //   this.responsableNotificated  = form.value.opScoperesponsable;
        //     this.notificationPhase1(this.responsableNotificated);
        // }
      // }

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

    // console.log('appNotification'); 
    // this.fullname =  localStorage.getItem("FIRSTNAME") + ' ' + localStorage.getItem("LASTNAME");
    
    // if (this.createOrEdit == 'create'){

    //   this.notificationData = ({
    //     'creator': this.fullname, 
    //     'creatorId':localStorage.getItem("ID"),
    //     'responsable': localStorage.getItem("ID"), 
    //     'responsableId': localStorage.getItem("ID"),
    //     'form': localStorage.getItem("ID"),
    //     'title': 'E-services - Preparacion de trabajo', 
    //     'longTitle':'Ha Creado una preparacion de trabajo de E-Services;',
    //      'color':'yellow accent-4',
    //     'description':'editado', 
    //     'read':0, 
    //     'action':  ".eservices-management/workpreparation/1/"+ this.managementId + '/' + this.serviceLine ,
    //     'managementId': this.managementId
    //   });

    // }else{

    //   this.notificationData = ({
    //     'creator': this.fullname, 
    //     'creatorId':localStorage.getItem("ID"),
    //     'responsable': localStorage.getItem("ID"), 
    //     'responsableId': localStorage.getItem("ID"),
    //     'form': localStorage.getItem("ID"),
    //     'title': 'E-services - Preparacion de trabajo', 
    //     'longTitle':'Ha editado una preparacion de trabajo de E-Services;',
    //      'color':'yellow accent-4',
    //     'description':'editado', 
    //     'read':0, 
    //     'action':  ".eservices-management/workpreparation/4/"+ this.managementId + '/' + this.serviceLine ,
    //     'managementId': this.managementId
    //   });
    // }


    // this.NotificationsService.createNotification(this.notificationData).subscribe
    // (res => {
    //   console.log(res);
      
    // })


   this.emailNotification();
   
  }



  
  emailNotification(){

    // if (this.createOrEdit == 'create'){
    //   this.maildata = ({
    //     'to':localStorage.getItem("EMAIL"),
    //     'toName': this.fullname, 
    //     'from': this.fullname, 
    //     'type':'accion',
    //     'module': 'E-Services',
    //     'subject':'Ha Creado una preparacion de trabajo de E-Services;',
    //     'description': ".eservices-management/workpreparation/1/"+ this.managementId + '/' + this.serviceLine ,
    // }); 


    // }else{ 
    //   this.maildata = ({
    //     'to':localStorage.getItem("EMAIL"),
    //     'toName': this.fullname, 
    //     'from': this.fullname, 
    //     'type':'accion',
    //     'module': 'E-Services',
    //     'subject':'Ha editado una preparacion de trabajo de E-Services;',
    //     'description': ".eservices-management/workpreparation/1/"+ this.managementId + '/' + this.serviceLine ,
    // }); 
    // }

    // this.emailsService.postMail(this.maildata).subscribe
    // (res =>{
    //    console.log(res);         
    // });
  }
   

   back(){
    window.history.back();
  }
}
