import { Component, OnInit } from '@angular/core';
import  { JpactivityService } from '../../../services/jpactivity/jpactivity.service'  //update
import { Jpactivity } from '../../../models/jpactivity/jpactivity';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Photo} from '../../../models/photos/photos';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from 'src/app/models/auth/user';
import { EmailsService } from 'src/app/services/emails/emails.service';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';
import { DeparmentsService } from '../../../services/config-master/deparments/deparments.service';
import { Departments } from '../../../models/config-master/deparments/deparments';
import { ClientesService }from 'src/app/services/config-master/clientes/clientes.service'
import { Clientes } from 'src/app/models/config-master/clientes/clientes';
import{LocationsService } from 'src/app/services/config-master/locations/locations.service';
import{Locations} from 'src/app/models/config-master/locations/locations';
import { JpQuestions } from 'src/app/models/jpactivity/jpQuestions';
import { Notification } from 'src/app/models/notification/notification';


//locaciones 
import {Countrys } from 'src/app/models/config-master/locations/countrys';

import { Districts } from 'src/app/models/config-master/locations/districts';
import { Camps } from 'src/app/models/config-master/locations/camps';
import { Closters } from 'src/app/models/config-master/locations/closters';
import { Wells } from 'src/app/models/config-master/locations/wells';
import { ManagementStatus } from 'src/app/models/config-master/eservicesManagementStatus/managementStatus';

import { MaterialModule } from 'src/app/materialconfig';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UserService } from 'src/app/services/users/user.service'
 
var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

