import { Component, OnInit } from '@angular/core';
import  {  HomeCardService } from 'src/app/services/eservices/home-card.service';
import {  JpactivityService } from 'src/app/services/jpactivity/jpactivity.service';
import { Jpactivity } from 'src/app/models/jpactivity/jpactivity';
import { UserService } from 'src/app/services/users/user.service';
import { homeCard } from 'src/app/models/eservices/homeCard';
var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-eservices-home',
  templateUrl: './eservices-home.component.html',
  styleUrls: ['./eservices-home.component.css']
})
export class EservicesHomeComponent implements OnInit {
  public authId; 
  public color; 
  public cardType : any; 
  public card1
  public card2
  public card3
  public card35 
  public card4
  public card5
  public card51
  public card52
  public card53
  public card54
  public card55
  public card56 
  public card1Edit = 0; 
  public card2Edit = 0; 
  public card3Edit = 0; 

  public card4Edit = 0; 
  public card5Edit = 0; 
  public card51Edit = 0; 
  public card52Edit = 0; 
  public card53Edit = 0; 
  public card54Edit = 0; 
  public card55Edit = 0; 
  public card56Edit = 0; 

  public card1Id; 
  public card2Id; 
  public card3Id; 

  public card4Id; 
  public card5Id; 
  public card51Id; 
  public card52Id; 
  public card53Id; 
  public card54Id; 
  public card55Id; 
  public card56Id; 

  public card1Number; 
  public card2Number;
  public card3Number;

  public card4Number;
  public card5Number;
  public card51Number;
  public card52Number;
  public card53Number;
  public card54Number;
  public card55Number;
  public card56Number;


  public card1List; 
  public card2List; 
  public card3List; 
  public response; 
  public card4List; 
  public card5List; 
  public card51List; 
  public card52List; 
  public card53List; 
  public card54List; 
  public card55List; 
  public card56List; 
  public userDepartment; 
  public showColor1 = 0; 
  public showColor2 = 0; 
  public showColor3 = 0; 
  public showColor4 = 0;
  public showColor5= 0; 
  public showColor51= 0;  
  public showColor52= 0; 
  public showColor53= 0; 
  public showColor54= 0; 
  public showColor55= 0; 


public showCardCT = false; 
public showCardSL = false; 
public showCardFI = false; 
public showCardWT = false; 
public showCardWL = false; 


  constructor(
    public HomeCardService:HomeCardService,  
    public JpactivityService:JpactivityService, 
    public UserService:  UserService 
    ) { }

  ngOnInit() {
    this.materializecss();
    this.authId = localStorage.getItem("ID");

    this.consultUserDepartment();
    this.consultCard();
    //this.consultMyLine()
  }


  consultUserDepartment(){
    this.UserService.getProfileByAuthId(this.authId).subscribe
    (res=>{
      console.log(res)
      if (res[0].department == 'Comercial'){
        console.log('comercial user');
        this.userDepartment = '2';

        // que tarjetas mostramos segun linea de servicio 
        this.showCardCT = true; 
        this.showCardSL = true; 
        this.showCardFI = true; 
        this.showCardWT = true; 
        this.showCardWL = true; 

     
      }

      if (res[0].department == 'Operaciones'){
        console.log('Operaciones user');
        this.userDepartment = '1';

        if (res[0].serviceLine.operations.wt == true){
          this.showCardWT = true; 
        }

        if (res[0].serviceLine.operations.wl == true){
          this.showCardWL = true; 
        }
        if (res[0].serviceLine.operations.fi == true){
          this.showCardFI = true; 
        }
        if (res[0].serviceLine.operations.sl == true){
          this.showCardSL = true; 
        }
        if (res[0].serviceLine.operations.ct == true){
          this.showCardCT = true; 
          console.log('Operaciones user');
        }




      }
      this.findMangement();
     

    });
  }

