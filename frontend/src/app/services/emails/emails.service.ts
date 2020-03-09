import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// import { JwResponse } from '../../models/auth/jw-response';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Emails } from '../../models/emails/emails'
// import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
selectedemail: Emails;
Emails: Emails[];
Datas:({ 
  'to' : string,
  'from': string, 
   'type': string,
   'subject': string, 
   'description': string
});

readonly URL_API = 'http://localhost:3000/api/email';

  constructor(private http: HttpClient) {
    //this.selectedemail = new Emails();
   }

   //enviamos Email
   public postMail(data){
  //   console.log(data);
     return this.http.post(this.URL_API, data)
   }
   
}
