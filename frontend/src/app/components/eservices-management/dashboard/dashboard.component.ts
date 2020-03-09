import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
//dependencies
import { Chart } from 'chart.js';
import { NgForm } from '@angular/forms';
//services
import { DeparmentsService } from 'src/app/services/config-master/deparments/deparments.service' 
import { ClientesService } from 'src/app/services/config-master/clientes/clientes.service'
import { JpactivityService } from 'src/app/services/jpactivity/jpactivity.service';
import { LocationsService } from 'src/app/services/config-master/locations/locations.service'
//models
import { Jpactivity } from 'src/app/models/jpactivity/jpactivity';
import { Locations } from 'src/app/models/config-master/locations/locations';
import { Clientes } from 'src/app/models/config-master/clientes/clientes';
import { Departments } from 'src/app/models/config-master/deparments/deparments';
import { Countrys } from 'src/app/models/config-master/locations/countrys';
import { Districts } from 'src/app/models/config-master/locations/districts';
import { Closters } from 'src/app/models/config-master/locations/closters';
import { Camps } from 'src/app/models/config-master/locations/camps';
import { Wells } from 'src/app/models/config-master/locations/wells';
import { ManagementStatus } from 'src/app/models/config-master/eservicesManagementStatus/managementStatus';
 
var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], 
  providers: [JpactivityService, LocationsService, ClientesService ]
})



export class DashboardComponent implements OnInit {


  public showFilters: number=0; 
  public showCloster: number=0; 
  chart = []; 
  public counter: number = 0;
  public fecha1:string; 
  public fecha2:string; 
  public filtered: string[];
  public servicesLine: string[]; 

 
  constructor(
    public ClientesService: ClientesService, 
    public jpactivityService: JpactivityService, 
    public LocationsService: LocationsService,
    public DeparmentsService: DeparmentsService,
    ) {


  }

  ngOnInit() {
    this.materialize();
    this.findSelectors();

  }

