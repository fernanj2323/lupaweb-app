import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { jobBrief } from 'src/app/models/eservices/jobBrief/jobBrief';

@Injectable({
  providedIn: 'root'
})
export class JobBriefService {

  selectedJob: jobBrief;
  jobs: jobBrief[];

  readonly URL_JOB = 'http://localhost:3000/api/jobBrief';


  constructor( private http: HttpClient ) {
  //  this.selectedJob = new jobBrief();
  }

   public getJobBymanagementId(managementId:string){
  return this.http.get(this.URL_JOB + '/getJobBymanagementId/' + managementId);
   }

   public getJobBymanagementIdAndServiceLine (managementId:string, serviceLine:string){

    const array = ({
      managementId: managementId,
      serviceLine: serviceLine
    })
  return this.http.post( this.URL_JOB + '/getJobBymanagementIdAndServiceLine/' , array );
   }


   public getJobById (jobId:string){
  return this.http.get(this.URL_JOB + '/getJobById/' + jobId);
   }

   public postJob (jobArray:string){
  return this.http.post( this.URL_JOB + '/postJob/' , jobArray );
   }


   public putJob (jobId:string, jobArray:string){
   return this.http.put( this.URL_JOB + '/putJob/' +  jobId , jobArray );
   }

}
