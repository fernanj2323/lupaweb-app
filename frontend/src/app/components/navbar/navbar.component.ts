import { Component, OnInit, ɵsetCurrentInjector } from '@angular/core';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Notification } from '../../models/notification/notification';
import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationEnd } from '@angular/router';


declare var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value) {
    console.log('pipetransform', value.slice().reverse())
    return value.slice().reverse();
  }
}
@NgModule({
  declarations: [ReversePipe],
  exports: [ReversePipe],
})
export class NgReversePipeModule {}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NotificationsService]
})



export class NavbarComponent implements OnInit {

  public responsablerId:string; 
  public thisNotification:string; 
  public countNotifications; 
  public count: string;
  public info; 
  public showSpan: number = 0; 
  public res:({
    'count': number, 
    'info': string
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
    // 'created':string, 
    // 'modified':string,
    });
    

  constructor(
    public NotificationsService:NotificationsService,
    public router:Router, 
    public route: ActivatedRoute,
    public authService: AuthService) {

    


     }

    public app_name = "LupaWeb"; 
  
  ngOnInit() {
    this.desplegable();
    this.notifications();

  }
  

//   toggleSidebar() {
//     const dom: any = document.querySelector('body');
//     dom.classList.toggle(this.pushRightClass);
// } 


  //traemos todas las notificacioens del usuario logueado
  notifications(){

   var responsablerId = localStorage.getItem("ID");
 // console.log('navbar responsablerId:',responsablerId);
   this.NotificationsService.getNotifications(responsablerId).subscribe
   (res=> { 

//console.log('navbar response', res);
     this.NotificationsService.Notifications = res as any[]; 
     this.NotificationsService.Notifications =  this.NotificationsService.Notifications.slice().reverse(); 
    this.NotificationsService.countNotifications(responsablerId).subscribe
    (res=>{
      
      this.countNotifications = res;
      if (this.countNotifications == 0){
        // console.log('cero notificaciones');
        this.showSpan = 0; 
      }else{
        // console.log(this.countNotifications);
        this.showSpan = 1; 
      }
    });
  });

}

onLogout(): void{
  //console.log("estas en modo salir");
  this.authService.logout();
}

deleteNotification(_id:string){
  if (confirm('¿Eliminar Notificacion?'))
  {
    // console.log('delete this',_id)
    this.NotificationsService.deleteNotification(_id).subscribe(
      res=> {
     //  console.log(res);
       this.notifications();//cargar notificaciones nuevamente
      })
  }else{
    this.notifications();//cargar notificaciones nuevamente
  }

  }



  detailsNotification(action:string, id:string){
    this.router.navigate([action]);
    this.ngOnInit()
  }
   
  checkNotification(id:string){
    //en esta funcion buscamos traernos toda la informacion de la notificacion
    //para posteriormente editar su estado READ de 0 a 1. 
    // y no redirigimos ni tomamos otra accion. 
     //1>
     //enviamos el id para traernos todos los datos de la notificacion
     this.NotificationsService.getNotificationById(id).subscribe(
      res=> {
        this.info = res[0] as any; 

        if (this.info.color == '') //si el color esta en blanco{
    {
      this.notificationData = ({
        'creator': this.info.creator,
        'creatorId':this.info.creatorId,
        'responsable': this.info.responsable, 
        'responsableId': this.info.responsableId,
        'title': this.info.title,
        'longTitle': this.info.longTitle,
         'color':'yellow accent-4', // cambiamos el color a trnasparente 
        'description':this.info.description,
        'read':1, //  cambiamos el numero a 1, read
     //   //`./eservices-management/start-management/1/${managementId}`
        'action': this.info.action,
      });

        }else{ //si hay color entonces invertir a transparente 

          this.notificationData = ({
            'creator': this.info.creator,
            'creatorId':this.info.creatorId,
            'responsable': this.info.responsable, 
            'responsableId': this.info.responsableId,
            'title': this.info.title,
            'longTitle': this.info.longTitle,
             'color':'', // cambiamos el color a trnasparente 
            'description':this.info.description,
            'read':1, //  cambiamos el numero a 1, read
         //   //`./eservices-management/start-management/1/${managementId}`
            'action': this.info.action,
          });



        }
      
        this.NotificationsService.editNotification(id,this.notificationData).subscribe(
          res=>{
            // console.log(res);
            //si todo se hizo bien entonces redireccionamos a la ruta de la accion
            // this.router.navigate([this.notificationData.action]);
          //  this.ngOnInit()
          this.notifications();
        });
      });
  }

  redirectNotification(action:string, id:string){
    //enviamos el id para traernos todos los datos de la notificacion
    this.NotificationsService.getNotificationById(id).subscribe(
      res=> {
        this.info = res[0] as any; 
        //enviamos esa info de nuevo al backend editada, ahora con el campo read = 1; 
        // console.log('this info ----->',this.info)
         this.notificationData = ({
           'creator': this.info.creator,
           'creatorId':this.info.creatorId,
           'responsable': this.info.responsable, 
           'responsableId': this.info.responsableId,
           'title': this.info.title,
           'longTitle': this.info.longTitle,
            'color':'', // cambiamos el color a trnasparente 
           'description':this.info.description,
           'read':1, //  cambiamos el numero a 1, read
        //   //`./eservices-management/start-management/1/${managementId}`
           'action': this.info.action,
         });

     //    console.log(this.notificationData);
        this.NotificationsService.editNotification(id,this.notificationData).subscribe(
           res=>{
         
            //ng route
            //  this.router.navigate([action]);
            //  this.notifications();

             //hreff
             var url = (action);
             location.assign(url)  
           
         });
      });

  }
  order(){

  }
  //funcionamiento del menu desplegable 
  desplegable(){
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.dropdown-trigger');
    //   var instances = M.Dropdown.init(elems, Option);
    // });
    // $('.dropdown-trigger').dropdown();

    $(document).ready(function(){
      $('.modal').modal();
    });
  }
}

// Or with jQuery