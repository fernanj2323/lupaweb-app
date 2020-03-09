import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { iro } from 'src/app/models/eservices/IRO/IRO';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { UserService } from 'src/app/services/users/user.service';
import { IroService} from 'src/app/services/eservices/iro.service'
import { JpactivityService } from 'src/app/services/jpactivity/jpactivity.service';
var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 



@Component({
  selector: 'app-iro-ct',
  templateUrl: './iro-ct.component.html',
  styleUrls: ['./iro-ct.component.css']
})
export class IroCTComponent implements OnInit {

  public managementId: string;
  public changueQuestions: string; 
  public n: number = 0; 
  public aprobationLevel : number;   

  public aprobatorLevel1:string;
  public aprobatorLevel2:string; 
  public aprobatorLevel3:string; 
  public fullname:string; 
  public aprobationMode:string = '0';
  //variable donde consultamos si hay un aprobador o no 
  public aprobationVar:string='0'; 
  
  //dependencias de notificaciones 
  public notificationData:({
    'creator': string, 
    'creatorId':string,
    'responsable': string, 
    'responsableId': string,
    'title':string, 
    'longTitle':string,
    'description':string, 
    'read':number, 
    'action':string,  
    'color': string, 
    'form': string,
    'managementId': any, 
    /// 'created':string, 
    // 'modified':string,
    });
    public PublicN; 
    public continueOrNot = false; 
    public continueOrYes = true; 
    public selectCase:any; 
    public showServiceLine:any='0' ; 
    public creatorSL:any; 
    public showIRO = false; 
    public maildata:({ 
      'to' : string,//email de quien recibe
      'toName':string, //nombre de quien recibe
      'from': string, //nombre de quien envia 
       'type': string, 
       'module': string, //modulo de donde se emite el mensaje 
       'subject': string, //titulo del correo 
       'description': string, //descripcion de la actividad asignada 
       
    });

    public MannagementserviceLines: any; 
    public createOrEdit:string ='create'; 
    public iroId:string;  
  constructor(
    public router:Router,
    public route: ActivatedRoute,
    public emailsService: EmailsService,
    public UserService: UserService, 
    public NotificationsService: NotificationsService,  
    public IroService:IroService, 
    public JpactivityService: JpactivityService
  ) { }

  ngOnInit() {
    // var access = localStorage.getItem("ACCESS_TOKEN");
    // console.log('access',access);
    this.managementId = this.route.snapshot.params["id"];
   
    this.aprobationVar = this.route.snapshot.params["aprobator"];
    this.validationAprobator();
    this.changueBread(0);
    this.materializecss();
    this.consultServiceLine();
    //this.consultEnrutedSL(); 
  }

  
  back(){
    window.history.back();
  }


  consultServiceLine(){
      this.JpactivityService.getJpactivity(this.managementId).subscribe
      (res=>{
        this.JpactivityService.selectedJpactivity = res as any; 
     // console.log(this.jpactivityService.selectedJpactivity )
     //console.log(res)
     //alert('estop')
      //capturar las lineas de servicio del management 
       this.MannagementserviceLines = ({
        wt :  this.JpactivityService.selectedJpactivity.wt,
        sl :  this.JpactivityService.selectedJpactivity.sl,
        fi :  this.JpactivityService.selectedJpactivity.fi,
        ct :  this.JpactivityService.selectedJpactivity.ct,
        wl :  this.JpactivityService.selectedJpactivity.wl,
       })


       this.findOptionsForSelect(); 
        // var jp = res as any; 
        // if (jp.ct == false){
        //   alert('Actividad sin Indice de Riesgo Operacional')
        //   this.back()
        // }
      })
  }

consultEnrutedSL(){ 
  //en caso de que queramos activar el IRO desde la URL 
  const slEnruted = this.route.snapshot.params["sl"];
  if(slEnruted == 'wl'){
    this.captureServiceSelected('wl')
  }
  if(slEnruted == 'CT'){
    this.captureServiceSelected('ct')
  }
  if(slEnruted == 'ct'){
    this.captureServiceSelected('ct')
  }
  if(slEnruted == 'wt'){
    this.captureServiceSelected('wt')
  }
  if(slEnruted == 'fi'){
    this.captureServiceSelected('fi')
  }
  if(slEnruted == 'sl'){
    this.captureServiceSelected('sl')
  }

}
  
