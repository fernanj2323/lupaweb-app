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

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 


export interface photo{}

interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-objectives',
  templateUrl: './phase2-objectives.component.html',
  styleUrls: ['./phase2-objectives.component.css'],
  providers: [JpactivityService,NotificationsService, CriticalRequirementsService, DeparmentsService]
})
export class Phase2ObjectivesComponent implements OnInit {

  //datos que nos tramemos del start management 
  public nameClient: string; 
  public newClient: boolean; 
  public nameCamp: string; 
  public newCamp: boolean;
  
  public nameWell:string; 
  public newWell: boolean; 
  public nameDistrict: string; 
  public newDistrict: boolean; 
  public managementId: string; 
//--------------------------------------------
file: File; //archivo tipo file que viene de HTML 
   
  public name: string; 
  public _id: string; 
  public error: string; 
  public id: string;
  public tab:number = 0; //milestones 
  public flag: number=0; 
  public showFinish : number= 0; 
  public serviceLine: string; 


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
  public viewOrEdit = 0; // orignalemtne en edit 
  

  constructor(
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
    this.consultIfEdit(); 
    this.questions();
    this.findStatus(); 
    this.managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
    this.getManagement(this.managementId);
    this.findHistoryIfExists();
    this.materialize();
    this.findUsers();
    this.flag=1; //activamos banderin para marcar que se trajo un id
    this.findCriticalRequirements();
  }

  consultIfEdit(){ 
    this.viewOrEdit = this.route.snapshot.params["edit"]; //capturamos edit enrutado
   if(this.viewOrEdit == 1){
 // console.log('es un view');
   }else { 
     this.viewOrEdit= 0; 
   }
 }

//buscamos los posibles status de KOM 
  findStatus(){
    this.jpactivityService.getStatus().subscribe
    (res => { 
  
       this.jpactivityService.selectedManagementStatus = res as any; 
      // console.log('management estatus',    this.jpactivityService.selectedManagementStatus)
    });    
  }

  //capturamos el cambio de estado del management y editamos 


//buscamos todos los datos de los requerimientos criticos si es que existen 
findHistoryIfExists(){
  this.managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
  this.jpactivityService.getCriticalReqOfManagementId(this.managementId)
  .subscribe(res => {
   var previous  = res as CriticalReq[];
   if (previous[0]){
    this.jpactivityService.selectedCriticalReq = previous[0];
    // console.log('selected critical req', this.jpactivityService.selectedCriticalReq)
   } else {
    this.jpactivityService.selectedCriticalReq = [] as any 
    // console.log('previous',previous[0])
   }
  });
}