export interface photo{}
interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  providers: [MatDatepickerModule, JpactivityService, AuthService, EmailsService, NotificationsService, ClientesService, DeparmentsService, LocationsService]
})
export class DescriptionComponent implements OnInit {
  public showAprobation:boolean = false; 
  public NewClientCheck:number=0;
  public progressBar:number=10; 
  public ServiceLineMode:number= 1;//modo del Switch del modal de linea de servicio   
  public clienteMode:number = 1; //modo del Switch del modal de clientes 
  public tab:number = 0; //hitos
  public tab2:number = 1 ; //numero de pozos
  public n:number=2; 
  public id:string; 
  managementId:string; 
  public selectedUser: string; 
  public name: string; 
  public _id: string; 
  public error: string; 
  public flag: number=0; 
  public creatorUserId: string; 
  // photos: string = []; 
  file: File; //archivo tipo file que viene de HTML 
  item:string; //item en donde se subio la imagen
  form:string; //formulario donde se subio la imagen
  public separator: number=0; //separador de HTML a TS, para saber en cual item se hizo click 
  photoSelected: string | ArrayBuffer; 
  public photos: string[];
  nn: number; 
  public selectedId:string; 
  public showCloster:number=0; 
  public data: string[];
  public fecha1:string; 
  public fecha2:string; 
  public cnt: string[]; 
  public rol:string|number; 
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
public showNext:boolean; 
public showNext2:boolean; 
maildata2:string[]; 
//  public jQuery:any; 
// public $:any; 
//  public Materialize: any; 
//  public M: any; 
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
    public UserService:UserService, 
    ) { }

  ngOnInit() {
      this.consultPermisology();
      this.consultIfEdit(); 
      this.findLocationsSelects();
      this.questions();
      this.materializecss();
      this.findUsers();
      this.findClients();
      this.findServiceLine(); 
      this.findStatus(); 
      const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
    // this.initialConfig();
    if (managementId){
      this.showNext2 = true; 
      this.getNotificationsByCreatorId();//traemos las notificaciones asignadas por el usuario logueado
      this.findPhotos(managementId);
      this.captureEnrutedId();
    }else{
      this.captureEnrutedId();
    }
  //  this.comercialVerification();
  }


  consultPermisology(){
    var userId = localStorage.getItem("ID");
    this.UserService.getProfileByAuthId(userId).subscribe
    (res=>{
      var department = res[0].department
      var permisology = res[0].permisology.eservices.kom;
      if (permisology.aprobation == true){
        this.showAprobation = true;
      }else {
        this.showAprobation = false; 
      }
      
      if (department == 'Comercial'){
        this.viewOrEdit = 0; 
      }
      // if( permisology.observe == false){
      //   this.viewOrEdit = 10; 
      //   this.showAprobation = false; 
      //   alert('No Tiene Permisos para Ver esta actividad, contacte al equipo de desarrollo IT para mas informacion 000')
      // }
      //consultamos si esta en un  edit si la persona es de comercial o tiene permisos de edit entonces show vieworedit 0 
      if(this.viewOrEdit == 0 ){ //viene de la ruta de editar
       if(department == 'Comercial'){
        this.viewOrEdit = 0;
       }else{ 
         // si no es de comercial debemos validar que tenga todos los permisos 
          if (permisology.edit == true){
            this.viewOrEdit = 0;
          }else{ //si  no tiene permiso de editar consultamos si tiene permiso de ver al menos 
            if(permisology.observe == true){
              this.viewOrEdit = 1;
            }else{ 
              alert('No Tiene Permisos para Ver esta actividad, contacte al equipo de desarrollo IT para mas informacion 001')
              this.viewOrEdit = 10; 
              this.showAprobation = false; 
            }
          }
       }
      }else{  // viene de la ruta de ver 
        if(department == 'Comercial'){ // si es de comercial va a editar directo 
          this.viewOrEdit = 0;
          }else{ //si no es de comercial validadmos que tenga permisos para ver
            console.log(permisology)


            if(permisology.observe == true){
              this.viewOrEdit = 1;
            }else{ //si no tiene permisos para ver y tampoco es de comercial entocnes alerta y ocultar 
              alert('No Tiene Permisos para Ver esta actividad, contacte al equipo de desarrollo IT para mas informacion 002')
              this.viewOrEdit = 10; 
              this.showAprobation = false; 
            }
          }
        }

     console.log(res);
    })
  }

  consultIfEdit(){ 
     this.viewOrEdit = this.route.snapshot.params["edit"]; //capturamos edit enrutado
    if(this.viewOrEdit == 1){
  // console.log('es un view');
    }else { 
      this.viewOrEdit= 0; 
    }
  }


  changueStatus(event){
    //console.log(event.value);
     this.managementId = this.route.snapshot.params["id"];
     this.jpactivityService.changueStatus(event.value,  this.managementId)
     .subscribe(res => {
    //  console.log(res);
      M.toast({
        html: 'Editado estatus de KOM'
       })
     });
  }




// -------------------
// FUNCIONES DE estaods de managemten 
//--------------------
findStatus(){
  this.jpactivityService.getStatus().subscribe
  (res => { 

     this.jpactivityService.selectedManagementStatus = res as any; 
     //console.log('management estatus',    this.jpactivityService.selectedManagementStatus)
  });    
}


// -------------------
// FUNCIONES DE FECHAS 
//--------------------
selectdateInit(date){
//console.log('this fecha 1', date.value)
this.fecha1 = date.value; 
this.consultValid()
}

selectdateEnd(date){
 // console.log('this fecha 2', date.value)
  this.fecha2 = date.value; 
  this.consultValid()
  }
//consultamos que la fecha 2 no sea antes que la fecha 1 
  consultValid(){ 
    if (this.fecha1){
      if(this.fecha2){
        if (this.fecha1 > this.fecha2){
          alert('fecha invalida')
          this.fecha2 = '0';
        }
      }
    }
  }

