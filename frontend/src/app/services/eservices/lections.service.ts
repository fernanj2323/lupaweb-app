import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { lections } from 'src/app/models/eservices/lections/lections'
@Injectable({
  providedIn: 'root'
})
export class LectionsService {
  selectedLection : lections; 
  lections : lections[]

  readonly URL = 'http://localhost:3000/api/eservices/lections';
  constructor( private http: HttpClient) {
   // this.selectedLection = new lections();
   }

   public getLectionByManagementId (managementId){
    return this.http.get(this.URL + '/getLectionByManagementId/' + managementId );
   }

   public postLection(lection){
   

    return this.http.post(this.URL + '/postLection/' , lection );
   }

   public putLection(id, lection ){


    return this.http.put(this.URL + '/putLection/' + id,  lection);
   
  }
}
