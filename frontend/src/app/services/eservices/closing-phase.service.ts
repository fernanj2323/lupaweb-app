import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { closingPhase } from 'src/app/models/eservices/closingPhase/closingPhase';
@Injectable({
  providedIn: 'root'
})
export class ClosingPhaseService {

  selectedClosingPhase : closingPhase; 
  closingPhases: closingPhase[];
  readonly URL = 'http://localhost:3000/api/closingPhases';

  public  closing ;
  constructor(private http: HttpClient ) {
  //this.selectedClosingPhase = new closingPhase() ;
  this.closing = new closingPhase();
  }


  public getClosingPhaseByManagementId (managementId:string){
    return this.http.get(this.URL + '/getClosingPhaseByManagementId/' + managementId );
  }

  public getClosingPhaseById (id:string){
    return this.http.get(this.URL + '/getClosingPhaseById/' + id );
  }

  public postClosing( array){
  return this.http.post(this.URL + '/postClosing/' ,  array );
  }

  public putClosing( id, array ){
    return this.http.put(this.URL + '/putClosing/' + id,  array );
  }
}
