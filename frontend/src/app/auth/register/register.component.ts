import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/auth/user';
import { FormControl, FormGroup, Validators, MinLengthValidator } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { materialize } from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators';
import { DeparmentsService } from 'src/app/services/config-master/deparments/deparments.service';
import { Departments } from 'src/app/models/config-master/deparments/deparments';

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public tab:number = 0;
  public showServiceLIne:number = 0; 
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // createFormGroup(){
  //   return new FormGroup
  //   ({
  //   name: new FormControl('',),
  //   email: new FormControl('',[Validators.required, Validators.minLength(0)]),
  //   password: new FormControl('',[Validators.required, Validators.minLength(4)]),
  //   department: new FormControl('',),
  //   role: new FormControl('',)
  //   });
  // }
 // contactForm: FormGroup;

  constructor(public  authService:AuthService, public router:Router, 
    public departmentService: DeparmentsService, ) { 
  
  }


  ngOnInit() {
   // console.log('form.before');
  //  console.log(this.contactForm)
    this.formSelect();
    this.findDepartments();
    this.tab = 0; 
  }
  findDepartments(){
    this.departmentService.getDepartments().subscribe
    (res=>{
      
      this.departmentService.departments = res as any[];
      console.log( this.departmentService.departments)
    })
  }

  captureDepartment(event){
    var selectedDepartment = event.target.value; 
    console.log(selectedDepartment);
    if(selectedDepartment == 'Operaciones'){
      this.showServiceLIne = 1; 
    }else{ 
      this.showServiceLIne = 0; 
    }
  }
  exit(form) {
    console.log('end')
  // this.router.navigateByUrl('/Auth/register')
  }

  formSelect(){
    $(document).ready(function(){
      $('select').formSelect();
    });
  }

  onRegister(form: NgForm){
    console.log(form.value)
     // console.log(form.controls.email.status)    
    this.consult(form.value)
    if (form.value.password == form.value.passwordConfirm){
    this.authService.register(form.value).subscribe(res =>{
     M.toast({
      html: ' <z style="color: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Registrado Correctamente! </b>  </z>',
       classes: 'rounded'
      })
     form.reset(form);
  //   this.authService.selectedUser = new User ();
    },error => {
      /////aqui manipulamos el error en caso de que exista un error ///
      if (error.status == 500){ //Faltan datos para llenar el formulario 
        console.log('Error 500');
        M.toast({
          html: ' <z style="color: #676767; background-color: #f9a41f; margin: -30px; height: 45px; border: 1px solid black; border-radius:  4px;  font: 120% sans-serif; "> <b> Formulario Incompleto </b> </z>',
           classes: 'rounded'
          })
      }
      if (error.status == 409){ //el email ya existe 
        console.log('Error 409');
        M.toast({
          html: ' <z style="color: #676767; background-color: #f9a41f; margin: -30px; height: 45px; border: 1px solid black; border-radius:  4px;  font: 120% sans-serif; "> <b> Éste Email ya está registrado </b> </z>',
           classes: 'rounded'
          })
      }
    });
    //console.log(HttpErrorResponse);
    //console.log(Error.status);
    //form.reset(form);
    //this.authService.selectedUser = new User ();
    }
    //this.Show(this.tab);
  }
  
  consult(form){ 
    //password match consult 
    if (form.password == form.passwordConfirm) {
      this.tab = 0; 
      console.log('Paswword Match');
    // this.resetForm(form);

      return

    } else { 
      console.log('Paswword Doesnt Match');
      this.tab = 1; 
      M.toast({
        html: ' <z style="color: #676767; background-color: #f9a41f; margin: -30px; height: 45px; border: 1px solid black; border-radius:  4px;  font: 120% sans-serif; "> <b> Contraseñas no coinciden </b> </z>',
         classes: 'rounded'
        })
    //  this.exit(form); 

    }
 }

 resetForm(form? : NgForm ){
 // if (form){
  //  console.log('form.reseT');
    form.reset();
   // this.authService.selectedUser = new User ();
    
 // }
}

  // get name() { return this.contactForm.get('name'); }
  // get email() { return this.contactForm.get('email'); }
  // get message() { return this.contactForm.get('message'); }
}
