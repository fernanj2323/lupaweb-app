import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { iro } from 'src/app/models/eservices/IRO/IRO'
@Injectable({
  providedIn: 'root'
})
export class IroService {
  
  selectedIRO : iro;
  IROS: iro[];


  readonly URL_IRO = 'http://localhost:3000/api/iro';

  constructor( private http: HttpClient ) {

  //  this.selectedIRO = new iro();
   }
   public getIroByManagementIDandSL(managementId:string, sl){
    const array = ({
       managementId: managementId,
       sl: sl 
     })
     
     return this.http.post(this.URL_IRO + '/getIroByManagementIDandSL/' , array );
   }

   public getIroByManagementID(managementId:string){
    // const array = ({
    //    managementId: managementId
    //  })
     return this.http.get(this.URL_IRO + '/getIroByManagementID/' + managementId );
   }

   public getIros (){
     return this.http.get(this.URL_IRO);
   }

   public postIro(managementId: string){

    const array = ({
       managementId: managementId
     })

    return this.http.post(this.URL_IRO + '/postIro', array )
   }
 

   public putIro(iroId: string, array: string){
   return this.http.put(this.URL_IRO + '/putIro/' + iroId , array )
   }
}