  //capturar el cambio de select para luego mostar las preguntas de esa linea 
  captureServiceSelected(sl){
  
    if (sl == 'wl'){
     
      this.showServiceLine = 'wl';
      this.creatorSL = 'wl'; 
      this.showIRO = true ;

  //   console.log(this.showServiceLine)
    
    }
    if (sl == 'ct'){
     
      this.showServiceLine = 'ct';
      this.creatorSL = 'ct'; 
      alert(this.showServiceLine)
      this.showIRO = true ;
     // alert(this.showIRO)
  //    console.log(this.showServiceLine)
    }
    if (sl == 'fi'){
     
      this.showServiceLine = 'fi';
      this.creatorSL = 'fi'; 
      this.showIRO = true ;

  //    console.log(this.showServiceLine)
    }
    if (sl == 'wt'){
     
      this.showServiceLine = 'wt';
      this.creatorSL = 'wt'; 
      this.showIRO = true ;

  //    console.log(this.showServiceLine)
    }
    if (sl == 'sl'){
        alert('Actividad sin Indice de Riesgo Operacional')
       this.back()


      // this.showServiceLine = 'sl';
      // this.creatorSL = 'sl'; 

  //    console.log(this.showServiceLine)
    }

 




    //ahora buscamos si hay algun IRO  con este management id, la linea seleccionada.
    this.consultIfExist(this.creatorSL);
  
  }  



  

