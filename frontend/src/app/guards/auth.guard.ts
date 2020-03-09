import { Injectable } from '@angular/core';
import { CanActivate,   Router } from '@angular/router';
import { Observable, from } from 'rxjs';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/take';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router, 
    private authService: AuthService
    
  ){}
  canActivate(): boolean {
    // console.log('AuthGUard Tocken')
    this.authService.getToken()
    // console.log(this.authService.token)
    if (this.authService.token == null) {
      console.log('ACCESS DENEGATED');
      //this.router.navigate(['/auth'])
        return false;
        
    }else{
      console.log('ACCES TRUE');
      return true;
    }
  }
  

  }