// -------------------
// FIN FUNCIONES DE FECHAS 
//--------------------




  //capturamos el ID enrutado y buscamos el management en backend con ese Id
  captureEnrutedId(){

    const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
    //this.getTicket(ticket_id);
    if(managementId==null)
    {
      // console.log('empty')
    }else{
      // console.log('no empty')
      this.flag=1; //activamos banderin para marcar que se trajo un id
      this.getManagement(managementId);
    }
  }


  //----------------------------
  //  configuracion inical 
  //----------------------------
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
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      //var instances = M.FormSelect.init(elems, options);
    });
    //FUNCTION DE MODALES 
    $(document).ready(function(){
      $('.modalAddLocation').modal();
     // console.log('modal')
    });
   // console.log('modal')

}
 //buscamos usuarios de la lista de usuarios
  findUsers(){
   this.UserService.getProfiles().subscribe
   (res => {
     this.UserService.Profiles = res as any[];
    //  console.log(this.authService.users)
     this.departmentService.getDepartments().subscribe 
     (res=> {
       this.departmentService.departments = res as any[];
      //  console.log('departments', this.departmentService.departments);
     });
   });
  }



  capturemodal(Event:Event|string){
  if (this.showCloster == 1) {

    this.showCloster=0; 
  }else{
    this.showCloster=1; 
  }


  }

 //-------------------------------------
  // INICIO CLIENTES
  //-------------------------------------
  findClients(){    
    this.clientesService.getClientes().subscribe
    (res => {
      this.clientesService.clientes = res as any[];
      // console.log('lista de clientes', this.clientesService.clientes)
    })
  }
  addClient (form: NgForm){
    // console.log('formulario',form.value);
    this.clientesService.postCliente(form.value)
    .subscribe(res => {
      // console.log('respuesta',res);
      M.toast({ html: 'Cliente agregado'});
      this.findClients();
      this.resetForm();
    });
  }
  resetForm(form?: NgForm) {
    if(form){
      form.reset();
  //    this.clientesService.selectedCliente = new Clientes();
    }
  }
  deleCliente(id){
    if (confirm('¿Está seguro que desea Eliminar éste cliente?')) {
      this.clientesService.deleteCliente(id)
      .subscribe(res=>{
        this.findClients();
      })
    }else {
      this.findClients();
    }
  }
  editClientesMode(id?){
    this.clienteMode=2; 
  }
  undoEditMode(){
    if (confirm('¿Volver a Lista de clientes?')) {
      this.clienteMode=1; 
  }else{
    this.clienteMode=2; 
  }
}
editClient(form?: NgForm){
// console.log('save client', form.value);
this.clientesService.putCliente(form.value)
.subscribe(res => {
  M.toast({
          html: 'Cambios Realizados'
         })
        //console.log(res);
    });
  } 

   //-------------------------------------
  // FIN CLIENTES
  //-------------------------------------





   //-------------------------------------
  // INICIO DE LINEA DE SERVICIO
  //-------------------------------------
  addServiceLine(form?: NgForm){
    // console.log('formulario', form.value)
    this.departmentService.postDepartment(form.value)
    .subscribe(res => {
      // console.log('respuesta',res)
      M.toast({
        html: 'Agregado correctamente!'
        })
        this.findServiceLine();
    });
  }


  findServiceLine(){
    this.departmentService.getDepartments()
    .subscribe(res => {
      this.departmentService.departments = res as any[];
    });
  }
  undoEditServiceLineMode(){
    this.ServiceLineMode=1; 
  }
  editServiceLineMode(id?){
    this.ServiceLineMode=2; 
  }
  
  editServiceLine(form?: NgForm){
    if(confirm('Esta seguro que desea Editar este curso?')){
      if(form.value._id) { //si tiene un ID 
        this.departmentService.putDepartment(form.value)
          .subscribe(res => {
           // console.log(res);
            M.toast({
              html: 'Cambios realizados correctamente!'
              })
          });
      } else {
        this.departmentService.postDepartment(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Se guardo satisfactoriamente'});
        });
      }
    }
  }

   //Delete
   deleteServiceLine(_id){
    if(confirm('¿Esta seguro que desea Eliminar este registro?')){
      this.departmentService.deleteDepartment(_id)
      .subscribe(res => {
        this.findServiceLine();
      });
    }
  }  
   //-------------------------------------
  // FIN LINEA DE SERVICIO
  //-------------------------------------


 //-------------------------------------
  // INICIO LOCACIONES
  //-------------------------------------
  findLocationsSelects(){
    //console.log('locationsSelect')
    this.locationsService.getCountrys()
    .subscribe(res=>{
     this.locationsService.country = res as any[];
    });
    
    this.locationsService.getDistricts()
    .subscribe(res=>{
     this.locationsService.district = res as any[];
    });

    this.locationsService.getCamps()
    .subscribe(res=>{
     this.locationsService.camp = res as any[];
    }); 

    this.locationsService.getClosters()
    .subscribe(res=>{
     this.locationsService.closter = res as any[];
    });  

    this.locationsService.getWells()
    .subscribe(res=>{
     this.locationsService.well = res as any[];
    });
  }



  getNotificationsByCreatorId(){
    const managementId = this.route.snapshot.params["id"];
    const creatorId = localStorage.getItem("ID")
    this.NotificationsService.getNotificationsByCreatorId(creatorId,managementId).subscribe
      (res => {
        // console.log('Notificaciones asignadas', res);
        this.NotificationsService.NotificationsCreated = res as Notification[];
      //  console.log('Notificaciones asignadas', this.NotificationsService.NotificationsCreated);
      });
  }


  tnotification(notificationForm:NgForm)
  {
//console.log('Notification Form');
//console.log(notificationForm.value);
    const userId = notificationForm.value.userId; 
    // const form = notificationForm.value.question;
    // console.log(userId);
    //buscamos toda la data del usuario seleccionado
     this.authService.findbyId(userId).subscribe
     (res=> {
      var selectedUser = res as User; 
      console.log('selectedUser Name:', selectedUser);

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
     //    console.log(res);         
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
       // console.log(res);
        this.getNotificationsByCreatorId()
        // const url = (`./eservices-management/start-management/1/${managementId}`);
        // location.assign(url); 
      })

    }else{
   //   console.log('no existe')
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
            const url = (`./eservices-management/start/1/${managementId}`);
            location.assign(url); 
          })
      });
    }   
    });
  }
  //-------------------------------------
  //FIN DE FUNCIONES DE NOTIFICACIONES
  //-------------------------------------





  //----------------------------
  //INICIO DE FUNCIONES DE FOTOS 
  //----------------------------
