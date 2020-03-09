import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { EmailsService } from 'src/app/services/emails/emails.service';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Notification } from 'src/app/models/notification/notification';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UserService } from 'src/app/services/users/user.service';
import { Profile } from 'src/app/models/users/profile';


var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 


interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [UserService,NotificationsService, EmailsService  ]
})
export class UsersListComponent implements OnInit {

  constructor(
    public UserService: UserService, 
    public NotificationsService: NotificationsService,
    public EmailsService: EmailsService,
  ) { }

  ngOnInit() {
    this.findProfiles()
  }

  findProfiles(){
    this.UserService.getProfiles().subscribe
    (res => {
     
      this.UserService.Profiles = res as any[];
      console.log(this.UserService.Profiles);
    })
  }

}