  materialize(){
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      //var instances = M.FormSelect.init(elems, options);
    });

    //boton flotante 
    $(document).ready(function(){
      $('.fixed-action-btn').floatingActionButton();
    });
    $(document).ready(function(){
      $('.modal').modal();
    });
    // modales 
    $(document).ready(function(){
      $('.modalAddLocation').modal();
      // console.log('modal')
    });
    this.formSelect();
  }

  formSelect(){
    document.addEventListener('DOMContentLoaded', function() {
      // var elems = document.querySelectorAll('select');
      // var instances = M.FormSelect.init(elems, options);
    });
  }
  

  back(){
    window.history.back();
  }


 
  getManagement(managementId:string){
    this.jpactivityService.selectedJpactivity  = [] as any; 
    this.jpactivityService.getJpactivity(managementId).subscribe 
    (res=> {
    this.jpactivityService.selectedJpactivity = res as any;
   // console.log('jpActivity', this.jpactivityService.selectedJpactivity )

    //consultamos el estado de la  fase, si es igual a 2 entonces motramos el boton de finalizar 
    if (this.jpactivityService.selectedJpactivity.phase == '2'){
     this.showFinish = 1; 
    } else { 
      this.showFinish = 0; 
    }

    //capturamos la linea de servicio en una variable global; 
      // this.serviceLine = this.jpactivityService.selectedJpactivity.responsibleLine; 
      // console.log('linea de servicio 1', this.serviceLine)

      const activity = this.jpactivityService.selectedJpactivity;
     //capturamos todo lo que necesitamos del start management 
      this.name = activity.name;
      this._id = activity._id;
      this.nameClient = activity.client; 
      this.newClient = activity.NewClient;
      this.nameCamp  = activity.camp;
      this.newCamp = activity.NewCamp; 
      this.nameWell= activity.well;
      this.newWell= activity.NewWell;
      this.nameDistrict = activity.district;
      this.newDistrict = activity.NewDistrict; 
      // this.nameClient = this.jpactivityService.selectedJpactivity.
     });
  }

  finish(){

    //console.log('finalizando')
    this.managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
    this.jpactivityService.upStatusOfManagement( this.managementId)
    .subscribe(res => {
   //   console.log(res)

    })
  }

 saveManagement(form: NgForm){
  //consultamos el si risk zone es igual a null para hard code false 
  if (form.value.riskZone == undefined){
    form.value.riskZone = false; 
  }else{
    form.value.hrisk = '1'; 
  }


  if(form.value.technologyReq !== ''&& form.value.technologyReq !== 'N/A' ){
  //  console.log('technologyReq', form.value.technologyReq)
    form.value.hrisk = '1'; 
  }
  if(form.value.operationReq !== '' && form.value.operationReq !== 'N/A'){
  // console.log('technologyReq', form.value.operationReq)
   form.value.hrisk = '1'; 
 }
 if(form.value.wellReq !== '' && form.value.hseReq !== 'N/A'){
 //  console.log('technologyReq', form.value.wellReq)
   form.value.hrisk = '1'; 
 }
 if(form.value.hseReq !== '' && form.value.hseReq !== 'N/A' ){
  // console.log('technologyReq', form.value.hseReq)
   form.value.hrisk = '1'; 
 }





  //consultamos si esta lleno el formulario, 'al menos los selectores'
  if (form.value.technologyReq == '' || 
  form.value.operationReq == '' || 
  form.value.wellReq == '' || 
  form.value.hseReq == '' ) {
    //no esta lleno el formulario
     if(form.value.technologyReq !== ''){
    //   console.log('technologyReq', form.value.technologyReq)
       form.value.hrisk = '1'; 
     }
     if(form.value.operationReq !== ''){
     // console.log('technologyReq', form.value.operationReq)
      form.value.hrisk = '1'; 
    }
    if(form.value.wellReq !== ''){
    //  console.log('technologyReq', form.value.wellReq)
      form.value.hrisk = '1'; 
    }
    if(form.value.hseReq !== ''){
    //  console.log('technologyReq', form.value.hseReq)
      form.value.hrisk = '1'; 
    }
    //console.log('hay un selector vacio')  
  } else {

    if (form.value.technologyReq == 'N/A' && 
    form.value.operationReq == 'N/A' && 
    form.value.wellReq == 'N/A' && 
    form.value.hseReq == 'N/A' )
     {
      this.showFinish = 1; 
      form.value.hrisk = '0'; 
     
    }else{

    //si esta lleno el formulario 
   // console.log('no hay un selector vacio')
    this.showFinish = 1; 
    form.value.hrisk = '1'; 

    }

   }

  // console.log('first door',form.value); 
   //primero debemos saber si es un create o un edit 
   // eso lo sabemos viendo si hay datos guardados con el management id existente, 

   if (form.value.hrisk == '1'){
     //.log('ya existe un riesgo alto de management 1')
   }
   this.jpactivityService.getCriticalReqOfManagementId(form.value.managementId)
   .subscribe(res => {
    var previous  = res as CriticalReq[];
    // console.log('consultamos si ya existe critical req', previous) ;
     if (previous[0])
     {// entonces es un edit no un create
      // console.log('si existe data previa',previous[0]._id )
       this.jpactivityService.putCriticalReq(form.value, previous[0]._id)
      .subscribe(res => {
      M.toast({
          html: 'Condiciones criticas Editada '
         })
         
      });
     }else{
       //es un create
      //  console.log('no existe data previa ')
      this.jpactivityService.postCriticalReq(form.value)
      .subscribe(res => {
       M.toast({
         html: 'Condiciones criticas Creadas '
         })
       
      // console.log(res);
   });
     }
});
  // console.log('second door',form.value); 
  };

  changueStatus(event){
    console.log(event.value);
    if (event.value == 3) {
      this.notificationLines()
    }
     this.managementId = this.route.snapshot.params["id"];
     this.jpactivityService.changueStatus(event.value,  this.managementId)
     .subscribe(res => {
      console.log(res);
      M.toast({
        html: 'Editado estatus de KOM'
       })
     });
  }


  notificationLines(){
    console.log('notification lines',      this.managementId )
    this.jpactivityService.getJpactivity(this.managementId).subscribe
    (res=>{
    

      var management = res as any 
      if (management.hrisk == 1){ 
        this.hriskNotification(management);
      }
      
        if (management.ct == true){
          var userProfileId = '5de6ac220e122c333807b2c8'; 
          var title = 'Eservices - Nueva Operacion de Coiled Tubing'
          var serviceLine = 'ct'
          if (management.hrisk == 1){ 
            var longtitle = 'Nueva operacion critica requiere su gestión'
            var color = 'red accent-1'
          }else{ 
            var longtitle = 'Nueva operacion convencional requiere su gestión'
            var color = 'yellow accent-4'
          }
          this.notificationData = ({ 
            'creator': localStorage.getItem('FIRSTNAME') , 
            'creatorId': localStorage.getItem("ID"),
            'responsable': userProfileId, 
            'responsableId': userProfileId,
            'form': localStorage.getItem("ID"),
            'title': title,
            'longTitle':longtitle,
            'color':color,  
            'description':'editado',
            'read':0,
            'action':  "eservices-management/workpreparation/1/"+ this.managementId + '/' + serviceLine ,
            'managementId': this.managementId
          }); 


        
          this.NotificationsService.createNotification(this.notificationData).subscribe
              (res=>{console.log(res)})

        }
        if (management.fi == true){
          var userProfileId = '5de6ac220e122c333807b2c8'; 
          var title = 'Eservices - Nueva Operacion de Frente de inyección'
          var serviceLine = 'fi'
          if (management.hrisk == 1){ 
            var longtitle = 'Nueva operacion critica requiere su gestión'
            var color = 'red accent-1'
          }else{ 
            var longtitle = 'Nueva operacion convencional requiere su gestión'
            var color = 'yellow accent-4'
          }
          this.notificationData = ({ 
            'creator': localStorage.getItem('FIRSTNAME') , 
            'creatorId': localStorage.getItem("ID"),
            'responsable': userProfileId, 
            'responsableId': userProfileId,
            'form': localStorage.getItem("ID"),
            'title': title,
            'longTitle':longtitle,
            'color':color,  
            'description':'editado',
            'read':0,
            'action':  "eservices-management/workpreparation/1/"+ this.managementId + '/' + serviceLine ,
            'managementId': this.managementId
          }); 
          this.NotificationsService.createNotification(this.notificationData).subscribe
              (res=>{console.log(res)})
        }
        if (management.sl == true){
          var userProfileId = '5de6ac220e122c333807b2c8'; 
          var title = 'Eservices - Nueva Operacion de Slick Line'
          var serviceLine = 'sl'
          if (management.hrisk == 1){ 
            var longtitle = 'Nueva operacion critica requiere su gestión'
            var color = 'red accent-1'
          }else{ 
            var longtitle = 'Nueva operacion convencional requiere su gestión'
            var color = 'yellow accent-4'
          }
          this.notificationData = ({ 
            'creator': localStorage.getItem('FIRSTNAME') , 
            'creatorId': localStorage.getItem("ID"),
            'responsable': userProfileId, 
            'responsableId': userProfileId,
            'form': localStorage.getItem("ID"),
            'title': title,
            'longTitle':longtitle,
            'color':color,  
            'description':'editado',
            'read':0,
            'action':  "eservices-management/workpreparation/1/"+ this.managementId + '/' + serviceLine ,
            'managementId': this.managementId
          }); 
          this.NotificationsService.createNotification(this.notificationData).subscribe
              (res=>{console.log(res)})
        }
        if (management.wl == true){
          var userProfileId = '5de6ac220e122c333807b2c8'; 
          var title = 'Eservices - Nueva Operacion de Well Login'
          var serviceLine = 'wl'
          if (management.hrisk == 1){ 
            var longtitle = 'Nueva operacion critica requiere su gestión'
            var color = 'red accent-1'
          }else{ 
            var longtitle = 'Nueva operacion convencional requiere su gestión'
            var color = 'yellow accent-4'
          }
          this.notificationData = ({ 
            'creator': localStorage.getItem('FIRSTNAME') , 
            'creatorId': localStorage.getItem("ID"),
            'responsable': userProfileId, 
            'responsableId': userProfileId,
            'form': localStorage.getItem("ID"),
            'title': title,
            'longTitle':longtitle,
            'color':color,  
            'description':'editado',
            'read':0,
            'action':  "eservices-management/workpreparation/1/"+ this.managementId + '/' + serviceLine ,
            'managementId': this.managementId
          }); 
          this.NotificationsService.createNotification(this.notificationData).subscribe
              (res=>{console.log(res)})
        }
        if (management.wt == true){
          var userProfileId = '5de6ac220e122c333807b2c8'; 
          var title = 'Eservices - Nueva Operacion de Well Testing'
          var serviceLine = 'wt'
          if (management.hrisk == 1){ 
            var longtitle = 'Nueva operacion critica requiere su gestión'
            var color = 'red accent-1'
          }else{ 
            var longtitle = 'Nueva operacion convencional requiere su gestión'
            var color = 'yellow accent-4'
          }
          this.notificationData = ({ 
            'creator': localStorage.getItem('FIRSTNAME') , 
            'creatorId': localStorage.getItem("ID"),
            'responsable': userProfileId, 
            'responsableId': userProfileId,
            'form': localStorage.getItem("ID"),
            'title': title,
            'longTitle':longtitle,
            'color':color,  
            'description':'editado',
            'read':0,
            'action':  "eservices-management/workpreparation/1/"+ this.managementId + '/' + serviceLine ,
            'managementId': this.managementId
          }); 
          this.NotificationsService.createNotification(this.notificationData).subscribe
              (res=>{console.log(res)})
        }

    
     
    })
  }


  hriskNotification(management){

   // console.log('management de alto riesgo', management)

   
      var idGerenciaGeneral = '5de6ac220e122c333807b2c8'; 
      var idGerenciaOperaciones = '5de6ac220e122c333807b2c8'; 
      var idGerenciaExcelencia = '5de6ac220e122c333807b2c8'; 

      var title = 'Eservices - Nueva Operacion critica'
    
      this.notificationData = ({ 
        'creator': localStorage.getItem('FIRSTNAME') , 
        'creatorId': localStorage.getItem("ID"),
        'responsable': idGerenciaGeneral, 
        'responsableId': idGerenciaGeneral,
        'form': localStorage.getItem("ID"),
        'title': title,
        'longTitle':'Nueva operacion critica requiere su gestión',
        'color':'red accent-1',  
        'description':'editado',
        'read':0,
        'action':  "eservices-management/workpreparation/1/"+ this.managementId ,
        'managementId': this.managementId
      }); 
      this.NotificationsService.createNotification(this.notificationData).subscribe
          (res=>{
            console.log(res)

            this.notificationData = ({ 
              'creator': localStorage.getItem('FIRSTNAME') , 
              'creatorId': localStorage.getItem("ID"),
              'responsable': idGerenciaOperaciones, 
              'responsableId': idGerenciaOperaciones,
              'form': localStorage.getItem("ID"),
              'title': title,
              'longTitle':'Nueva operacion critica requiere su gestión',
              'color':'red accent-4',  
              'description':'editado',
              'read':0,
              'action':  "eservices-management/workpreparation/1/"+ this.managementId ,
              'managementId': this.managementId
            }); 
        
            this.NotificationsService.createNotification(this.notificationData).subscribe
            (res=>{
              
              console.log(res)
              this.notificationData = ({ 
                'creator': localStorage.getItem('FIRSTNAME') , 
                'creatorId': localStorage.getItem("ID"),
                'responsable': idGerenciaExcelencia, 
                'responsableId': idGerenciaExcelencia,
                'form': localStorage.getItem("ID"),
                'title': title,
                'longTitle':'Nueva operacion critica requiere su gestión',
                'color':'red accent-4',  
                'description':'editado',
                'read':0,
                'action':  "eservices-management/workpreparation/1/"+ this.managementId ,
                'managementId': this.managementId
              }); 

              
            this.NotificationsService.createNotification(this.notificationData).subscribe
            (res=>{
              console.log(res)
            })
            })
          })

   
  } 

  findCriticalRequirements(){
    // console.log('buscando')
    this.CriticalRequirementsService.getOperationConditions()
    .subscribe
    (res => {
      this.CriticalRequirementsService.operationCondition = res as operationCondition[]; 
    //  console.log('condiciones de operaciones antes del friltro', this.CriticalRequirementsService.operationCondition )
    });

    this.CriticalRequirementsService.getHseConditions()
    .subscribe
    (res => {
      this.CriticalRequirementsService.hseConditicon = res as hseCondition[];
      // console.log('condiciones hseCondition', this.CriticalRequirementsService.technologyCondition )
    });

    this.CriticalRequirementsService.getWellConditions()
    .subscribe
    (res => {
      this.CriticalRequirementsService.wellCondition = res as wellCondition[];
    });

    this.CriticalRequirementsService.getTechnologyConditions()
    .subscribe
    (res => {
      this.CriticalRequirementsService.technologyCondition = res as technologyCondition[]; 
      // console.log('condiciones tecnologicas', this.CriticalRequirementsService.technologyCondition )
    });

   //filtramos por linea de servicio seleccionada en starmanagement 
    // console.log('responsibleLine:', this.jpactivityService.selectedJpactivity.responsibleLine)
    if (this.serviceLine == "Coiled Tubing")
    {
     this.serviceLine = 'CT';
     this.CriticalRequirementsService.operationCondition = this.CriticalRequirementsService.operationCondition.filter
     (array => array.ct === true)
     this.CriticalRequirementsService.hseConditicon = this.CriticalRequirementsService.hseConditicon.filter
     (array => array.ct === true)
     this.CriticalRequirementsService.wellCondition = this.CriticalRequirementsService.wellCondition.filter
     (array => array.ct === true)
     this.CriticalRequirementsService.technologyCondition = this.CriticalRequirementsService.technologyCondition.filter
     (array => array.ct === true)

    
    }
    if (this.serviceLine == "Wireline")
    {
     this.serviceLine = 'WL';

     this.CriticalRequirementsService.operationCondition = this.CriticalRequirementsService.operationCondition.filter
     (array => array.wl === true)
     this.CriticalRequirementsService.hseConditicon = this.CriticalRequirementsService.hseConditicon.filter
     (array => array.wl === true)
     this.CriticalRequirementsService.wellCondition = this.CriticalRequirementsService.wellCondition.filter
     (array => array.wl === true)
     this.CriticalRequirementsService.technologyCondition = this.CriticalRequirementsService.technologyCondition.filter
     (array => array.wl === true)
    }
    if (this.serviceLine == "Frente de inyección")
    {
     this.serviceLine = 'FI';

     this.CriticalRequirementsService.operationCondition = this.CriticalRequirementsService.operationCondition.filter
     (array => array.fi === true)
     this.CriticalRequirementsService.hseConditicon = this.CriticalRequirementsService.hseConditicon.filter
     (array => array.fi === true)
     this.CriticalRequirementsService.wellCondition = this.CriticalRequirementsService.wellCondition.filter
     (array => array.fi === true)
     this.CriticalRequirementsService.technologyCondition = this.CriticalRequirementsService.technologyCondition.filter
     (array => array.fi === true)
    }
    if (this.serviceLine == "SlickLine")
    {
     this.serviceLine = 'SL';

     this.CriticalRequirementsService.operationCondition = this.CriticalRequirementsService.operationCondition.filter
     (array => array.sl === true)
     this.CriticalRequirementsService.hseConditicon = this.CriticalRequirementsService.hseConditicon.filter
     (array => array.sl === true)
     this.CriticalRequirementsService.wellCondition = this.CriticalRequirementsService.wellCondition.filter
     (array => array.sl === true)
     this.CriticalRequirementsService.technologyCondition = this.CriticalRequirementsService.technologyCondition.filter
     (array => array.sl === true)
    }
    if (this.serviceLine == "Well Testing")
    {
     this.serviceLine = 'WT';
     this.CriticalRequirementsService.operationCondition = this.CriticalRequirementsService.operationCondition.filter
     (array => array.wt === true)
     this.CriticalRequirementsService.hseConditicon = this.CriticalRequirementsService.hseConditicon.filter
     (array => array.wt === true)
     this.CriticalRequirementsService.wellCondition = this.CriticalRequirementsService.wellCondition.filter
     (array => array.wt === true)
     this.CriticalRequirementsService.technologyCondition = this.CriticalRequirementsService.technologyCondition.filter
     (array => array.wt === true)
    }
  //  console.log('condiciones de operaciones despues del friltro', this.CriticalRequirementsService.operationCondition )
  }
    
 //buscamos usuarios de la lista de usuarios
 findUsers(){
  this.authService.getUsers().subscribe
  (res => {
    this.authService.users = res as User[];
   //  console.log(this.authService.users)
    this.departmentService.getDepartments().subscribe 
    (res=> {
      this.departmentService.departments = res as Departments[];
     //  console.log('departments', this.departmentService.departments);
    });
  });
 }






    //----------------------------
  //INICIO DE FUNCIONES DE FOTOS 
  //----------------------------