//buscamos todas las preguntas 
questions(){
  // console.log('questions1')
  this.jpactivityService.getQuestions('1')
  .subscribe(res => {
    this.jpactivityService.Questions = res as JpQuestions[];
    // console.log('questions',this.jpactivityService.Questions);
  });
}

//formulario de select pregunta mas imagen
selectQuestion (form?:NgForm, event?: htmlInputEvent): void
{
 // console.log('formulario con foto', form.value)
      //si hay una imagen 
    if (event.target.files && event.target.files[0])
    {
    const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
    if(managementId)
      { //si hay management ID 
        //console.log('*******si hay management id')
        this.file = <File>event.target.files[0]; 
        // console.log('thisFile', this.file);
        this.jpactivityService.putJpactivityWPhoto(form.value.question,this.file,managementId,'1')
        .subscribe(res => { 
         // console.log(res);
          //falta buscar la foto
          this.jpactivityService.findPhoto(managementId,'1')
          .subscribe(res => {
            this.jpactivityService.Jpactivitys = res as Jpactivity[];
            // console.log('this.jpactivityService.Jpactivitys');
       //     console.log(this.jpactivityService.Jpactivitys);
          });
        },error => {
        //  console.log(error);
          if (error.status == 501){
            this.error = error.error;
          //  console.log(this.error);
            M.toast({
              html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Formato no soportado </b>  </z>',
              classes: 'rounded'
              });
          }
          if (error.status ==  500){
            this.error = error.error;
       //     console.log(this.error);
            M.toast({
              html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Archivo supera 7mb </b>  </z>',
              classes: 'rounded'
              });
          }
      }
        
        
        );
//  ----------------------
// si no tiene un MangaementID enrutado
// creamos la JpActivity y guardamos la foto con ese managementId 
//  ----------------------
      }else{

        this.jpactivityService.postJpactivity() //crear management Id 
        .subscribe(res => {  

          M.toast({
            html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Orden de trabajo Creada </b>  </z>',
            classes: 'rounded'
            });

          const managementId = res;  
          this.file = <File>event.target.files[0]; 
          this.jpactivityService.putJpactivityWPhoto(form.value.question,this.file,managementId, '1')
          .subscribe(res => {
            M.toast({
              html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Foto Almacenada </b>  </z>',
              classes: 'rounded'
              });
              const url = (`./eservices-management/start/1/${managementId}`);
              location.assign(url);

          },error => {
            if (error.status == 501){
              this.error = error.error;
              // console.log(this.error);
              M.toast({
                html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Formato no soportado </b>  </z>',
                classes: 'rounded'
                });
              }
              if (error.status ==  500){
                this.error = error.error;
               // console.log(this.error);
                M.toast({
                  html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Archivo supera 7mb </b>  </z>',
                  classes: 'rounded'
                  });
              }

          }); 
      });
    }
      }else{ //si no adjuntaron ninguna imagen 
       M.toast({
      html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Debe seleccionar una imagen </b>  </z>',
      classes: 'rounded'
      });
  }

}





  //buscamos las fotos relacionadas con el usuario LOGEADO 
  findPhotos(managementId){
    // console.log(managementId);
    this.jpactivityService.findPhoto(managementId,'1')
    .subscribe(res => {
      this.jpactivityService.Jpactivitys = res as any[];
      //  console.log( this.jpactivityService.Jpactivitys );
    });
  }
  //buscamos si hacemos click en el modal 
  findPhoto(form:string, item:string){
    ///console.log('click');
    const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
   // console.log('managementmanagementId')
  //  console.log(managementId);
    this.jpactivityService.findPhoto(managementId, '1')
    .subscribe(res => {
      this.jpactivityService.Jpactivitys = res as any[];
    //  console.log('this.jpactivityService.Jpactivitys');
     // console.log(this.jpactivityService.Jpactivitys);
    });
  }

  deletePhoto(_id:string)
  {
    // console.log('_id');
    // console.log(_id);
    if(confirm('Esta seguro que desea Eliminar ésta imagen?')){
    this.jpactivityService.deletePhoto(_id)
    .subscribe(res => {
      M.toast({
        html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Foto Eliminada </b>  </z>',
      classes: 'rounded'
       });
    //   console.log(res);
       this.item='1';
       const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
       this.jpactivityService.findPhoto(managementId, '1')
     .subscribe(res => {
       this.jpactivityService.Jpactivitys = res as any[];
       // console.log('this.jpactivityService.Jpactivitys');
   //    console.log(this.jpactivityService.Jpactivitys);
     });
      //  const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
      // //  this.findPhoto();
      //  const url = (`./eservices-management/start-management/1/${managementId}`);
      //  location.assign(url);
    });

  }else {
    M.toast({
      html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Cancelado </b>  </z>',
    classes: 'rounded'
     });
  }
};


