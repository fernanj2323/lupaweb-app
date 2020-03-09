import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

  export class SidenavComponent {
    public logout = "empty"; 
    public tab:number = 0; 
   showFiller = false;
    constructor(public authService: AuthService, public router: Router) { 

}

ngOnInit() {  
this.Show();
}
Show(){
     // ESTA FUNCION DEFINE LA VARIABLE THIS.TAB QUE VARIA DONDE 
      //ENTRA EL SWITCH DEL HTML, 
      //PARA MAS INFORMACION VER EL GLOSARIO EN NUESTRO SIDENAV.COMPOENNT.HTML
       //-----------------------------------

       ///=======FILTROS PARA HOME============ 

       //-----------------------------------------------
   if (this.router.url ==  '/home' )
    {   
    this.logout = '../Auth/login'; 
       //-------------filtros por departamento---------- 
       //-----------------------------------------------
       //--------- IT PERMISOS DE ADMINISTRADOR ----------
        if(localStorage.getItem("DEPARTMENT")=== '10')
        {
        console.log('home');
        this.tab = 0; 
        this.logout = '/../../Auth/login';
        //--------- PARA TODOS LOS DEMAS  ---------
         //-------------TODOS LOS USUARIOS ---------------
        }
         else 
        {
          this.tab = 1; 
          this.logout = '/../../Auth/login';
        }
       
    }; 
   
       //-----------------------------------------------
      ///==========FILTROS PARA USERS PRFILE ============ 
      //-----------------------------------------------
      if (this.router.url ==  '/users/profile' )
      {     
        this.tab = 2;
        console.log('2');
        this.logout = '../Auth/login';
      } 
       //-----------------------------------
       ///=======FILTROS PARA  USERS LIST ============ 
       //-----------------------------------------------
       // el this.tab de USERS/LIST es el numero 3 
       // como hay varias nominaciones usamos 3.# 
       //3.0 para usuarios no administrativos,
       // que en vez de decir lista de usuarios en el titulo del sidenav dice mi equipo 
       // 3.1 para usuarios administrativos como IT y RRHH, que pueden ver la lista completa de usuarios
      if (this.router.url == '/users/list')
       {
        if (localStorage.getItem("DEPARTMENT") == '2','3','4','5') //no administrativos 
        {  
        //console.log('flaggg')
        this.tab = 3.0; 
        this.logout = '/../../Auth/login';
        };
        if (localStorage.getItem("DEPARTMENT") === '1') //RRHH Y IT 
        {  
         // console.log('flaggg2')
        this.tab = 3.1; 
        this.logout = '/../../Auth/login';
        };
        if (localStorage.getItem("DEPARTMENT") === '10') //RRHH Y IT 
        {  
        //  console.log('flaggg2')
        this.tab = 3.1; 
        this.logout = '/../../Auth/login';
        };
       }
       //-----------------------------------
       ///=======FILTROS PARA TICKETS LIST ============ 
       //-----------------------------------------------
       // el this.tab de USERS/LIST es el numero 4
       //  como hay varias nominaciones usamos 4.# 
       //4.0 para usuarios no administrativos,
       // opciones: Enviar ticket y mis tickets
       // 4.1 para usuarios administrativos como IT , Lista de Tickets Salamente, proximamente mis tickets resueltos. 
       if (this.router.url == '/tickets/listTickets' ){
          if (localStorage.getItem("DEPARTMENT") === '10') // IT 
        { 
         // console.log('ppp');
          this.tab = 4.1; 
          this.logout = '/../../Auth/login';
        }else{
         // console.log('ppp2');
          this.tab = 4; 
          this.logout = '/../../Auth/login';
        }
      }

      if (this.router.url == '/tickets/createTicket' ){
        if (localStorage.getItem("DEPARTMENT") === '10') // IT 
      { 
     //  console.log('ppp');
        this.tab = 4.1; 
        this.logout = '/../../Auth/login';
      }else{
      // console.log('ppp2');
        this.tab = 4; 
        this.logout = '/../../Auth/login';
      }
    }

       //------------------------------------------
       ///======= FILTROS PARA USERS ADD ============
       //-----------------------------------------------
       if (this.router.url == '/users/add')
       {

        this.tab = 2; 
        this.logout = '/../../Auth/login';
       }  
   
       //------------------------------------------
       ///======= FILTROS PARA DASHBOARD - ESERVICES ============
       //-----------------------------------------------
       if (this.router.url == '/eservices/dashboard')
       {
       console.log('5');
       this.tab = 5; 
       this.logout = '/../../Auth/login';
       }
      //  Ejourney
      if (this.router.url.indexOf('ejourney') > 0) {
        this.tab = 6;
        this.logout = '/../../Auth/login';
      }
      /// reivsar this.logout en todos que fuincione bien o pasar a HREF  
    
}
    singout(){
      if(confirm('Esta seguro de cerrar sesion?')){
      console.log('log out ')
      this.authService.logout();
      console.log( this.authService.token)
    }
  }
  }

