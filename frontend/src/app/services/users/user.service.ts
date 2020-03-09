import { Injectable } from '@angular/core';
import { Profile } from 'src/app/models/users/profile';
import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  selectedProfile : Profile; 
  Profiles: Profile[];
  readonly URL_API = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {
  //  this.selectedProfile = new Profile();
   }

   public getProfiles (){
   return this.http.get(this.URL_API);
   }

   public getProfileById(id) {
     const array = ({
       id: id 
     })
     console.log(array);
     return this.http.post (this.URL_API+ '/getProfileById' , array);
   }
   public getProfileByAuthId (authId){
     const array = ({
       authId: authId
     })
    return this.http.post (this.URL_API + '/getProfileByAuthId', array);
  }


   public getProfileByEmail(email){
    const array = ({
      email: email
    })
    // console.log(array)
    return this.http.post (this.URL_API+ '/getProfileByEmail/' , array);
   }

   public editProfile(id, form){
  //  console.log(id);
  //  console.log(form);
    return this.http.put (this.URL_API+ '/editProfile/'+ id, form);
   }

}