//----------------------------
//FIN DE FUNCIONES DE FOTOS
//----------------------------
consultManagementComplete(){

}



  saveManagement(form?: NgForm){
    //console.log('save management form > > >  > >', form.value)
    if (form.value.ct == undefined) {
      form.value.ct = false; 
    }
    if (form.value.wt == undefined) {
      form.value.wt = false; 
    }
    if (form.value.sl == undefined) {
      form.value.sl = false; 
    }
    if (form.value.fi == undefined) {
      form.value.fi = false; 
    }
    if (form.value.wl == undefined) {
      form.value.wl = false; 
    }

   
    //si alguno de los anteriores no existe entonces le forzamos el valor falso 
    if(!form.value.NewClient){
      form.value.NewClient = false; 
      form.value.hrisk= '0'; 
    }else{
      form.value.hrisk= '1'; 
    //  console.log('hrisk')
    }
    if(!form.value.NewDistrict){
      form.value.NewDistrict = false; 
      form.value.hrisk= '0'; 
    }else{ 
      form.value.hrisk= '1'; 
  //    console.log('hrisk')
    }
    if(!form.value.NewCamp){
      form.value.NewCamp = false; 
      form.value.hrisk= '0';  
    }else{
      form.value.hrisk= '1'; 
   //   console.log('hrisk')
    }
    if(!form.value.NewWell){
      form.value.NewWell = false; 
    }else{
      form.value.hrisk= '1'; 
    //  console.log('hrisk')
    }
    


    this.consultManagementComplete(); 


  // console.log(form.value)
    
    var fecha1 = this.fecha1; 
    var fecha2 = this.fecha2;
 
    if (fecha1){
      if(fecha2)
      {
          var dates =  
          {
            'dateInit' : fecha1,
            'dateEnd' : fecha2,
          }
      }else{ 
        var dates =  {
          'dateInit' : fecha1,
          'dateEnd' : '0',
        }
      }

    }else if(fecha2){

      var dates =  {
        'dateInit' : '0',
        'dateEnd' : fecha2,
      }
    }else{ 
   
      var dates =  {
        'dateInit' : '0',
        'dateEnd' : '0',
      }
    }

   const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
   if(managementId){
     this.flag =1; 
   }else{
     this.flag=0; 
   }
    if (form){
 
      console.log('managementId', managementId)
     console.log('form value', form.value)
   //  console.log('dates', dates)
      if(this.flag == 1){ //si llego un ID en NGoninit 
        this.jpactivityService.putJpactivity(form.value, managementId, dates)
        .subscribe(res => {
          M.toast({
             html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Guardado! </b>  </z>',
           classes: 'rounded'
            });
          this.ngOnInit(); 
            // console.log(res);
         });
      }else{
        form.value.status = '2'; 
        this.jpactivityService.postJpactivity(form.value, dates)
        .subscribe(res => {
          M.toast({
            html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b>  Creado! </b>  </z>',
             classes: 'rounded'
            });
            // console.log('respuesta');
            // console.log(res);
            var managementId2 = res;     
            var url = (`./eservices-management/start/1/${managementId2}/0`);
            location.assign(url);
          });
      }; 
    }else{ 
    }
  
   }
  continue(){
    const managementId = this.route.snapshot.params["id"];
    var url = (`./eservices-management/start/2/${managementId}`);
    location.assign(url);
  }
 
  getManagement(managementId:string){
      this.jpactivityService.getJpactivity(managementId).subscribe 
      (res=> {
        this.jpactivityService.selectedJpactivity = res as any;
        this.name = this.jpactivityService.selectedJpactivity.name;
        this._id = this.jpactivityService.selectedJpactivity._id;
        //capturamos si ya trae un newclient 
     //   console.log('management:', this.jpactivityService.selectedJpactivity)
        if (this.jpactivityService.selectedJpactivity.wt === true){
          this.showCloster=1; 
        } else { 
          this.showCloster=0;
        }
        if (this.jpactivityService.selectedJpactivity.phase === '1'){

        this.showNext = true;
        

     //   console.log('showNext', this.showNext)
        }else{
          if (this.showNext == true) {

          }else{
            this.showNext = false;
          }
        }
      });
    }
  

  onManagement(form: NgForm){
     if (this.flag == 1){
        //si recibimos un ID en NgOninit 
       // editamos, no creamos 
   //    console.log('editamos, no guardamos ')
   //    console.log(form.value);
       const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado 
       this.jpactivityService.putJpactivity(form.value,managementId)
       .subscribe(res => {
        M.toast({
          html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Editado! </b>  </z>',
           classes: 'rounded'
          });

          var id = form.value._id;
     //     console.log(res)
          var url = (`./eservices-management/start/2/${id}`);
          location.assign(url);
        })
    }else {
      // si no recibimos ningun id en NgOninit 
      //creamos, no editamos.
  //    console.log('creamos, no editamos')
      this.jpactivityService.postJpactivity(form.value)
      .subscribe(res => {
        
        M.toast({
          html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b>  Creado! </b>  </z>',
           classes: 'rounded'
          });
       //   console.log(res);
       //desde el backend devolvemos el id con el cual se creo la gestion 
          var id = res; 
          //reenviamos ese id a traves de la url, el cual sera recibido en el proximo componente 
          //con el cual vamos no a guardar la siguiente vista, sino a editar, con la funcion getbyid and edit 
          var url = (`./eservices-management/start/2/${id}`);
          location.assign(url);
          
        })
    }
  };

  onManagement2(form: NgForm){

 //   console.log(' contorller -------editando -------------------');

    if (this.flag == 1){ //si recibimos un ID en NgOninit 
     //entonces editamos, no creamos 
    //  console.log('editamos, no guardamos ');
    //  console.log(form.value);
      this.jpactivityService.putJpactivity(form.value)
      .subscribe(res => {
       M.toast({
         html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Editado! </b>  </z>',
          classes: 'rounded'
         });

         var id = form.value._id;
         var url = (`./eservices-management/start-management/3/${id}`);
         location.assign(url);
       })
   }else {
     // si no recibimos ningun id en NgOninit 
     //creamos, no editamos. easy 
   // console.log('creamos, no editamos');
     this.jpactivityService.postJpactivity(form.value)
     .subscribe(res => {
       M.toast({
         html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b>  Creado! </b>  </z>',
          classes: 'rounded'
         });
      //   console.log(res);
      //desde el backend devolvemos el id con el cual se creo la gestion 
         var id = res; 
         //reenviamos ese id a traves de la url, el cual sera recibido en el proximo componente 
         //con el cual vamos no a guardar la siguiente vista, sino a editar, con la funcion getbyid and edit 
         var url = (`./eservices-management/start-management/3/${id}`);
         location.assign(url);
       });
   }
 };
    formSelect(){
      document.addEventListener('DOMContentLoaded', function() {
        // var elems = document.querySelectorAll('select');
        // var instances = M.FormSelect.init(elems, options);
      });
  }
  



  // FUNCIONES DE CLICK, AGREGAR O ELIMINAR FILA DE CRONOGRAMAS Y RISGOS 
  //hitos
  hitoAction(){
  //  console.log('tab', this.tab);
    if (this.tab == 5){
      alert('numero maximo de hitos alcanzados');
      this.tab=5; 
    }else{
     this.tab=this.tab+1; 
    }
  }
  hitoUnaction(){
   // console.log('tab', this.tab);
    if (this.tab == 0){
      // alert('numero minimo de hitos alcanzados');
      this.tab=0; 
    }else{
     this.tab=this.tab-1; 
    }
  }

  //ritos 
  riskAction(){
//console.log('tab2', this.tab2);
    if (this.tab2 == 5){
      alert('numero maximo de riesgos alcanzados');
      this.tab2=5; 
    }else{
     this.tab2=this.tab2+1; 
    }
  }
  riskUnaction(){
  //  console.log('tab2', this.tab2);
    if (this.tab2 == 1){
      // alert('numero minimo de riesgos alcanzados');
      this.tab2=1; 
    }else{
     this.tab2=this.tab2-1; 
    }
  }
}
