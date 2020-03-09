import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//models 
import { wellCondition } from 'src/app/models/config-master/criticalRequirements/wellCondition';
import { operationCondition } from 'src/app/models/config-master/criticalRequirements/operationCondition';
import { hseCondition } from 'src/app/models/config-master/criticalRequirements/hseCondition'; 
import { technologyCondition} from 'src/app/models/config-master/criticalRequirements/technologyCondition';



@Injectable({
  providedIn: 'root'
})
export class CriticalRequirementsService {

wellCondition: wellCondition[]
operationCondition: operationCondition[];
hseConditicon: hseCondition[];
technologyCondition: technologyCondition[];


readonly URL_API = 'http://localhost:3000/api/criticalsreq';


  constructor(private http: HttpClient) { 

    // this.selectedwellCondition = new wellCondition();
    // this.selectedoperationCondition = new operationCondition();
    // this.selectedohseConditicon = new hseCondition();
    // this.selectedtechnologyCondition = new technologyCondition();

  }

   //wells 
   getWellConditions(){

     return this.http.get(this.URL_API + `/wells` )
   }
   //crear
   postWellCondition(condition:wellCondition){

     return this.http.post(this.URL_API + `/well`, condition)
   }
   //editar 
   putWellCondition(condition:wellCondition){

    return this.http.put(this.URL_API + `/well`+ `/${condition._id}`, condition)
   }


   //operation 
   getOperationConditions(){

    return this.http.get(this.URL_API + `/operations` )
  }
  //crear
  postOperationCondition(condition:operationCondition){

    return this.http.post(this.URL_API + `/operation`, condition)
  }
  //editar 
  putOperationCondition(condition:operationCondition){

   return this.http.put(this.URL_API + `/operation`+ `/${condition._id}`, condition)
  }


  
   //HSE 
   getHseConditions(){

    return this.http.get(this.URL_API + `/hses` )
  }
  //crear
  postHseCondition(condition:hseCondition){

    return this.http.post(this.URL_API + `/hse`, condition)
  }
  //editar 
  putHseCondition(condition:hseCondition){

   return this.http.put(this.URL_API + `/hse`+ `/${condition._id}`, condition)
  }


    //Tecnologicas 
    getTechnologyConditions(){

      return this.http.get(this.URL_API + `/technologys` )
    }
    //crear
    postTechnologyCondition(condition:technologyCondition){
  
      return this.http.post(this.URL_API + `/technology`, condition)
    }
    //editar 
    putTechnologyCondition(condition:technologyCondition){
  
     return this.http.put(this.URL_API + `/technology`+ `/${condition._id}`, condition)
    }
}
