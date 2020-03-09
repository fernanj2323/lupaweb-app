import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service'
import { Router, ActivatedRoute } from '@angular/router'; 
@Component({
  selector: 'app-breadcum-nav',
  templateUrl: './breadcum-nav.component.html',
  styleUrls: ['./breadcum-nav.component.css']
})
export class BreadcumNavComponent implements OnInit {
    public permisology : any; 
    public Troute: any; 
    public tab; 
    public managementId;
    public phase; 
  constructor(
    public AuthService:AuthService,
    public router:Router, 
    public route: ActivatedRoute, 
    public UserService: UserService 
    ) { } 

  ngOnInit() {
    const managementId = this.route.snapshot.params["id"]; 
    if (managementId == undefined){
      this.managementId = this.route.snapshot.params["managementId"];
    }else{ 
      this.managementId = managementId
    }
    this.consultMyRole();
    //console.log('rrse')
    this.consultRoute();
  }

  consultMyRole(){

    var id = localStorage.getItem("ID");
    this.UserService.getProfileByAuthId(id).subscribe(res=>{
      this.permisology = res[0];
      this.permisology = this.permisology.permisology.eservices; 
    //  console.log(this.permisology);
    })
  }

  consultRoute(){
  
    this.Troute  = this.route.snapshot.routeConfig.path; 
     console.log(this.Troute); 
   // rutas de startmanagement 
   //fase 1 y 2 
    if (this.Troute == 'eservices-management/start/1/:id/:edit'
     || this.Troute == 'eservices-management/start/1' 
     || this.Troute == 'eservices-management/start/1/:edit'
    || this.Troute == 'eservices-management/start/1/:id' ){

        console.log('phase 1')
        this.tab = 1; 
    
      }
      if (this.Troute == 'eservices-management/start/2/:id/:edit'  || this.Troute == 'eservices-management/start/2/:id' )
      {

        console.log('phase 2')
        this.tab = 2; 
   
    }else if(this.Troute == 'eservices-management/workpreparation/:n/:id/:sl'|| this.Troute == 'eservices-management/workpreparation/:n/:id' || this.Troute == 'eservices-management/workpreparation/:n/:id/:sl/:edit'  || this.Troute == 'eservices-management/workpreparation/:n/:id/:edit' ){
     
    this.tab = 3; 
      
  }else if (this.Troute == 'eservices-management/IRO/:sl/:id' || this.Troute == 'eservices-management/IRO/:sl/:id/:aprobator'){
    this.tab = 4; 

  }else if (this.Troute == 'eservices-management/JobBrief/:managementId' || this.Troute == 'eservices-management/JobBrief/:managementId/:viewOrEdit'
  ){
    this.tab = 5; 
  }
    
  else if ( this.Troute == 'eservices-management/closingPhase/:managementId' || this.Troute == 'eservices-management/closingPhase/:managementId/:viewOrEdit' ){
    this.tab = 6; 
    //alert('tab 6')
  }


  else if ( this.Troute == 'eservices-management/lections/:managementId' || this.Troute == 'eservices-management/lections/:managementId/:viewOrEdit'  ){
    this.tab = 7; 
  }


   console.log(this.tab);
  }



}