  findMangement(){


    //comercial 
    if(this.userDepartment == '2'){
      //buscar todos 
  this.JpactivityService.getJpactivitys().subscribe
  (res=>{
   this.JpactivityService.Jpactivitys = res as Jpactivity[];
   //console.log(this.JpactivityService.Jpactivitys);
  }) 

  //card 1
  //buscar actividades criticas  
  this.JpactivityService.getManagementByCriticidad('1').subscribe
  (res=>{
 
     this.card1List = res as any;
     this.card1Number =  this.card1List.length; 
     //console.log(this.card1Number);
  })

  //card 2 
  //buscar actividades regulares 
   this.JpactivityService.getManagementByCriticidad('0').subscribe
   (res=>{
    /// console.log(res);
    this.card2List = res as any;
    this.card2Number = this.card2List.length; 
   })

   //card3
   //actividades en proceso 
   this.JpactivityService.getManagementByStatus('2').subscribe
   (res=>{
    this.card3List = res as any;
    this.card3Number = this.card3List.length; 
   })

   this.JpactivityService.getManagementByStatus('1').subscribe
   (res=>{

    this.card56List = res as any;
    this.card56Number = this.card56List.length; 
    // console.log('****************************')
    // console.log(res); 
    // console.log('****************************')
   });


   //card4 
   //actividades finalizadas
   this.JpactivityService.getManagementByStatus('3').subscribe
   (res=>{
    this.card4List = res as any;
    this.card4Number = this.card4List.length; 
   });



   //card 5
   //por linea de servicio 

   //card 51 
   //well testing 
   this.JpactivityService.getManagementBySL('wt').subscribe
   (res=>{
    this.card51List = res as any;
     this.card51Number = this.card51List.length;
   });

   //card 52
   //well login 
  this.JpactivityService.getManagementBySL('wl').subscribe
   (res=>{
    this.card52List = res as any;
     this.card52Number = this.card52List.length;
   });


   //card 53 
   //slick line 

   this.JpactivityService.getManagementBySL('sl').subscribe
   (res=>{
    this.card53List = res as any;
     this.card53Number = this.card53List.length;
   });
   //card 54
   //coiled Tubing 
   this.JpactivityService.getManagementBySL('ct').subscribe
   (res=>{
    this.card54List = res as any;
     this.card54Number = this.card54List.length;
   });
   //card 55
   // frente de inyeccion 
   this.JpactivityService.getManagementBySL('fi').subscribe
   (res=>{
    this.card55List = res as any;
     this.card55Number = this.card55List.length;
   });
 }else if (this.userDepartment == '1'){   //operaciones
       //buscar todos 
  this.JpactivityService.getJpactivitys().subscribe
  (res=>{
   this.JpactivityService.Jpactivitys = res as Jpactivity[];
   //console.log(this.JpactivityService.Jpactivitys);
  }) 

  //card 1
  //buscar actividades criticas  
  this.JpactivityService.getManagementByCriticidad('1').subscribe
  (res=>{
 
     this.card1List = res as any;
     this.card1Number =  this.card1List.length; 
     //console.log(this.card1Number);
  })

  //card 2 
  //buscar actividades regulares 
   this.JpactivityService.getManagementByCriticidad('0').subscribe
   (res=>{
    /// console.log(res);
    this.card2List = res as any;
    this.card2Number = this.card2List.length; 
   })

   //card3
   //actividades en proceso   

   this.JpactivityService.getTendered().subscribe
   (res=>{
    this.card3List = res as any;
    this.card3Number = this.card3List.length; 
   })



  //  this.JpactivityService.getManagementByStatus('1').subscribe
  //  (res=>{

  //   this.card56List = res as any;
  //   this.card56Number = this.card56List.length; 
  //   // console.log('****************************')
  //   // console.log(res); 
  //   // console.log('****************************')
  //  });


   //card4 
   //actividades finalizadas
   this.JpactivityService.getFinished().subscribe
   (res=>{
    this.card4List = res as any;
    this.card4Number = this.card4List.length; 
   });



   //card 5
   //por linea de servicio 

   //card 51 
   //well testing 
   this.JpactivityService.getManagementBySL('wt').subscribe
   (res=>{
    this.card51List = res as any;
     this.card51Number = this.card51List.length;
   });

   //card 52
   //well login 
  this.JpactivityService.getManagementBySL('wl').subscribe
   (res=>{
    this.card52List = res as any;
     this.card52Number = this.card52List.length;
   });


   //card 53 
   //slick line 

   this.JpactivityService.getManagementBySL('sl').subscribe
   (res=>{
    this.card53List = res as any;
     this.card53Number = this.card53List.length;
   });
   //card 54
   //coiled Tubing 
   this.JpactivityService.getManagementBySL('ct').subscribe
   (res=>{
    this.card54List = res as any;
     this.card54Number = this.card54List.length;
   });
   //card 55
   // frente de inyeccion 
   this.JpactivityService.getManagementBySL('fi').subscribe
   (res=>{
    this.card55List = res as any;
     this.card55Number = this.card55List.length;
   });
 }


    }
  


