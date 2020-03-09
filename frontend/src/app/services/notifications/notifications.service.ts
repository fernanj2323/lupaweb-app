import { Injectable } from '@angular/core';
import { Notification } from '../../models/notification/notification';
import { Observable, BehaviorSubject } from 'rxjs';
// import { JwResponse } from '../../models/auth/jw-response';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  selectedNotification: Notification;
  Notifications: Notification[];
  selectedNotificationsCreated: Notification;
  NotificationsCreated: Notification[];
  readonly URL_API = 'http://localhost:3000/api/not';

  constructor(private http: HttpClient) {
   // this.selectedNotification = new Notification();
   // this.selectedNotificationsCreated = new Notification();
   }
   //buscar notificaciones por ID de usuario asignado 
   public getNotifications(userId:string){
    //  console.log(userId);
     return this.http.get(this.URL_API+ '/' + userId);
   }
   //buscar notificaciones asignadas en eservices 

   public getNotificationsByCreatorId(creatorId:string, managementId:string ){

    // console.log('servicio', managementId)
     var form = ({
      'managementId' : managementId,
       'idAutor': creatorId
     });

    return this.http.patch(this.URL_API + '/getByCreatorId/'+ creatorId , form)
   }
   public getNotificationById(id:string){
    //  console.log(userId);
     return this.http.get(this.URL_API+ '/getById/' + id);
   }


   public countNotifications(userId:string){
     return this.http.get(this.URL_API+ '/count/' + userId )
   }
   //crear notificacion
   public createNotification(notification){
    //  console.log(notification);
     return this.http.post(this.URL_API,notification)
   }
   public editNotification(id:string, notificacion){
     return this.http.put(this.URL_API + '/' + id, notificacion);
   }
   public deleteNotification(id:string){
     return this.http.delete(this.URL_API + '/' + id);
   }
   public findActionsNot(array){

     return this.http.post(this.URL_API + '/findActionsNot' , array)

   }


}