  materializecss(){
    $(document).ready(function(){
       $('.datepicker').datepicker({
         format: 'dd/mm/yyyy',
       });
     });
   
   
  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });
      
  $(document).ready(function(){
    $('.modal').modal();
  });
     //  console.log('modal')
   
   }


  consultIfExist(sl?){

   // alert('1 vialbe') 
    this.IroService.selectedIRO = [] as any ; 
    this.IroService.getIroByManagementIDandSL(this.managementId, sl).subscribe
    (res=>{
    //  alert('vialbe')
      console.log(res[0])
      if(res[0]){
                this.IroService.selectedIRO = res[0] as any;
                this.createOrEdit = 'edit';
                this.iroId = res[0]._id;
                this.aprobationLevel = res[0].aprobationLevel;
                if (res[0].status == 1){
                           console.log('aprobado')
                           if (this.aprobationVar == '0'){
                            //            //si queremos hacer que despues de aprobado el usuario basico no pueda seguir editando nada 
                            //            //falta mostrar una vista donde no se pueda editar el selector para ese tipo de usuario
                            //           // var url = ('./eservices-management/IRO/CT/'+ this.managementId +'/1');
                            //           // location.assign(url);
                            }
                          }
      }else{ 
        this.IroService.selectedIRO = [] as any ; 
       }
    })



    // this.IroService.getIroByManagementID(this.managementId).subscribe
    // (res=>{
    // console.log(res[0])

    // // console.log(this.IroService.selectedIRO.locationInspectionO);
    //       if(res[0]){
    //         this.IroService.selectedIRO = res[0] as any;
    //         this.iroId = res[0]._id;
    //         this.createOrEdit = 'edit';
    //         this.aprobationLevel = res[0].aprobationLevel;
    //         if (res[0].status == 1){
    //           console.log('aprobado')
    //          if (this.aprobationVar == '0'){
    //            //si queremos hacer que despues de aprobado el usuario basico no pueda seguir editando nada 
    //            //falta mostrar una vista donde no se pueda editar el selector para ese tipo de usuario
    //           // var url = ('./eservices-management/IRO/CT/'+ this.managementId +'/1');
    //           // location.assign(url);
    //          }
             
    //         }
    //       }

         
    //     })
  }

  //funcion para validar si el usuario viene como aprobador 
  validationAprobator(){
    // console.log(this.aprobationVar)
    if (this.aprobationVar == '1'){
     //  console.log('usuario aprobador')
      var authId = localStorage.getItem("ID");
      // console.log(authId,'usuario aprobador')
      this.UserService.getProfileByAuthId(authId).subscribe
      (res=>{
     //   console.log('response user',res[0]);
        if (res[0].permisology.eservices.IRO.aprobation == true){
      //    console.log('el usuario si tiene permisos de aprobacion  ')
          this.aprobationMode='1';
       //   console.log('aprobation mode 1', this.aprobationMode)
        }
      
      });

    }else{
      if (this.aprobationVar == '0.1'){ //solo ver, no editar ni aprobar 
        this.aprobationMode='0.1';
      } else {
        if (this.aprobationVar == '0'){  //editor
          this.aprobationMode='0';
        } 
      }
 
      // this.aprobationMode='0';
    }
  //  console.log('aprobation mode 2', this.aprobationMode)
  }





  // funcion para cambiar preguntas dentro del componente a traves del breadcum 

  changueBread(n){
   this.PublicN = n;
   //alert(this.PublicN);
   if (n == 0){
    this.changueQuestions = '0';
    this.continueOrNot = false;
    this.continueOrYes = true;
   }


   if (n == 1){
    this.changueQuestions = '1';
    this.continueOrNot = false;
    this.continueOrYes = true;
   }

   if (n == 2){
    this.changueQuestions = '2';
    this.continueOrNot = false;
    this.continueOrYes = true;
   }

   if (n == 3){
    this.changueQuestions = '3';
    this.continueOrNot = false;
    this.continueOrYes = true;
   }

   if (n == 4){
    this.changueQuestions = '4';
   //mostrar boton de finalizar
    this.continueOrNot = true;
    this.continueOrYes = false;
   }

  }


  //guardamos y continuamos sin notificar
  continue(form:NgForm){
    form.value.managementId  = this.managementId; 
    this.consultIfExist(this.showServiceLine)

  }

  //save IRO guardamos y notificamos
  saveIRO(form:NgForm, changueQuestions?){
  // alert(changueQuestions)
    form.value.managementId  = this.managementId; 
   // console.log('this.IroService.selectedIRO:',this.IroService.selectedIRO)
    var oldIro = this.IroService.selectedIRO;
    form.value.sl = this.showServiceLine;
   // alert(form.value.sl)
      if( changueQuestions == 0){
      // nivel 1
        if (form.value.locationInspectionT == undefined){
          // alert('indefinido')
          //si esta guardado como false o undefined  
           if (oldIro.locationInspectionT != true){
           //  alert('no hay guardado como true')
             form.value.locationInspectionT = false; 
             this.aprobationLevel = 1;
           //  alert('locationInspectionT')
   
           }else{ 
             // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
             form.value.locationInspectionT = true; 
           }
         }

         //contractorsT
         if (form.value.contractorsT == undefined){
          // alert('indefinido')
           if (oldIro.contractorsT != true){
           //  alert('no hay guardado como true')
             form.value.contractorsT = false; 
             this.aprobationLevel = 1;
         //    alert('aprobationLevel')
            }else{ 
              // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
              form.value.locationInspectionT = true; 
            }
         }
// nivel 2 
        // jobObjT
      if (form.value.jobObjT == undefined){
        // alert('indefinido')
         if (oldIro.jobObjT != true){
         //  alert('no hay guardado como true')
           form.value.jobObjT = false; 
           this.aprobationLevel = 2;
         //  alert('jobObjT')
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.jobObjT = true; 
          }
       }
        //workProgramT 
       if (form.value.workProgramT == undefined){
        // alert('indefinido')
         if (oldIro.workProgramT != true){
         //  alert('no hay guardado como true')
           form.value.workProgramT = false; 
           this.aprobationLevel = 2;
         //  alert('workProgramT')
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.workProgramT = true; 
          }
       }
        //workProgram2T 
       if (form.value.workProgram2T == undefined){
        // alert('indefinido')
         if (oldIro.workProgram2T != true){
         //  alert('no hay guardado como true')
           form.value.workProgram2T = false; 
           this.aprobationLevel = 2;
        //   alert('workProgram2T')
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.workProgram2T = true; 
          }
       }

     
      }else if( changueQuestions == 1){ 

       //fishT
       if (form.value.fishT == undefined){
        // alert('indefinido')
         if (oldIro.fishT != true){
         //  alert('no hay guardado como true')
           form.value.fishT = false; 
           
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.fishT = true; 
            this.aprobationLevel = 2;
        //    alert('fishT')
          }
       }
      //cementationT 
      if (form.value.cementationT == undefined){
        // alert('indefinido')
         if (oldIro.cementationT != true){
         //  alert('no hay guardado como true')
           form.value.cementationT = false; 
         
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.cementationT = true; 
            this.aprobationLevel = 2;
         //   alert('cementationT')
          }
       } 

       //corrosiveT 
       if (form.value.corrosiveT == undefined){
        // alert('indefinido')
         if (oldIro.corrosiveT != true){
         //  alert('no hay guardado como true')
           form.value.corrosiveT = false; 
         
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.corrosiveT = true; 
            this.aprobationLevel = 2;
        //    alert('corrosiveT')
          }
       }


            //preparationT 
      if (form.value.preparationT == undefined){
            // alert('indefinido')
             if (oldIro.preparationT != true){
             //  alert('no hay guardado como true')
               form.value.preparationT = false; 
               this.aprobationLevel = 3;
          //     alert('preparationT')
            
             
              }else{ 
                // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
                form.value.preparationT = true; 
           
               
              }
      }


    }else if( changueQuestions == 2){ 
    

      //proceduresT
      if (form.value.proceduresT == undefined){
        // alert('indefinido')
         if (oldIro.proceduresT != true){
         //  alert('no hay guardado como true')
           form.value.proceduresT = false; 
           this.aprobationLevel = 1;
        //   alert('proceduresT')
         
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.proceduresT = true; 
           
          }
       }
     //rigUpT 
     if (form.value.rigUpT == undefined){
      // alert('indefinido')
       if (oldIro.rigUpT != true){
       //  alert('no hay guardado como true')
         form.value.rigUpT = false; 
         this.aprobationLevel = 1;
      ///   alert('rigUpT')
       
        }else{ 
          // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
          form.value.rigUpT = true; 
         
        }
     }

 //2    //similarWorkT 
      if (form.value.similarWorkT == undefined){
            // alert('indefinido')
             if (oldIro.similarWorkT != true){
             //  alert('no hay guardado como true')
               form.value.similarWorkT = false; 
               this.aprobationLevel = 2;
              }else{ 
                // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
                form.value.similarWorkT = true; 
              
         //       alert('similarWorkT')
              }
     }
         
          //teamSizeT 
    if (form.value.teamSizeT == undefined){
            // alert('indefinido')
             if (oldIro.teamSizeT != true){
             //  alert('no hay guardado como true')
               form.value.teamSizeT = false; 
               this.aprobationLevel = 2;
           //    alert('teamSizeT')
             
              }else{ 
                // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
                form.value.teamSizeT = true; 
               
              }
    }


          //operationRespT
    if (form.value.operationRespT == undefined){
            // alert('indefinido')
             if (oldIro.operationRespT != true){
             //  alert('no hay guardado como true')
               form.value.operationRespT = false; 
               this.aprobationLevel = 2;
           //    alert('operationRespT')
             
              }else{ 
                // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
                form.value.operationRespT = true; 
               
              }
    }


  }else if( changueQuestions == 3){ 
    if (form.value.mapreActualizationT == undefined){
      // alert('indefinido')
       if (oldIro.mapreActualizationT != true){
       //  alert('no hay guardado como true')
         form.value.mapreActualizationT = false; 
         this.aprobationLevel = 1;
    //     alert('mapreActualizationT')
        }else{ 
          // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
          form.value.mapreActualizationT   = true; 
        }
     }
    //operativeLimitsT
    if (form.value.operativeLimitsT == undefined){
      // alert('indefinido')
       if (oldIro.operativeLimitsT != true){
       //  alert('no hay guardado como true')
         form.value.operativeLimitsT = false; 
         this.aprobationLevel = 1;
      //   alert('operativeLimitsT')
       
        }else{ 
          // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
          form.value.operativeLimitsT = true; 
         
        }
     }

   
                //pressureEquipentT
    if (form.value.pressureEquipentT == undefined){
      // alert('indefinido')
        if (oldIro.pressureEquipentT != true){
         //  alert('no hay guardado como true')
          form.value.pressureEquipentT = false; 
            this.aprobationLevel = 2;
     //      alert('pressureEquipentT')
                   
         }else{ 
                      // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
                      form.value.pressureEquipentT = true; 
                     
           }
     }

         //  calibrationVerificationT 
         if (form.value.calibrationVerificationT == undefined){
          // alert('indefinido')
           if (oldIro.calibrationVerificationT != true){
           //  alert('no hay guardado como true')
             form.value.calibrationVerificationT = false; 
             this.aprobationLevel = 2;
         //    alert('calibrationVerificationT')
           
            }else{ 
              // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
              form.value.calibrationVerificationT = true; 
             
            }
         }

       //  tubingT 
       if (form.value.tubingT == undefined){
        // alert('indefinido')
         if (oldIro.tubingT != true){
         //  alert('no hay guardado como true')
           form.value.tubingT = false; 
        
         
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.tubingT = true; 
            this.aprobationLevel = 2;
       //     alert('tubingT')
           
          }
       }

//3      //loginSystemT 
      if (form.value.loginSystemT == undefined){
        // alert('indefinido')
         if (oldIro.loginSystemT != true){
         //  alert('no hay guardado como true')
           form.value.loginSystemT = false; 
           this.aprobationLevel = 3;
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.loginSystemT = true; 
       
          }
       }

      }else if( changueQuestions == 4){ 
//1

 // supRespT
        if (form.value.critReqT == undefined){
          // alert('indefinido')
           if (oldIro.critReqT != true){
           //  alert('no hay guardado como true')
             form.value.critReqT = false; 
             this.aprobationLevel = 1;
          //   alert('critReqT')
            }else{ 
              // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
              form.value.critReqT = true; 
            }
         }

      // supRespT
      if (form.value.supRespT == undefined){
        // alert('indefinido')
         if (oldIro.supRespT != true){
         //  alert('no hay guardado como true')
           form.value.supRespT = false; 
           this.aprobationLevel = 1;
         //  alert('supRespT')
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.supRespT = true; 
          }
       }

       // nptMinT
       if (form.value.nptMinT == undefined){
        // alert('indefinido')
         if (oldIro.nptMinT != true){
         //  alert('no hay guardado como true')
           form.value.nptMinT = false; 
           this.aprobationLevel = 1;
        //   alert('nptMinT')
          }else{ 
            // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
            form.value.nptMinT = true; 
          }
       }


               //goldenRulesT 
//alert(form.value.goldenRulesT)
               if (form.value.goldenRulesT == undefined){
                // alert('indefinido')
                 if (oldIro.goldenRulesT != true){
                 //  alert('no hay guardado como true')
                   form.value.goldenRulesT = false; 
                   this.aprobationLevel = 2;
              //     alert('tubingT')
                
                 
                  }else{ 
                    // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
                    form.value.goldenRulesT = true; 
               
                   
                  }
               }


                    
               //wellLocationT 
               if (form.value.wellLocationT == undefined){
                // alert('indefinido')
                 if (oldIro.wellLocationT != true){
                 //  alert('no hay guardado como true')
                   form.value.wellLocationT = false; 
                   this.aprobationLevel = 3;
              //     alert('wellLocationT')
                
                 
                  }else{ 
                    // si esta guardado cmo true y la respuesta es indefinida mantener como true entonces para el calculo 
                    form.value.wellLocationT = true; 
               
                   
                  }
               }
    


      }


if (this.aprobationLevel == undefined){
  form.value.aprobationLevel = oldIro.aprobationLevel
}else{ 
  form.value.aprobationLevel = this.aprobationLevel; 
}
   
   // alert('nivel de aprobacion por ahora')
   // alert(this.aprobationLevel)

 
    //alert('nivel viejo nivel de aprobacion')
    //alert(oldIro.aprobationLevel)

    //console.log('this.aprobationLevel', this.aprobationLevel);

   if( this.createOrEdit == 'create'){
     form.value.status = 0;
     form.value.creatorId = localStorage.getItem("ID");
     
    this.IroService.postIro(form.value).subscribe
    (res=>{
    //  console.log(res)
      M.toast({html: 'Guardado!'}) 
      this.createOrEdit = 'edit';
      this.consultIfExist()
   

    });
  

   }else{
   // console.log(form.value);

    // capturamos quien aprueba, si aprobaron 
    if (form.value.status == '1'){  
      form.value.aprobatorName =  localStorage.getItem("FIRSTNAME") +  ' ' + localStorage.getItem("LASTNAME");
      form.value.aprobatorId = localStorage.getItem("ID");
    } 


    this.IroService.putIro(this.iroId, form.value).subscribe
    (res=>{
    //  console.log(res);
      M.toast({html: 'Editado!'})  
      this.createOrEdit = 'edit';

     // alert(form.value.status);

      if (this.continueOrNot == true){
     //   alert(this.continueOrNot);
      //  alert('Guardado, Recibirá una notificación cuando su Indice de Riesgo Operacional (IRO) sea aprobado ')
        //notificamos al aprobador
       // this.consultIfExist();
        this.consultAprobator();
      }else{ 
        this.PublicN = this.PublicN + 1 ;
      //  alert(this.PublicN);
        this.changueBread(this.PublicN);
      }
      
      if (form.value.status == '1'){  //si fue aprobada 
        // notificamos al responsable
       this.notificationToResponsable(form.value)
      }
    })
    

   }
}