 showColor(card){
 //  console.log(card)
  // if (card == 1){ 
  //   this.showColor1 = 1; 
  // }
  // if (card == 0.1){
  //   this.showColor1 = 0; 
  // }

  // if (card == 2){
  //   this.showColor2 = 1; 
  // }
  // if (card == 0.2){
  //   this.showColor2 = 0; 
  // }

  // if (card == 3){
  //   this.showColor3 = 1; 
  // }
  // if (card == 0.3){
  //   this.showColor3 = 0; 
  // }

  // if (card == 4){
  //   this.showColor4 = 1; 
  // }
  // if (card == 0.4){
  //   this.showColor4 = 0; 
  // }

  // if (card == 5){
  //   this.showColor5 = 1; 
  // }
  // if (card == 0.5){
  //   this.showColor5 = 0; 
  // }

  // if (card == 51){
  //   this.showColor51 = 1; 
  // }
  // if (card == 0.51){
  //   this.showColor51 = 0; 
  // }

  // if (card == 52){
  //   this.showColor52 = 1; 
  // }
  // if (card == 0.52){
  //   this.showColor52 = 0; 
  // }


  // if (card == 53){
  //   this.showColor53 = 1; 
  // }
  // if (card == 0.53){
  //   this.showColor53 = 0; 
  // }


  // if (card == 54){
  //   this.showColor54 = 1; 
  // }
  // if (card == 0.54){
  //   this.showColor54 = 0; 
  // }


  // if (card == 55){
  //   this.showColor55 = 1; 
  // }
  // if (card == 0.55){
  //   this.showColor55 = 0; 
  // }
 }


// -------------------
//  CARDS  
// ------------------

 
consultCard(){
  //console.log('consultCard');


  for (var i = 0; i < 57;  i++) {

    
    if (i == 6) {
      i = 51; 
    }

    this.HomeCardService.getCardByUserAndType(this.authId, i).subscribe(
      res=>{ 
   //  console.log(res, i );
    //  if (i == 35) {
    //    i = 57; 
    //  }
    this.HomeCardService.selectedHomeCard = res[0] as homeCard; 
        if (  this.HomeCardService.selectedHomeCard.cardType == 1){
          this.card1Edit = 1; 
          this.card1Id = res[0]._id;
          this.card1 = res[0].color; 
        }

        if (  this.HomeCardService.selectedHomeCard.cardType == 2){
          this.card2Edit = 1; 
          this.card2Id = res[0]._id;
          this.card2 = res[0].color; 
        }

        if (  this.HomeCardService.selectedHomeCard.cardType == 3){
          this.card3Edit = 1; 
          this.card3Id = res[0]._id;
          this.card3  = res[0].color; 
        }
     
        if (  this.HomeCardService.selectedHomeCard.cardType == 4){
          this.card4Edit = 1; 
          this.card4Id = res[0]._id;
          this.card4  = res[0].color; 
        }

        if (  this.HomeCardService.selectedHomeCard.cardType == 5){
          this.card5Edit = 1;
          this.card5Id = res[0]._id; 
          this.card5  = res[0].color; 
        }

        if (this.HomeCardService.selectedHomeCard.cardType == 51){
          this.card51Edit = 1; 
          this.card51Id = res[0]._id;
          this.card51  = res[0].color; 
        }

        if (this.HomeCardService.selectedHomeCard.cardType == 52){
          this.card52Edit = 1; 
          this.card52Id = res[0]._id;
          this.card52  = res[0].color; 
        }

        if (this.HomeCardService.selectedHomeCard.cardType == 53){
          this.card53Edit = 1; 
          this.card53Id = res[0]._id;
          this.card53  = res[0].color; 
        }

        if (this.HomeCardService.selectedHomeCard.cardType == 54){
          this.card54Edit = 1; 
          this.card54Id = res[0]._id;
          this.card54  = res[0].color; 
        }

        if (this.HomeCardService.selectedHomeCard.cardType == 55){
         // console.log('response 5')
          this.card55Edit = 1; 
          this.card55Id = res[0]._id;
          this.card55  = res[0].color; 
        }


        // comercial pendientes de licitacion 
        // if ( response[0].cardType == 56){
        //   this.card56Edit = 1; 
        //   // i = 57; 
        //  // console.log(i);
        //   this.card56Id = res[0]._id;
        //   this.card35  = res[0].color; 
        // }
      //  console.log('response')
      //  console.log(this.HomeCardService.selectedHomeCard)

      })

  }
}



  
  materializecss(){
    
    $('.dropdown-trigger').dropdown();


  $(document).ready(function(){
    $('.modal').modal();
  });
         
  $(document).ready(function(){
    $('.carousel').carousel();
  }); 
  
  $(document).ready(function(){
    $('.tap-target').tapTarget();
  });

  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });
  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });
        
  }



}
