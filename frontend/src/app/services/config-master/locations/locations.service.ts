import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Locations } from 'src/app/models/config-master/locations/locations';
import { Countrys } from 'src/app/models/config-master/locations/countrys';
import {Districts } from 'src/app/models/config-master/locations/districts';
import {Camps} from 'src/app/models/config-master/locations/camps';
import {Closters} from 'src/app/models/config-master/locations/closters';
import {Wells} from 'src/app/models/config-master/locations/wells';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
 selectedLocation: Locations;

 locations: Locations[];
  country: Countrys[];
  district: Districts[];
  camp: Camps[];
  closter: Closters[];
  well: Wells[];


 readonly URL_API = 'http://localhost:3000/api/locations';
 readonly URL_API_countrys = 'http://localhost:3000/api/locations/countrys';
 readonly URL_API_camps = 'http://localhost:3000/api/locations/camps';
 readonly URL_API_districts = 'http://localhost:3000/api/locations/districts';
 readonly URL_API_closters = 'http://localhost:3000/api/locations/closters';
 readonly URL_API_wells = 'http://localhost:3000/api/locations/wells';




  constructor(private http: HttpClient) { 
  //  this.selectedLocation = new Locations();
  }


// countrys 
  getCountrys(){ 
   return this.http.get(this.URL_API_countrys);
  }

  postCountry(country:Countrys){
   return this.http.post(this.URL_API_countrys, country)
  }

  putCountry(country:Countrys){
    return this.http.put(this.URL_API_countrys + `/${country._id}`, country);
  }

// districts 
  getDistricts(){ 
  return this.http.get(this.URL_API_districts);
  }

  getDistrictsByCountry(country){
   var  array = ({
    country: country
    })
    return this.http.post(this.URL_API_districts + '/getDistrictsByCountry', array)
  }
  postDistricts(districts:Districts){
  return this.http.post(this.URL_API_districts , districts)
  }
  putDistrict(districts:Districts){
    return this.http.put(this.URL_API_districts + `/${districts._id}`, districts);
  }

//camps 
  getCamps (){
    return this.http.get(this.URL_API_camps)
  }
  postCamps(camp: Camps){
    return this.http.post(this.URL_API_camps, camp)
  }
  putCamp(camp:Camps){
    return this.http.put(this.URL_API_camps + `/${camp._id}`, camp);
  }


//closters 
  getClosters(){
    return this.http.get(this.URL_API_closters)
  }

  postClosters(closter: Closters){
    return this.http.post(this.URL_API_closters, closter)
  }

  putCloster(closter:Closters){
    return this.http.put(this.URL_API_closters + `/${closter._id}`, closter);
  }

//Wells 

  getWells(){
    return this.http.get(this.URL_API_wells)
  }
  postWell(well:Wells){
    return this.http.post(this.URL_API_wells, well);
  }
  putWell(well:Wells){
    return this.http.put(this.URL_API_wells + `/${well._id}`, well);
  }


  // ------------------------------
// ---------------------------------------------------
  // -------------------------------
  
  // getLocations(){
  //   return this.http.get(this.URL_API);
  // }
  // getLocation(id:string){
  //   return this.http.get(this.URL_API + `/${id}`);
  // }
  // postLocation(location:Locations){ //crear locacion 
  //   // console.log('postLocationService', location)
  //   return this.http.post(this.URL_API , location);
  // }
  // putLocation(location:Locations){
  //   return this.http.put(this.URL_API + `/${location._id}`, location);
  // }
  // deleteLocation(id:string){
  //   return this.http.delete(this.URL_API +`/${id}`);
  // }
}
