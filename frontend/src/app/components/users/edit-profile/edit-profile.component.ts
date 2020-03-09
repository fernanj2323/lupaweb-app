import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { EmailsService } from 'src/app/services/emails/emails.service';
import {NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Notification } from 'src/app/models/notification/notification';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UserService } from 'src/app/services/users/user.service';
import { Profile } from 'src/app/models/users/profile';
import { Countrys } from 'src/app/models/config-master/locations/countrys';
import {  LocationsService } from 'src/app/services/config-master/locations/locations.service';
import { Districts } from 'src/app/models/config-master/locations/districts';
import { DeparmentsService } from 'src/app/services/config-master/deparments/deparments.service';
import { from } from 'rxjs';
import { Departments } from 'src/app/models/config-master/deparments/deparments';

var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [UserService,NotificationsService, EmailsService, LocationsService  ]
})
export class EditProfileComponent implements OnInit {

  public showServicesLine: number = 0; 
  public permisology: number = 0; 


  constructor(
    public UserService: UserService, 
    public NotificationsService: NotificationsService,
    public EmailsService: EmailsService,
    public router:Router, 
    public route: ActivatedRoute, 
    public locationsService: LocationsService,
    public departmentService: DeparmentsService,
  ) { }

  ngOnInit() {

    this.findProfile()
    this.findCountry()
    this.findDepartments()
    // this.findLocations()

  }
  
  editProfile(form: NgForm){
    console.log(form.value); 
    const userId = this.route.snapshot.params["_id"];
    this.UserService.editProfile(userId, form.value).subscribe
    (res=>{
      console.log(res); 
      M.toast({
        html: 'Guardado'
       })
    })
  }
  findProfile(){
    const userId = this.route.snapshot.params["_id"]; //capturamos el id enrutado 

    this.UserService.getProfileById(userId)
    .subscribe
    (res => { 
      console.log('*********')
      console.log(res)
      this.UserService.selectedProfile = res as any; 
      if (this.UserService.selectedProfile.department == 'Operaciones'){
        this.showServicesLine = 1 ; 
      }
      console.log(this.UserService.selectedProfile)
      var country = this.UserService.selectedProfile.country; 
      this.captureCountry(country); 
     
    });
  }
  findCountry(){
    this.locationsService.getCountrys()
      .subscribe(res =>{
        this.locationsService.country  = res as any[];
        console.log(res)
      });
      
    }
    findDepartments(){
      this.departmentService.getDepartments()
      .subscribe(res => {
        this.departmentService.departments = res as any[];
      })
    }
    captureCountry(Event){
      console.log(Event)
      this.locationsService.getDistrictsByCountry(Event)
      .subscribe(res=>{
        this.locationsService.district = res as any[];
        console.log(this.locationsService.district)
       });
  
  }

  captureDepartment(Event){
    var selectedDepartment = Event.target.value; 
    console.log(selectedDepartment);
    if (selectedDepartment == 'Operaciones'){
      this.showServicesLine = 1 ; 
    }
    
  }
  captureModule(Event){
    var selectedModule = Event.target.value; 

    if (selectedModule == 'E-learning'){
      this.permisology = 1 ; 
    }
    if (selectedModule == 'E-services'){
      this.permisology = 2 ; 
    }
    if (selectedModule == 'E-HSEQ'){
      this.permisology = 3 ; 
    }
    if (selectedModule == 'E-Journey'){
      this.permisology = 4 ; 
    }
    if (selectedModule == 'Usuarios'){
      this.permisology = 5 ; 
    }

  }
}