//notificamos al creador del IRO
notificationToResponsable(form){
// console.log('id del creador en la tabla auth',form.creatorId)
  this.UserService.getProfileByAuthId(form.creatorId).subscribe
  (res=>{
    console.log('perfil del responsable', res)
    this.UserService.selectedProfile = res[0] as any;
    this.fullname =  this.UserService.selectedProfile.firstName +  ' ' + this.UserService.selectedProfile.lastName;
    
    this.notificationData = ({
      'creator': this.fullname , 
      'creatorId': localStorage.getItem("ID"),
      'responsable': this.fullname, 
      'responsableId': this.UserService.selectedProfile.authId,
      'form': this.fullname,
      'title': 'E-services - Su IRO ha sido revisado ',
      'longTitle':'Indice de Riesgo Operacional ha sido revisado, continue para verificar el estado ',
      'color':'yellow accent-4',  
      'description':'Su IRO ha sido revisado ',
      'read': 0,
      'action':  "eservices-management/IRO/CT/"+ this.managementId + '/0',
      'managementId': this.managementId + ' '
    });

    this.maildata = ({
      'to': this.UserService.selectedProfile.email,
      'toName': this.fullname + '', 
      'from': this.fullname + '', 
      'type':'accion',
      'module': 'E-Services',
      'subject':' E-services - Su Indice de Riesgo Operacional ha sido revisado ',
      'description': "eservices-management/IRO/CT/"+ this.managementId + '/0',
     }); 



     this.NotificationsService.createNotification(this.notificationData).subscribe
     (res => {
       console.log(res);
       if (res == 202){
         console.log('no sera notificado ya existe notificacion previa');
       } else { 
        this.emailNotification(this.maildata)
       }
     })


  })
}


  consultAprobator (){

    this.IroService.getIroByManagementID(this.managementId).subscribe
    (res=>{
    console.log(res[0])

    // console.log(this.IroService.selectedIRO.locationInspectionO);
          if(res[0]){
            this.IroService.selectedIRO = res[0] as any;
            this.iroId = res[0]._id;
            this.createOrEdit = 'edit';
            this.aprobationLevel = res[0].aprobationLevel;
            if (res[0].status == 1){
          //    console.log('aprobado')
             if (this.aprobationVar == '0'){
               //si queremos hacer que despues de aprobado el usuario basico no pueda seguir editando nada 
               //falta mostrar una vista donde no se pueda editar el selector para ese tipo de usuario
              // var url = ('./eservices-management/IRO/CT/'+ this.managementId +'/1');
              // location.assign(url);
             }
             
            }
          }






  //bloqude de configuracion de aprobador 
  //por ahora se configurara hardcodeado 
  // vamos a utilizar el Id de profiles 
  
  //fernando pinango 
  this.aprobatorLevel1 = '5de6ac230e122c333807b2c9'; 

  //fernando Pinango 
  this.aprobatorLevel2 = '5de6ac230e122c333807b2c9'; 
   
  //fernando Pinango
  this.aprobatorLevel3 = '5de6ac230e122c333807b2c9';
  

  //alert(this.aprobationLevel);

  if  (this.aprobationLevel == 1){
  this.createNotification(this.aprobatorLevel1)
  alert('lvl1')
  }

  if  (this.aprobationLevel == 2){
    this.createNotification(this.aprobatorLevel2)
    alert('lvl2')
  }

  if  (this.aprobationLevel == 3){
    this.createNotification(this.aprobatorLevel3)
    alert('lvl3')
  }



         
        })





   




  }


  createNotification(responsableId:string){


    this.UserService.getProfileById(responsableId).subscribe(
      res=>{
          this.UserService.selectedProfile = res as any;
          this.fullname =  this.UserService.selectedProfile.firstName +  ' ' + this.UserService.selectedProfile.lastName;
          console.log(this.fullname);




          this.notificationData = ({
            'creator': this.fullname , 
            'creatorId': localStorage.getItem("ID"),
            'responsable': this.fullname, 
            'responsableId': this.UserService.selectedProfile.authId,
            'form': localStorage.getItem("ID"),
            'title': 'E-services - Aprobación de IRO',
            'longTitle':'Indice de Riesgo Operacional a espera de aprobación;',
            'color':'yellow accent-4',  
            'description':'Indice de IRO a espera de aprobación ',
            'read': 0,
            'action':  "eservices-management/IRO/CT/"+ this.managementId + '/1',
            'managementId': this.managementId
          });



          this.maildata = ({
            'to': this.UserService.selectedProfile.email,
            'toName': this.fullname + '', 
            'from': this.fullname + '', 
            'type':'accion',
            'module': 'E-Services',
            'subject':' E-services - Solicitud de Aprobación de Indice de Riesgo Operacional',
            'description': "eservices-management/IRO/CT/"+ this.managementId + '/1',
           }); 



           this.NotificationsService.createNotification(this.notificationData).subscribe
           (res => {
             console.log(res);
             if (res == 202){
               console.log('no sera notificado ya existe notificacion previa');
             } else { 
              this.emailNotification(this.maildata)
             }
           })
      });

     

  }



  emailNotification(maildata){


    this.emailsService.postMail(this.maildata).subscribe
    (res =>{
       console.log(res);         
    });
    
  }


    //consultar cuales opciones vamos a mostrar en el selector
    findOptionsForSelect(){
      if ( 
        this.MannagementserviceLines.wt == false && 
        this.MannagementserviceLines.fi == false && 
        this.MannagementserviceLines.ct == false && 
        this.MannagementserviceLines.sl == false && 
        this.MannagementserviceLines.wl == true      
        ){
            this.selectCase = '1'; 
       //     console.log('caso 1')
        }
  
        if ( 
          this.MannagementserviceLines.wt == false && 
          this.MannagementserviceLines.fi == false && 
          this.MannagementserviceLines.ct == false && 
          this.MannagementserviceLines.sl == true && 
          this.MannagementserviceLines.wl == false      
          ){
              this.selectCase = '2'; 
          }
  
          
        if ( 
          this.MannagementserviceLines.wt == false && 
          this.MannagementserviceLines.fi == false && 
          this.MannagementserviceLines.ct == false && 
          this.MannagementserviceLines.sl == true && 
          this.MannagementserviceLines.wl == true      
          ){
              this.selectCase = '3'; 
          }
  
          if ( 
            this.MannagementserviceLines.wt == false && 
            this.MannagementserviceLines.fi == false && 
            this.MannagementserviceLines.ct == true && 
            this.MannagementserviceLines.sl == false && 
            this.MannagementserviceLines.wl == false      
            ){
                this.selectCase = '4'; 
               // alert('caso 4')
            }
  
  
            if ( 
              this.MannagementserviceLines.wt == false && 
              this.MannagementserviceLines.fi == false && 
              this.MannagementserviceLines.ct == true && 
              this.MannagementserviceLines.sl == false && 
              this.MannagementserviceLines.wl == true      
              ){
                  this.selectCase = '5'; 
              }
  
  
              if ( 
                this.MannagementserviceLines.wt == false && 
                this.MannagementserviceLines.fi == false && 
                this.MannagementserviceLines.ct == true && 
                this.MannagementserviceLines.sl == true && 
                this.MannagementserviceLines.wl == false      
                ){
                    this.selectCase = '6'; 
                }
  
  
                if ( 
                  this.MannagementserviceLines.wt == false && 
                  this.MannagementserviceLines.fi == false && 
                  this.MannagementserviceLines.ct == true && 
                  this.MannagementserviceLines.sl == true && 
                  this.MannagementserviceLines.wl == true      
                  ){
                      this.selectCase = '7'; 
                  }
  
                  if ( 
                    this.MannagementserviceLines.wt == false && 
                    this.MannagementserviceLines.fi == true && 
                    this.MannagementserviceLines.ct == false && 
                    this.MannagementserviceLines.sl == false && 
                    this.MannagementserviceLines.wl == false      
                    ){
                        this.selectCase = '8'; 
                        // console.log(this.selectCase, '8');
                    }
  
  
                    
                  if ( 
                    this.MannagementserviceLines.wt == false && 
                    this.MannagementserviceLines.fi == true && 
                    this.MannagementserviceLines.ct == false && 
                    this.MannagementserviceLines.sl == false && 
                    this.MannagementserviceLines.wl == true      
                    ){
                        this.selectCase = '9'; 
                        // console.log(this.selectCase, '8');
                    }
  
                    if ( 
                      this.MannagementserviceLines.wt == false && 
                      this.MannagementserviceLines.fi == true && 
                      this.MannagementserviceLines.ct == false && 
                      this.MannagementserviceLines.sl == true && 
                      this.MannagementserviceLines.wl == false      
                      ){
                          this.selectCase = '10'; 
                      }
  
                      if ( 
                        this.MannagementserviceLines.wt == false && 
                        this.MannagementserviceLines.fi == true && 
                        this.MannagementserviceLines.ct == false && 
                        this.MannagementserviceLines.sl == true && 
                        this.MannagementserviceLines.wl == true      
                        ){
                            this.selectCase = '11'; 
                        }
                    
  
                    if ( 
                      this.MannagementserviceLines.wt == false && 
                      this.MannagementserviceLines.fi == true && 
                      this.MannagementserviceLines.ct == true && 
                      this.MannagementserviceLines.sl == false && 
                      this.MannagementserviceLines.wl == false      
                      ){
                        this.selectCase = '12'; 
                      }
  
  
                      if ( 
                        this.MannagementserviceLines.wt == false && 
                        this.MannagementserviceLines.fi == true && 
                        this.MannagementserviceLines.ct == true && 
                        this.MannagementserviceLines.sl == false && 
                        this.MannagementserviceLines.wl == true      
                        ){
                          this.selectCase = '13'; 
                        }
  
  
                        if ( 
                          this.MannagementserviceLines.wt == false && 
                          this.MannagementserviceLines.fi == true && 
                          this.MannagementserviceLines.ct == true && 
                          this.MannagementserviceLines.sl == true && 
                          this.MannagementserviceLines.wl == false      
                          ){
                            this.selectCase = '14'; 
                          }
  
  
                          if ( 
                            this.MannagementserviceLines.wt == false && 
                            this.MannagementserviceLines.fi == true && 
                            this.MannagementserviceLines.ct == true && 
                            this.MannagementserviceLines.sl == true && 
                            this.MannagementserviceLines.wl == true      
                            ){
                              this.selectCase = '15'; 
                            }
  
  
                       if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == false && 
                            this.MannagementserviceLines.ct == false && 
                            this.MannagementserviceLines.sl == false && 
                            this.MannagementserviceLines.wl == false      
                            ){
                              this.selectCase = '16'; 
                            }
  
  
                        if ( 
                          this.MannagementserviceLines.wt == true && 
                          this.MannagementserviceLines.fi == false && 
                          this.MannagementserviceLines.ct == false && 
                          this.MannagementserviceLines.sl == false && 
                          this.MannagementserviceLines.wl == true      
                          ){
                            this.selectCase = '17'; 
                          }
  
                          if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == false && 
                            this.MannagementserviceLines.ct == false && 
                            this.MannagementserviceLines.sl == true && 
                            this.MannagementserviceLines.wl == false      
                            ){
                              this.selectCase = '18'; 
                            }
  
  
                        if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == false && 
                            this.MannagementserviceLines.ct == false && 
                            this.MannagementserviceLines.sl == true && 
                            this.MannagementserviceLines.wl == true      
                            ){
                              this.selectCase = '19'; 
                            }
  
  
                            if ( 
                              this.MannagementserviceLines.wt == true && 
                              this.MannagementserviceLines.fi == false && 
                              this.MannagementserviceLines.ct == true && 
                              this.MannagementserviceLines.sl == false && 
                              this.MannagementserviceLines.wl == false      
                              ){
                                this.selectCase = '20'; 
                              }
  
  
  
                          if ( 
                              this.MannagementserviceLines.wt == true && 
                              this.MannagementserviceLines.fi == false && 
                              this.MannagementserviceLines.ct == true && 
                              this.MannagementserviceLines.sl == false && 
                              this.MannagementserviceLines.wl == true      
                            ){
                              this.selectCase = '21'; 
                            }
  
                            
                          if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == false && 
                            this.MannagementserviceLines.ct == true && 
                            this.MannagementserviceLines.sl == true && 
                            this.MannagementserviceLines.wl == false      
                          ){
                            this.selectCase = '22'; 
                          }
  
  
                        if ( 
                          this.MannagementserviceLines.wt == true && 
                          this.MannagementserviceLines.fi == false && 
                          this.MannagementserviceLines.ct == true && 
                          this.MannagementserviceLines.sl == true && 
                          this.MannagementserviceLines.wl == true      
                        ){
                          this.selectCase = '23'; 
                        }
  
  
                    if ( 
                      this.MannagementserviceLines.wt == true && 
                      this.MannagementserviceLines.fi == true && 
                      this.MannagementserviceLines.ct == false && 
                      this.MannagementserviceLines.sl == false && 
                      this.MannagementserviceLines.wl == false      
                      ){
                      this.selectCase = '24'; 
                      }
  
  
                      if ( 
                      this.MannagementserviceLines.wt == true && 
                      this.MannagementserviceLines.fi == true && 
                      this.MannagementserviceLines.ct == false && 
                      this.MannagementserviceLines.sl == false && 
                      this.MannagementserviceLines.wl == true      
                        ){
                      this.selectCase = '25'; 
                      }
                      
  
                      if ( 
                        this.MannagementserviceLines.wt == true && 
                        this.MannagementserviceLines.fi == true && 
                        this.MannagementserviceLines.ct == false && 
                        this.MannagementserviceLines.sl == true && 
                        this.MannagementserviceLines.wl == false      
                          ){
                        this.selectCase = '26'; 
                        }
  
  
  
                        
                      if ( 
                        this.MannagementserviceLines.wt == true && 
                        this.MannagementserviceLines.fi == true && 
                        this.MannagementserviceLines.ct == false && 
                        this.MannagementserviceLines.sl == true && 
                        this.MannagementserviceLines.wl == true      
                          ){
                        this.selectCase = '27'; 
                        }
  
  
                        if ( 
                          this.MannagementserviceLines.wt == true && 
                          this.MannagementserviceLines.fi == true && 
                          this.MannagementserviceLines.ct == true && 
                          this.MannagementserviceLines.sl == false && 
                          this.MannagementserviceLines.wl == false      
                            ){
                          this.selectCase = '28'; 
                          }
  
  
                          if ( 
                            this.MannagementserviceLines.wt == true && 
                            this.MannagementserviceLines.fi == true && 
                            this.MannagementserviceLines.ct == true && 
                            this.MannagementserviceLines.sl == false && 
                            this.MannagementserviceLines.wl == true      
                              ){
                            this.selectCase = '29'; 
                            }
  
  
                if ( 
                    this.MannagementserviceLines.wt == true && 
                    this.MannagementserviceLines.fi == true && 
                    this.MannagementserviceLines.ct == true && 
                    this.MannagementserviceLines.sl == true && 
                    this.MannagementserviceLines.wl == false      
                    ){
                    this.selectCase = '30'; 
                    }
                      
               if ( 
                this.MannagementserviceLines.wt == true && 
                this.MannagementserviceLines.fi == true && 
                this.MannagementserviceLines.ct == true && 
                this.MannagementserviceLines.sl == true && 
                this.MannagementserviceLines.wl == true      
                ){
                 
                    this.selectCase = '31'; 
                }
  
                
                // console.log( this.MannagementserviceLines)
                // console.log(this.selectCase);
               
                   
                // console.log( this.MannagementserviceLines)
                // console.log(this.selectCase);
  
  
  
   
    }
  
}
