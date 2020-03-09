import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { PhotoService }from'src/app/services/photo/photo.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service'
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

export interface photo{}
interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-super-float-button',
  templateUrl: './super-float-button.component.html',
  styleUrls: ['./super-float-button.component.css']
})
export class SuperFloatButtonComponent implements OnInit {
  public showAddPhoto= 0;
  public showImgs = 0;
  file: File; //archivo tipo file que viene de HTML 
  public photos; 1
  public showEditIcon: 0; 
  public managementId;
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

    public routeCase; 
    public maildata:({ 
      'to' : string,//email de quien recibe
      'toName':string, //nombre de quien recibe
      'from': string, //nombre de quien envia 
       'type': string, 
       'module': string, //modulo de donde se emite el mensaje 
       'subject': string, //titulo del correo 
       'description': string, //descripcion de la actividad asignada 
       
    });
    public Troute;
    public permisology;
    public photoitem;
    public createdNotifications; 
  constructor(
    public router:Router,
    public route: ActivatedRoute,
    public PhotoService: PhotoService, 
    public UserService:UserService,
    public NotificationsService:NotificationsService 

  ) { }

  ngOnInit() {  
    this.routerAnalisis()
    //en algunos componentes de eservices el management id esta en la ruta como id y en otros como managementid 
    // para solventar hemos desarrollado esta funcion que interpreta los dos casos en la misma variable 
    //sin cambiar el codigo de los componentes padres 
    const managementId = this.route.snapshot.params["id"]; 
    if (managementId == undefined){
      this.managementId = this.route.snapshot.params["managementId"];
    }else{ 
      this.managementId = managementId
    }

  //  console.log( this.managementId)
    this.findPhotos( this.managementId)
    this.findUsers()
 //   this.findPreviousNotifications();]=
  this.routeAnalytics()
  }


  editConsult(){
    if (  this.Troute == 'eservices-management/start/1'
     || this.Troute == 'eservices-management/start/1/:edit'
     || this.Troute == 'eservices-management/start/1/:id' 
     || this.Troute == 'eservices-management/start/1/:id/:edit' ) {
   //   console.log('star management comercial', this.permisology)
      if (this.permisology.kom.edit == true){
       // var n = this.route.snapshot.params["n"];
      // console.log('managmenteeeeee' , this.managementId)
       if (this.managementId == undefined){
        var url = ('./eservices-management/start/1/2');//enviamos a editar 
        location.assign(url)
       }else{ 
        var url = ('./eservices-management/start/1/' + this.managementId + '/2');//enviamos a editar 
        location.assign(url)
       }
     
            
      }else{ 
        alert('no tiene permisos para editar este componente')
      //  console.log('no tiene permisos para editar este componente')
      }
    }

    if (this.Troute == 'eservices-management/start/2/:id/:edit'
  
    || this.Troute == 'eservices-management/start/2/:id/') {
    //  console.log('star management comercial', this.permisology)
      if (this.permisology.kom.edit == true){
       // var n = this.route.snapshot.params["n"];
        var url = ('./eservices-management/start/2/' + this.managementId + '/2');//enviamos a editar 
        location.assign(url)
            
      }else{ 
        alert('no tiene permisos para editar este componente')
   //     console.log('no tiene permisos para editar este componente')
      }
    }

    //| this.Troute == 'eservices-management/start/2/:id/:edit'|| this.Troute == 'eservices-management/start/2/:id/'

    if (this.Troute == 'eservices-management/workpreparation' || this.Troute == 'eservices-management/workpreparation/:n/:id' || this.Troute == 'eservices-management/workpreparation/:n/:id/:sl/:edit' || this.Troute == 'eservices-management/workpreparation/:n/:id/:edit')
    {
   //   console.log('Work Preparation', this.permisology)

      if(this.permisology.WorkPreparation.edit == true){

        var url = ('./eservices-management/workpreparation/1/'+ this.managementId + '/0');//enviamos a editar
        location.assign(url)
       // this.routeCase = 2; 
      //  this.photoitem ='WP';
       
      }else{ 
        alert('no tiene permisos para editar este componente')
   //     console.log('no tiene permisos para editar este componente')
      }

   
   }

  // console.log(this.Troute)
   if (this.Troute == 'eservices-management/IRO/:sl/:id' || this.Troute == 'eservices-management/IRO/:sl/:id/:aprobator' ){
  // console.log('IRO! ')
   //this.routeCase = 3; 
   if ( this.permisology.IRO.edit == true){
     var url = ('./eservices-management/IRO/CT/'+ this.managementId + '/0');//enviamos a editar
     location.assign(url) 
   }else{ 
     alert('no tiene permisos para editar este componente')
   //  console.log('no tiene permisos para editar este componente')
   }

   }


   if (this.Troute == 'eservices-management/JobBrief/:managementId' || this.Troute == 'eservices-management/JobBrief/:managementId/:viewOrEdit'){
   // console.log('job brief!')
       if( this.permisology.PrejobIndex.edit == true){
        var url = ('./eservices-management/JobBrief/'+ this.managementId + '/1');//enviamos a editar
        location.assign(url)
       }else{
        alert('no tiene permisos para editar este componente')
    //    console.log('no tiene permisos para editar este componente')
       }
   }


   if (this.Troute == 'eservices-management/closingPhase/:managementId' || this.Troute == 'eservices-management/closingPhase/:managementId/:viewOrEdit' ){

    if(this.permisology.closing.edit == true){
     // console.log('editor sin permisos')
      var url = ('./eservices-management/closingPhase/'+ this.managementId + '/0');//enviamos a editar
      location.assign(url)
    }else{
      alert('no tiene permisos para editar este componente')
     // console.log('no tiene permisos para editar este componente')
    }

   }


   if (this.Troute == 'eservices-management/lections/:managementId' || this.Troute == 'eservices-management/lections/:managementId/:viewOrEdit' ){
     if(this.permisology.lections.edit == true ){
      var url = ('./eservices-management/lections/'+ this.managementId + '/0');//enviamos a editar
      location.assign(url)  
     }else{ 
      alert('no tiene permisos para editar este componente')
    //  console.log('no tiene permisos para editar este componente')
     }
  
   }

  }


