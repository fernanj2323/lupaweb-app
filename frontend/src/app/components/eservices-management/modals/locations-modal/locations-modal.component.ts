import { Component, OnInit } from '@angular/core';
import {  LocationsService } from 'src/app/services/config-master/locations/locations.service';

//models
import {Countrys } from 'src/app/models/config-master/locations/countrys';
import {Locations } from "src/app/models/config-master/locations/locations";
import { Districts } from 'src/app/models/config-master/locations/districts';
import { Camps } from 'src/app/models/config-master/locations/camps';
import { Closters } from 'src/app/models/config-master/locations/closters';
import { Wells } from 'src/app/models/config-master/locations/wells';

import { NgForm } from '@angular/forms';

var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-locations-modal',
  templateUrl: './locations-modal.component.html',
  styleUrls: ['./locations-modal.component.css'],
  providers:[LocationsService]
})
export class LocationsModalComponent implements OnInit {

  public LocationMode: number = 1; 
  public CountryMode: number = 1; 


  //funciones dinamicas 
  public arrayOfSelects: string[];
  public showModule: number = 0;
  public ModuleName: string; 
  public ArrayOfService: string | Countrys[] | Districts[] | Camps[] | Closters[] | Wells[]; 
  public ArrayOfSelect: string[] | Countrys[] | Districts[] | Camps[] | Closters[] | Wells[]; 
  public ArrayOfSelect2: any = new Array(); 
  public ngModel: string; 
     
  

  public placeholder : string; 
  public addForm:string; 
  public moduleSelected:number= 0 ; 
  public selectFromModule:number = 0; 
  // public editLocation:string; 
  
  public enableLocationN: number = 0; 

  constructor(
    public locationsService: LocationsService
  ) { }

  ngOnInit() {
    this.findOptionsForSelects(1);
  }

  updatePreviousComponent(){
    console.log('request update')
  }


