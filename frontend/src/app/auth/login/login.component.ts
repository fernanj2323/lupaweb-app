import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/auth/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { ifError } from 'assert';
import { post } from 'selenium-webdriver/http';
import { AuthGuard } from '../../guards/auth.guard';
import { NgxSmartModalService } from 'ngx-smart-modal';
declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }
  errorLogin(){
    console.log('error maniputarion');
    console.log(' TOKEN ')
    this.authService.logout();
    console.log( this.authService.token)
  };
  onLogin(form): void {
  //  console.log('flag on login')
    this.authService.login(form.value).subscribe(res => {
      M.toast({
        html: ' <z style="color: #676767; background-color: #86E788; margin: -30px; height: 45px; border: 1px solid green; border-radius:  4px;  font: 120% sans-serif; ">  <b> Bienvenido! </b>  </z>',
         classes: 'rounded'
        }) 
      this.router.navigateByUrl('/home');   

    },error => 
    {
      console.log(error.status);
      if (error.status == 409)
      { //clave invalida 
        M.toast({
          html: ' <z style="color: #676767; background-color: #f9a41f; margin: -30px; height: 45px; border: 1px solid black; border-radius:  4px;  font: 120% sans-serif; "> <b> Clave Invalida </b> </z>',
           classes: 'rounded'
          })
       }
       if (error.status == 400)
       { //clave invalida 
         M.toast({
           html: ' <z style="color: #676767; background-color: #f9a41f; margin: -30px; height: 45px; border: 1px solid black; border-radius:  4px;  font: 120% sans-serif; "> <b> Email no existe </b> </z>',
            classes: 'rounded'
           })
        }
      } 
    );
  }  
  formSelect(){
    $(document).ready(function(){
      $('select').formSelect();
    });
  }
}