  routeAnalytics() {
  if (this.routeCase == 0){
    const n = this.route.snapshot.params["n"];
    var route = 'eservices-management/start/1/:id';
    var action = 'eservices-management/start/1/' + this.managementId;
    this.findPreviousNotifications(route)
  }


  if (this.routeCase == 1){
    var route = 'eservices-management/JobBrief/:managementId';
    var action = 'eservices-management/JobBrief/' + this.managementId;
    this.findPreviousNotifications(route)
  }

  
  if (this.routeCase == 2){
    var route = 'eservices-management/workpreparation/:n/:id';
    var action = 'eservices-management/workpreparation/1/' + this.managementId;
    this.findPreviousNotifications(route)
  }


  if (this.routeCase == 3){
    var route = 'eservices-management/IRO/CT/:id';
    var action = 'eservices-management/workpreparation/1/' + this.managementId;
    this.findPreviousNotifications(route)
  }


  if (this.routeCase == 4){
    var route = 'eservices-management/closingPhase/:managementId/:viewOrEdit';
    var action = 'eservices-management/closingPhase/' + this.managementId +'/0';
    this.findPreviousNotifications(route)
  }


  if (this.routeCase == 5){
    var route = 'eservices-management/lections/:managementId/:viewOrEdit';
    var action = 'eservices-management/lections/' + this.managementId +'/0';
    this.findPreviousNotifications(route)
  }


}

  findUsers(){
    this.UserService.getProfiles().subscribe
    (res=>{
      this.UserService.Profiles =  res as any;
     // console.log(this.UserService.Profiles) 
    })
  }

  fileUpload(event?: htmlInputEvent, form?:NgForm): void{

    console.log(form.value);
   
  

    if (event.target.files && event.target.files[0])
    {

      
    console.log(event.target.files[0]);
 
      if( this.managementId)
      {
        this.file = <File>event.target.files[0]; 

        // cambiar el array segun la ruta 
        var array = ({
          'idAutor' : localStorage.getItem("ID"),
          'autor': localStorage.getItem("FIRSTNAME") + ' ' +   localStorage.getItem("LASTNAME"),
          'managementId' : this.managementId, 
          'item'  : this.photoitem, //
          'observation': form.value.observation
        })
        this.PhotoService.postPhotoOrDocument(this.file, array).subscribe
        (res=>{
          console.log(res)
          this.findPhotos( this.managementId);
        
        })
      }
    }
  }

  showAddPhotof(n){
  this.showAddPhoto=n;
  }


  imgAndNot(n){
   
  
      this.showImgs=n;


  }

  findPreviousNotifications(route){

   console.log('buscando notificaciones previas')
    var array = ({
      form: route,
      managementId: this.managementId
    })

//console.log('buscando notificaciones previas', array)

    this.NotificationsService.findActionsNot(array).subscribe(
      res=>{
   
      this.createdNotifications = res as any;
      console.log(this.createdNotifications);
      }
    )
  }


