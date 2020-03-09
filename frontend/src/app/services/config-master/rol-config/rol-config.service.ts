import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolConfig } from '../../../models/config-master/rol-config/rolConfig';

@Injectable({
  providedIn: 'root'
})
export class RolConfigService {
  selectedRols: RolConfig;
  selectedMenu: RolConfig;
  rolConfig: RolConfig[]
  readonly URL_API = "http://localhost:3000/api/rolConfig"

  constructor(private http: HttpClient) { 
    //this.selectedRols = new RolConfig();
   // this.selectedMenu = new RolConfig();
  }

  getRols(){
    return this.http.get(this.URL_API);
  }
  getRolsbyType(rolConfig_id: String){
    return this.http.get(this.URL_API+`/findbytype`+`/${rolConfig_id}`);
  }
  getRol(rolConfig_id: String){
    return this.http.get(this.URL_API+`/${rolConfig_id}`);
  }
  postRol(rolConfig: RolConfig){
    return this.http.post(this.URL_API, rolConfig);
  }
  putRol(rolConfig: RolConfig){
    return this.http.put(this.URL_API + `/${rolConfig._id}`, rolConfig);
  }
  deleteRol(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }  
}