  findOptionsForSelects(diferenciador:number){
   if (diferenciador === 1 ){
     this.locationsService.getCountrys()
     .subscribe(res=>{
      this.locationsService.country = res as Countrys[];
     });

     this.locationsService.getDistricts()
     .subscribe(res=>{
      this.locationsService.district = res as Districts[];
     });

     this.locationsService.getCamps()
     .subscribe(res=>{
      this.locationsService.camp = res as Camps[];
     }); 

     this.locationsService.getClosters()
     .subscribe(res=>{
      this.locationsService.closter = res as Closters[];
     });  

     this.locationsService.getWells()
     .subscribe(res=>{
      this.locationsService.well = res as Wells[];
     });
   }
  }

//Dinamic Modal Functions
dinamicAddAndEdit(diferenciador:number, form:NgForm){
  //si diferenciador es igual a uno queremos agregar
if (diferenciador == 1){
    if(this.moduleSelected == 1){
      this.addCountry(form)
    }
      if(this.moduleSelected == 2){
      this.addDistrict(form)
    }
    if(this.moduleSelected == 3){
      this.addCamp(form)
    }
    if(this.moduleSelected == 4){
      this.addCluster(form)
    }
    if(this.moduleSelected == 5){
      this.addWell(form)
    }
   

  //si diferneciador es igual a dos queremos editar
}else{
    if (diferenciador == 2){
      if(this.moduleSelected == 1){
        this.editCountry(form)
      }
      if(this.moduleSelected == 2){
        this.editDistrict(form)
      }
      if(this.moduleSelected == 3){
        this.editCamp(form)
      }
      if(this.moduleSelected == 4){
        this.editCluster(form)
      }
      if(this.moduleSelected == 5){
        this.editWell(form)
      }
  }
}};
enableLocation(n:number){
  console.log(n)
  if(n == 1) //Pais
  { 
    this.moduleSelected = 1;
    this.showModule = 1; 
    this.addForm = 'addCountry(locationForm)'
    this.ModuleName = 'Modulo Pais';
    this.placeholder ='Agregar Pais';
    this.locationsService.getCountrys()
    .subscribe(res=>{
      this.locationsService.country = res as Countrys[];
      this.ArrayOfService = this.locationsService.country;
      M.toast({
        html: 'Habilitado modulo de Paises'
        })
        this.findOptionsForSelects(1); // aqui buscamos las opciones de cada selector
        this.findCountry();
    })
  }else{ 
    if(n==2) //Distrito
    {
      this.moduleSelected = 2;
      this.showModule = 1; 
      this.addForm = 'addDistrict(locationForm)'
      this.ModuleName = 'Modulo Distrito'
      this.placeholder ='Agregar Distrito';
      this.locationsService.getDistricts()
      .subscribe(res=>{
        this.locationsService.district = res as Districts[];
        this.ArrayOfService = this.locationsService.district;
        console.log(this.ArrayOfService)
        M.toast({
          html: 'Habilitado modulo de Distritos'
          })
          this.findDistrict();
          this.findOptionsForSelects(1); // aqui buscamos las opciones de cada selector
      })
    }else{ 
      if(n==3) //Campo
      {
        this.moduleSelected = n;
        this.showModule = 1; 
        this.ModuleName = 'Modulo Campo'
        this.placeholder ='Agregar Campo';
        this.locationsService.getCamps()
        .subscribe(res=>{
          this.locationsService.camp = res as Camps[];
          this.ArrayOfService = this.locationsService.camp;
          M.toast({
            html: 'Habilitado modulo de Campos'
            })

            this.findCamp();
        })
      }else{ 
        if(n==4) //Cluster
        {
          this.moduleSelected = n;
          this.showModule = 1; 
          this.ModuleName = 'Modulo Cluster'
          this.placeholder ='Agregar Cluster';
          this.locationsService.getClosters()
          .subscribe(res=>{
            this.locationsService.closter = res as Closters[];
            this.ArrayOfService = this.locationsService.closter;
            M.toast({
              html: 'Habilitado modulo de Clusters'
              })

              this.findCluster();
          })
        }else{ 
          if(n==5) //Pozo
          {
            this.moduleSelected = n;
            this.showModule = 1; 
            this.ModuleName = 'Modulo de Pozo'
            this.placeholder ='Agregar Pozo';
            this.locationsService.getWells()
            .subscribe(res=>{
              this.locationsService.well = res as Wells[];
              this.ArrayOfService = this.locationsService.well;
              M.toast({
                html: 'Habilitado modulo de Pozos'
                })
                this.findWell();
            })
          } else{ 
            this.moduleSelected = 0;
            M.toast({
              html: 'Modulo deshabilitado'
              })
          }
        }
      }
    }
  }
}

//pozo module 
findWell(){
  this.locationsService.getWells()
  .subscribe(res=>{
    this.locationsService.well = res as Wells[];
    this.ArrayOfService = this.locationsService.well;
  })
}

addWell(form: NgForm){
  this.locationsService.postWell(form.value)
  .subscribe(res=>{
    console.log(res);
    this.findWell();
    M.toast({
      html: 'Pozo Agregado'
      })
    this.resetForm(form);

    })
}

editWell(form: NgForm){
  this.locationsService.putWell(form.value)
  .subscribe(res=>{
    console.log(res);
       M.toast({
              html: 'Pozo Editado'
              })
  })
}

//Cluster module 
findCluster(){
  this.locationsService.getClosters()
  .subscribe(res=>{
    this.locationsService.closter = res as Closters[];
    this.ArrayOfService = this.locationsService.closter;
  })
}

addCluster(form: NgForm){
  this.locationsService.postClosters(form.value)
  .subscribe(res=>{
  console.log(res);
  this.findCluster();
  M.toast({
    html: 'Cluster Agregado'
    })
  this.resetForm(form);
  })
}

editCluster(form: NgForm){
  this.locationsService.putCloster(form.value)
  .subscribe(res=>{
    console.log(res);
    M.toast({
      html: 'Cluster Editado'
      })
  })
}



//Campo module 
findCamp(){
  this.locationsService.getCamps()
  .subscribe(res=>{
    this.locationsService.camp = res as Camps[];
    this.ArrayOfService = this.locationsService.camp;
  })
}

addCamp(form: NgForm){
  this.locationsService.postCamps(form.value)
  .subscribe(res=>{
  console.log(res);
    this.findCamp();
    M.toast({
      html: 'Campo Agregado'
      })
    this.resetForm(form);
  })
}

editCamp(form: NgForm){
  this.locationsService.putCamp(form.value)
  .subscribe(res=>{
    console.log(res);
    M.toast({
      html: 'Campo Editado'
      })
  });
}





//district module 
findDistrict(){
  this.locationsService.getDistricts()
  .subscribe(res=>{
    this.locationsService.district = res as Districts[];
    this.ArrayOfService = this.locationsService.district;
  })
}

addDistrict(form?: NgForm){
  console.log('formulario de District',form.value);
  this.locationsService.postDistricts(form.value)
  .subscribe(res=>{
    console.log('District', res);
    this.findDistrict();
    this.resetForm(form);
    M.toast({
      html: 'Distrito Agregado'
      })
  })
}

editDistrict(form:NgForm){
  this.locationsService.putDistrict(form.value)
  .subscribe(res=>{
    console.log( res);
    M.toast({
      html: 'Distrito Editado'
      })
  })
}



//COUNTRY MODULE 
  findCountry(){
    this.locationsService.getCountrys()
    .subscribe(res=>{
      this.locationsService.country = res as Countrys[];
      this.ArrayOfService = this.locationsService.country;
      console.log(this.ArrayOfService)
      
    })
  }

  addCountry(form?: NgForm){
    console.log('formulario de pais',form.value);
    this.locationsService.postCountry(form.value)
    .subscribe(res=>{
      console.log('postCountry', res);
      this.findCountry();
      M.toast({
        html: 'Pais Agregado'
        })
      this.resetForm(form);
      
    })
  }

  editCountry(form?: NgForm){
   console.log('edit cuntry' , form.value)
    this.locationsService.putCountry(form.value)
    .subscribe(res=>{
    console.log(res);
    this.findCountry();
    // this.resetForm(form);
    M.toast({
      html: 'Pais Editado'
      })
    })
 }

  

 
//---------------------------------------
//habilitar o deshabilitar modulos CRUD
//---------------------------------------
//  editLocation(form?: NgForm){
//   console.log('edit location' , form.value)
//  }

resetForm(form?: NgForm) {
  if(form){
    console.log('ResetForm')
    form.reset();
  }
}
  hideModule(){
    this.enableLocationN=0;
    M.toast({
      html: 'Deshabilitado Modulo de Paises'
      })
  }

}