  createNotificationb(form:NgForm){
  //  console.log(form.value) 

    
    this.UserService.getProfileById(form.value.responsableId).subscribe
    (res=>{
    //  console.log('perfil del responsable', res)
      var profile = res as any;
          
      
      if (this.routeCase == 0){
      //  const n = this.route.snapshot.params["n"];
        var route = 'eservices-management/start/1/:id';
        var action = 'eservices-management/start/1/' + this.managementId;
        this.findPreviousNotifications(route)
      }


      if (this.routeCase == 1){
        var route = 'eservices-management/JobBrief/:managementId';
        var action = 'eservices-management/JobBrief/' + this.managementId;
        this.findPreviousNotifications(route)
      }

      
      if (this.routeCase == 2){
        var route = 'eservices-management/workpreparation/:n/:id';
        var action = 'eservices-management/workpreparation/1/' + this.managementId;
        this.findPreviousNotifications(route)
      }


      if (this.routeCase == 3){
        var route = 'eservices-management/IRO/CT/:id';
        var action = 'eservices-management/workpreparation/1/' + this.managementId;
        this.findPreviousNotifications(route)
      }


      if (this.routeCase == 4){
        var route = 'eservices-management/closingPhase/:managementId/:viewOrEdit';
        var action = 'eservices-management/closingPhase/' + this.managementId +'/0';
        this.findPreviousNotifications(route)
      }


      if (this.routeCase == 5){
        var route = 'eservices-management/lections/:managementId/:viewOrEdit';
        var action = 'eservices-management/lections/' + this.managementId +'/0';
        this.findPreviousNotifications(route)
      }



    this.notificationData = ({
      'creator': localStorage.getItem("FISTNAME") , 
      'creatorId': localStorage.getItem("ID"),
      'responsable': profile.firstName + ' ' + profile.lastName, 
      'responsableId': profile.authId,
      'title': 'E-services - Notificaccion o Accion asignada ',
      'longTitle':form.value.Notification,
      'color':'yellow accent-4',  
      'description':'esrvices-notification',
      'form': route,
      'read': 0,
      'action':  action,
      'managementId': this.managementId,
    });



      this.NotificationsService.createNotification(this.notificationData).subscribe
      (res=>{
       //console.log(res);
        M.toast({html: 'Enviado'})  
        this.findPreviousNotifications(route)
      })
    });
  }

  //    var id = (form.value._id); 
 //  var url = (`./eservices-management/start-management/2/${id}`);
  // location.assign(url);