  materialize(){
   
    // Or with jQuery
  
      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
      });
      autoplay();
      function autoplay() {
          $('.carousel').carousel('next');
          setTimeout(autoplay, 4500);
      }  
  


    $(document).ready(function(){
      $('select').formSelect();
    });

    $(document).ready(function(){
      $('.datepicker').datepicker({
        format: 'dd/mm/yyyy',
      });
    });
  
  }

  //cambiamos el switch de show filters 
  changueShowFilters(n){
    if (n === 1 ){
      this.showFilters = 1; 
      this.ngOnInit();
    }else{
      this.showFilters = 0; 
      this.ngOnInit();
    }
   
  }
  //---------------------
  //funciones de Selectores  
  //----------------------
  findSelectors(){
    this.AllActivities();
    this.findLocations();
    this.findClientes();
    this.findServiceLine();
  }
  //locaciones 
  findLocations(){
this.LocationsService.getCountrys()
.subscribe(
  res=> {
    this.LocationsService.country = res as Countrys[];
  })
  this.LocationsService.getDistricts()
  .subscribe(
    res=> {
      this.LocationsService.district = res as Districts[];
    });
    this.LocationsService.getCamps().subscribe(
    res=>{
      this.LocationsService.camp = res as Camps[];
    });
    this.LocationsService.getClosters().subscribe(
      res=>{
        this.LocationsService.closter = res as Closters[];
      }
    );
    this.LocationsService.getWells().subscribe(
      res=> {
        this.LocationsService.well = res as Wells[];
      }
    );

    this.jpactivityService.getStatus().subscribe
    (res => { 
  
       this.jpactivityService.selectedManagementStatus = res as ManagementStatus; 
      //  console.log(   this.jpactivityService.selectedManagementStatus)
    });    
  }
  //clientes 
  findClientes(){
    this.ClientesService.getClientes().subscribe(
      res=> {
        this.ClientesService.clientes = res as Clientes[];
      }
    )
  }
  //linea de servicio 
  findServiceLine(){
  this.DeparmentsService.getDepartments().subscribe(
    res=>{
      this.DeparmentsService.departments = res as Departments[];
    }
  )
  }
  resetForm(form?: NgForm) {
    if(form){
      // console.log('reset form')
      form.reset();
      this.AllActivities();
      // this.clientesService.selectedCliente = new Clientes();
    }
  }

  //---------------------
  //funciones de busquedas 
  //----------------------
  hideCloster(event)
  {
    //solo mostramos la opcion closter del select si se selecciona la opcion welltesting 
    // show closter = 0  ocultar 
    // show closter = 1 mostar 
    
    if (event ==='Well Testing')
    {
      //mostrar closter
      this.showCloster = 1;
      // console.log('evento', event)
    }else{
      //ocultar closter
      this.showCloster = 0; 
    }
  }

  //es importante que para cada funcion se traiga el contenido y tambien 
  // el numero, de esta forma reducimos el numero de peticiones 
  //todas las actividades 
  AllActivities(){
    this.jpactivityService.getJpactivitys()
    .subscribe(res => {
      this.jpactivityService.Jpactivitys = res as Jpactivity[]; 
      console.log(this.jpactivityService.Jpactivitys);
      
      // this.servicesLine = this.jpactivityService.Jpactivitys[0].wt;
      // console.log(this.servicesLine);
      // return
    })
  }


  //---------------------
  //funciones de filtros 
  //----------------------
  applyFilters(form:NgForm){
    //filtrar por fechas 
  




    // this.AllActivities();
    this.counter =  this.counter + 1; 
    //si es primera vez que presionan filtrar 
    if (this.counter === 1){
      // console.log('primera vez')
       console.log('filtros seleccionados', form.value)

      // if (form.value.Critico && form.value.pais){ // si existe nivel de criticidad 
        var filtros = form.value; 
        // console.log('antes de filtros',this.jpactivityService.Jpactivitys);
        if (filtros.Critico ||
          filtros.responsibleLine ||
          filtros.client ||
           filtros.Critico ||
          filtros.status ||
          filtros.country ||
          filtros.district ||
          filtros.camp || 
          filtros.closter ||
          filtros.well || filtros.status || filtros.sl || filtros.wt || filtros.ct || filtros.wl || filtros.fi

          //  ||
          // filtros.Critico || 
          // filtros.status 
              ){
            if (filtros.sl) {
              this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
              (array   =>  array.sl === filtros.sl)
            }
            if (filtros.wt){
              this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
              (array   =>  array.wt === filtros.wt)
            }

            if (filtros.ct) {
              this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
              (array   =>  array.ct === filtros.ct)
            }
            if (filtros.wl) {
              this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
              (array   =>  array.wl === filtros.wl)
            } 
            if (filtros.fi){
              this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
              (array   =>  array.fi === filtros.fi)
            }



                //status de KOM
          if (filtros.status) {
            this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
            (array   =>  array.status === filtros.status)
          }
          if (filtros.client){
            this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
            (array   =>  array.client === filtros.client)
          }

          if (filtros.Critico){
            console.log('filtrando por criticidad', filtros.Critico)
            console.log('antes del filtro', this.jpactivityService.Jpactivitys)
             this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
             (array   =>  array.hrisk === filtros.Critico)
             console.log('despues del filtro', this.jpactivityService.Jpactivitys)
           }

          if (filtros.country){
            console.log('filtrando por country', filtros.country)
            console.log('antes del filtro', this.jpactivityService.Jpactivitys)
            this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
            (array   =>  array.country === filtros.country)
            console.log('despues del filtro', this.jpactivityService.Jpactivitys)
          }
      
          if (filtros.district){
            this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
            (array   =>  array.district === filtros.district)
          }
          if (filtros.camp){
            this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
            (array   =>  array.camp === filtros.camp)
          }
          if (filtros.closter){
            this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
            (array   =>  array.closter === filtros.closter)
          }
          if (filtros.well){
            this.jpactivityService.Jpactivitys =  this.jpactivityService.Jpactivitys.filter
            (array   =>  array.well === filtros.well)
          }
          

        }else{
          // console.log('no aplica')
        }

    }else{ //en caso de que den al filtro por segunda vez sin refrescar 

    this.jpactivityService.getJpactivitys()
    .subscribe(res => {
      this.jpactivityService.Jpactivitys = res as Jpactivity[]; 
      // console.log(this.jpactivityService.Jpactivitys);
      this.counter= 0; 
      // console.log('no es primera vez')
      this.applyFilters(form);
    }) 
    }
   
  }


  
// -------------------
// FUNCIONES DE FECHAS 
//--------------------
selectdateInit(date){
  // console.log('this fecha 1', date.value)
  this.fecha1 = date.value; 
  this.consultValid()
  }
  
  selectdateEnd(date){
    // console.log('this fecha 2', date.value)
    this.fecha2 = date.value; 
    this.consultValid()
    }
//consultamos que la fecha 2 no sea antes que la fecha 1 
  consultValid(){ 
    if (this.fecha1){
      if(this.fecha2){
        if (this.fecha1 > this.fecha2){
          alert('fecha invalida')
          this.fecha2 = '0';
        }else{
          this.jpactivityService.findByDate(this.fecha1, this.fecha2)
          .subscribe(res => {
            // console.log(res);
            this.jpactivityService.Jpactivitys = res as Jpactivity[];
          });
        }
      }
    }
  }

}