//buscamos todas las preguntas 
questions(){
  // console.log('questions1')
  this.jpactivityService.getQuestions('2')
  .subscribe(res => {
    this.jpactivityService.Questions = res as JpQuestions[];
   //  console.log('questions',this.jpactivityService.Questions);
  });
  this.findPhotos();
}

findPhotos(){
  var managementId = this.route.snapshot.params["id"];
  this.jpactivityService.findPhoto(managementId,'2')
  .subscribe(res => {
    this.jpactivityService.Jpactivitys = res as Jpactivity[];
  
  });
}

selectQuestion (form?:NgForm, event?: htmlInputEvent): void
{
  if (event.target.files && event.target.files[0])
  {
    const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
    this.file = <File>event.target.files[0]; 
    this.jpactivityService.putJpactivityWPhoto(form.value.question,this.file,managementId,'2')
    .subscribe(res => { 
     // console.log(res);


      this.jpactivityService.findPhoto(managementId, '2')
      .subscribe(res => {
        this.jpactivityService.Jpactivitys = res as Jpactivity[];
        // console.log('this.jpactivityService.Jpactivitys');
//console.log(this.jpactivityService.Jpactivitys);
      });
    },error => {
    //  console.log(error);
      if (error.status == 501){
        this.error = error.error;
     //   console.log(this.error);
        M.toast({
          html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Formato no soportado </b>  </z>',
          classes: 'rounded'
          });
      }
      if (error.status ==  500){
        this.error = error.error;
//console.log(this.error);
        M.toast({
          html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Archivo supera 7mb </b>  </z>',
          classes: 'rounded'
          });
        }
      });
  }
}

  
  //----------------------------
  //FIN DE FUNCIONES DE FOTOS 
  //----------------------------
   


  
  //----------------------------
  //FIN DE FUNCIONES DE NOTIFICACIONES 
  //----------------------------
   
  tnotification(notificationForm:NgForm)
  {
//console.log('Notification Form');
  //  console.log(notificationForm.value);
    const userId = notificationForm.value.userId; 
    // const form = notificationForm.value.question;
    // console.log(userId);
    //buscamos toda la data del usuario seleccionado
     this.authService.findbyId(userId).subscribe
     (res=> {
      var selectedUser = res as User; 
//console.log('selectedUser Name:', selectedUser);

      //si fue seleccionado enviar notificacion por Email: 
    if (notificationForm.value.emailNotification == true){ 
      this.maildata = ({
        'to':selectedUser.email,
        'toName':selectedUser.firstName,
        'from':localStorage.getItem("NAME"),
        'type':'accion',
        'module': 'E-Services',
        'subject':' Ha sido asignado para una actividad de E-Services',
        'description': notificationForm.value.description,
    }); 
    
      this.emailsService.postMail(this.maildata).subscribe
      (res =>{
//console.log(res);         
      });
    }
    //------------------------------------------
    //Creamos la notificacion de la aplicacion 
    //-------------------------------------------
    const managementId = this.route.snapshot.params["id"];
    if (managementId){
     // console.log('si existe')
      this.notificationData = ({
        'creator': localStorage.getItem("NAME"), 
        'creatorId':localStorage.getItem("ID"),
        'responsable': selectedUser.firstName, 
        'responsableId': selectedUser.id,
        'form': notificationForm.value.question,//pregunta seleccionada del select
        'title': 'E-services - Actividad', 
        'longTitle':'Ha sido asignado para una actividad de E-Services;',
         'color':'yellow accent-4',
        'description':notificationForm.value.description, 
        'read':0, 
        'action':  `./eservices-management/details-management/${managementId}`, 
        'managementId': managementId
        // 'modified':string,
      });
      this.NotificationsService.createNotification(this.notificationData).subscribe
      (res => {
//console.log(res);
        this.getNotificationsByCreatorId()
        // const url = (`./eservices-management/start-management/1/${managementId}`);
        // location.assign(url); 
      })

    }else{
     // console.log('no existe')
      this.jpactivityService.postJpactivity()
      .subscribe(res => {  
           const managementId = res;
         //  console.log('ahora si', managementId); 
           this.notificationData = ({
            'creator': localStorage.getItem("NAME"), 
            'creatorId':localStorage.getItem("ID"),
            'responsable': selectedUser.firstName, 
            'responsableId': selectedUser.id,
            'form': notificationForm.value.question,//pregunta seleccionada del select
            'title': 'E-services - Actividad', 
            'longTitle':'Ha sido asignado para una actividad de E-Services;',
             'color':'yellow accent-4',
            'description':notificationForm.value.description, 
            'read':0, 
            'action':  `./eservices-management/details-management/${managementId}` ,
            'managementId': managementId
            // 'modified':string,
          });
        
          this.NotificationsService.createNotification(this.notificationData).subscribe
          (res => {
            // console.log(res);
            const url = (`./eservices-management/start-management/1/${managementId}`);
            location.assign(url); 
          })
      });
    }   
    });
  }



  getNotificationsByCreatorId(){
    const managementId = this.route.snapshot.params["id"];
    const creatorId = localStorage.getItem("ID")
    this.NotificationsService.getNotificationsByCreatorId(creatorId,managementId).subscribe
      (res => {
        // console.log('Notificaciones asignadas', res);
        this.NotificationsService.NotificationsCreated = res as Notification[];
        //console.log('Notificaciones asignadas', this.NotificationsService.NotificationsCreated);
      });
  }

  

  findServiceLine(){
    this.departmentService.getDepartments()
    .subscribe(res => {
      this.departmentService.departments = res as Departments[];
    });
  }

  //----------------------------
  //FIN DE FUNCIONES DE NOTIFICACIONES 
  //----------------------------
   






  }