  routerAnalisis(){
    this.Troute   = this.route.snapshot.routeConfig.path; 
 //   console.log('la ruta es', this.Troute)
    if ( this.Troute == 'eservices-management/start/1'
    || this.Troute == 'eservices-management/start/1/:id' 
    || this.Troute == 'eservices-management/start/1/:edit'
    ||  this.Troute == 'eservices-management/start/2/:id' 
    || this.Troute == 'eservices-management/start/1/:id/:edit' 
    || this.Troute == 'eservices-management/start/2/:id/:edit'  ) {
     console.log('star management comercial')
     this.routeCase = 0; 
     this.photoitem ='starmanagement';
    }

    if (this.Troute == 'eservices-management/JobBrief/:managementId' || this.Troute == 'eservices-management/JobBrief/:managementId/:viewOrEdit'){
       console.log('job brief!')
       this.routeCase = 1; 
       this.photoitem ='jbrief';
      
    }
    if (this.Troute == 'eservices-management/workpreparation' || this.Troute == 'eservices-management/workpreparation/:n/:id' || this.Troute == 'eservices-management/workpreparation/:n/:id/:sl/:edit' || this.Troute == 'eservices-management/workpreparation/:n/:id/:edit'){
      console.log('Work Preparation')
      this.routeCase = 2; 
      this.photoitem ='WP';
     
   }


   if (this.Troute == 'eservices-management/IRO/CT/:id' || this.Troute == 'eservices-management/IRO/CT/:id/:aprobator' ){
    console.log('IRO! ')
    this.routeCase = 3; 

    this.photoitem ='IRO';

 }

 
 if (this.Troute == 'eservices-management/closingPhase/:managementId' || this.Troute == 'eservices-management/closingPhase/:managementId/:viewOrEdit' ){
  console.log(' closing phase! ')
  this.routeCase = 4; 
  this.photoitem ='closing';

}

 
if (this.Troute == 'eservices-management/lections/:managementId' || this.Troute == 'eservices-management/lections/:managementId/:viewOrEdit' ){
  console.log(' lections phase! ')
  this.routeCase = 5; 
  this.photoitem ='lections';

}




    var id = localStorage.getItem("ID")
       this.UserService.getProfileByAuthId(id).subscribe
       (res=>{
      //   console.log(res)
         this.permisology = res[0].permisology.eservices; 
         

         var viewOREdit =  this.route.snapshot.params["viewOrEdit"];
     //    console.log(viewOREdit)
         //redireccionamiento por permisologia 
         //job brieff 
         if (viewOREdit){
           if (this.routeCase == 1){
            if (viewOREdit == '2' && this.permisology.PrejobIndex.observe == false){ //ver
              console.log('observador sin permisos')
              window.history.back();

              }else if (viewOREdit == '0'  && this.permisology.PrejobIndex.aprobador == true){ //editar
              console.log('usuario con permisos para editar');  


            }else if (viewOREdit == '0'  && this.permisology.PrejobIndex.aprobador == false){ //editar
              console.log('editor sin permisos')
              var url = ('./eservices-management/JobBrief/'+ this.managementId + '/2');//enviamos a ver
              location.assign(url)
            
            
          }else if (viewOREdit == '1' && this.permisology.PrejobIndex.aprobation == true){//aprobar

              console.log('permiso de aprobabar')
       

            }else if (viewOREdit == '1' && this.permisology.PrejobIndex.aprobation == false){//aprobador
                console.log('aprobador sin permisos')
                var url = ('./eservices-management/JobBrief/'+ this.managementId + '/0'); //lo enviamos a editar 
                location.assign(url)
            }



           }
    

          }

          //work preparation 
          var viewOREditw = this.route.snapshot.params["edit"] 
          if (viewOREditw){
           console.log('si existe modo view or edit en wp', viewOREditw)
           if (viewOREditw == '1' && this.permisology.WorkPreparation.observe == false){ //ver
            console.log('observador sin permisos')
            window.history.back();
          }else if (viewOREditw == 1 && this.permisology.workpreparation.observe == true )
          {
            console.log('observador con permisos')
          }

      else if(viewOREditw == '0' && this.permisology.workpreparation.create == false )
           {      
          console.log('editor sin permisos')
           var url = ('./eservices-management/workpreparation/1/'+ this.managementId + '/1');//enviamos a ver
           location.assign(url) 
             }
              
          }
         

          //iro
          var viewOREditi =  this.route.snapshot.params["aprobator"] 
         if (viewOREditi){
         
          if (viewOREditi == '0.1' && this.permisology.IRO.observe == false){ //ver
            console.log('observador sin permisos')
            window.history.back();
         }
         if (viewOREditi == '0' && this.permisology.IRO.edit == false){ //ver
          console.log('editor sin permisos')
          var url = ('./eservices-management/IRO/CT/'+ this.managementId + '/0.1');//enviamos a ver
        location.assign(url) 
       }
       if (viewOREditi == '1' && this.permisology.IRO.aprobation == false){ //aprobar
        console.log('aprobador sin permisos')
        var url = ('./eservices-management/IRO/CT/'+ this.managementId + '/0');//enviamos a editar
        location.assign(url) 
     }
        }


        //closin y lections
        var viewOrEdit =  this.route.snapshot.params["viewOrEdit"] 
        if (viewOrEdit){
          if (this.routeCase == 4){ //closing
            console.log('closing phase', viewOrEdit )
              if(viewOREdit == '1' && this.permisology.closing.observe == false  ){
                console.log('observador sin permisos')
                window.history.back();
              }
              if(viewOREdit == '0' && this.permisology.closing.edit == false  ){
                console.log('editor sin permisos')
                var url = ('./eservices-management/closingPhase/'+ this.managementId + '/1');//enviamos a ver
              location.assign(url)  
              }
                 if(viewOREdit == '0' && this.permisology.closing.edit == true  ){
                console.log('editor con permisos')
          
              }
                if(viewOREdit == '1' && this.permisology.closing.observe == true  ){
                console.log('observador con permisos')
          
              }





          }else if (this.routeCase == 5){ //lections
            console.log('lections phase', viewOrEdit )
            if(viewOREdit == '1' && this.permisology.lections.observe == false  ){
              console.log('observador sin permisos')
              window.history.back();

            }else if (viewOREdit == '1' && this.permisology.lections.observe == true  ){
              console.log('observador con permisos')
            }
            if(viewOREdit == '0' && this.permisology.lections.edit == false  ){
              console.log('editor sin permisos')
              var url = ('./eservices-management/lections/'+ this.managementId + '/1');//enviamos a ver
              location.assign(url)  
            }
            if(viewOREdit == '0' && this.permisology.lections.edit == true  ){
              console.log('editor con permisos')
            }

          }


        }


        //lections
      
      
      })
        
      
  }

  consultPermisology(){


  }

  


  //buscamos las fotos relacionadas con el usuario LOGEADO 
  findPhotos(managementId){
         //console.log(managementId);
      
        var array = ({
          managementId : managementId, 
          item: this.photoitem, 
     //     userId:  localStorage.getItem("ID"),
        })

        this.PhotoService.getPhotoByClosingPhase(array).subscribe
        (res=> {
       //   console.log(res);
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


   deletePhoto(id){
     
   }


}
