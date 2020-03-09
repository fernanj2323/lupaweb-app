import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, MinLengthValidator } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { materialize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router'; 
import  { JpactivityService } from '../../services/jpactivity/jpactivity.service'  //update
import  { Jpactivity } from '../../models/jpactivity/jpactivity'; //update 


declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 


@Component({
  selector: 'app-start-management',
  templateUrl: './start-management.component.html',
  styleUrls: ['./start-management.component.css'],
  providers: [JpactivityService]
})    
export class StartManagementComponent implements OnInit {

  // La variable tab nos va definir en que pagina de la gestion estamos 
  // definimos originalmente la variable como 1: pagina 1. 
  // luego recibimos el valor desde los otros componentes segun la redireccion 
  // que queramos hacer. 
  public managementId: string;
  public tab2:number;
  public tab:number=this.route.snapshot.params["n"]; 
  public n:number; 


  constructor(public route: ActivatedRoute, public router:Router, public jpactivityService: JpactivityService) { }
  
  ngOnInit() {
  const tab = this.route.snapshot.params["n"];
  // console.log('starm management router'); 
  // console.log(tab); 
  this.Show();
  this.formSelect();
  this.managementId = this.route.snapshot.params["id"];
  }

  Show(){
    if (localStorage.getItem("DEPARTMENT") === '4'){
      this.tab2 = 4;  //todos los usuarios 
      //console.log('compras')
      //this.getUsers();
    }else if (localStorage.getItem("DEPARTMENT") === '3'){
      this.tab2 = 3;
      // console.log('equipo de linea')
    }
  }
  formSelect(){
    $(document).ready(function(){
      $('select').formSelect();
    });
  }

  onManagement(form: NgForm){
    console.log('form.value');
    console.log(form.value);
    this.jpactivityService.postJpactivity(form.value)
    .subscribe(res => {
      M.toast({
        html: ' <z style="c lor: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Guardado! </b>  </z>',
         classes: 'rounded'
        });
        this.ngOnInit();
        console.log(res);
      })
      this.ngOnInit();

  };




}
