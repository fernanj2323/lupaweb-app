import { Component, OnInit } from '@angular/core';
import { Jpactivity } from '../../models/jpactivity/jpactivity';
import  { JpactivityService } from '../../services/jpactivity/jpactivity.service'
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { Chart } from 'chart.js'; //charts 

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-eservices-dash-board',
  templateUrl: './eservices-dash-board.component.html',
  styleUrls: ['./eservices-dash-board.component.css'],
  providers: [JpactivityService]
})
export class EservicesDashBoardComponent implements OnInit {
  public tab:number = 0; 
  public minimized1 : number = 0; 
  public minimized2 : number = 0; 
  public minimized3 : number = 0; 

  //array vacio que alamacena data para el chart 
  public name : string; 
  public chart = [];


   ctx = [];
  constructor(public router:Router, public ngxSmartModalService: NgxSmartModalService, public jpactivityService: JpactivityService) { }
 
  pageActual: number = 1; //definimos la variable como tipo numero, esta variable es la que define el numero de pagina de la vista html 

  ngOnInit() {
    this.Show();
    this.onChart();
  }
  Show(){ 
    console.log('Show')
    if (localStorage.getItem("DEPARTMENT") === '10'){//it 
      this.tab = 1;  // 
      console.log('IT')
      this.getUsers();
    };
      if (localStorage.getItem("DEPARTMENT") === '3'){//jefe de linea
      //console.log('jefe de linea')
      if (localStorage.getItem("ROL") === '2'){
        this.tab = 3; 
        console.log('jefe de linea')
        this.getUsers();
      };
      
      if (localStorage.getItem("ROL") === '1'){
        this.tab = 3.1; 
        console.log('basico de linea')
        this.getUsers();
      };
     } 
    if (localStorage.getItem("DEPARTMENT") === 'Comercial'){//comercial
      this.tab = 4;  //
      this.name = 'Comercial'
      //console.log('compras')
      this.getUsers();
    };
  }

  onChart(){
    this.jpactivityService.getJpactivitys().subscribe 
    (res => {
        console.log('res');
       // const numero = res.length; 
       // console.log(numero); 
    })
  };


minimize (n:Number)
{ 
  if (n===1){//componente 1. todas las licitaciones 
    if (this.minimized1 === 0){

      // console.log('1');
      this.minimized1 = 1; 
      
    } else {

      // console.log('0');
      this.minimized1 = 0; 

    }

  }else if(n===2){//componente 2. pendientes por licitacion
    if (this.minimized2 === 0){

      // console.log('1');
      this.minimized2 = 1; 
      
    } else {

      // console.log('0');
      this.minimized2 = 0; 

    }



  }else if(n==3){//componente 3. gestiones licitadas 
    if (this.minimized3 === 0){

      // console.log('1');
      this.minimized3 = 1; 
      
    } else {

      // console.log('0');
      this.minimized3 = 0; 

    }



  }

    // if (this.minimized2 === 0){

    //   console.log('1');
    //   this.minimized2 = 1; 
      
    // } else {

    //   console.log('0');
    //   this.minimized2 = 0; 

    // }
};








  
  formSelect(){
    $(document).ready(function(){
      $('select').formSelect();
    });
  }

  getUsers(){
    this.jpactivityService.getJpactivitys().subscribe 
    (res => {
      this.jpactivityService.Jpactivitys = res as any[];
      this.formSelect();
    });
  };

  deleteActivity(_id: string){
    console.log('_id');
      console.log(_id);
      this.jpactivityService.deleteActivity(_id).subscribe 
      (res => 
        { console.log(res)   });
  };

}
