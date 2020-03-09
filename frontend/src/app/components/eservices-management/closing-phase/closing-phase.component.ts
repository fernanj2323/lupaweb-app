import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { EmailsService } from 'src/app/services/emails/emails.service';
import { UserService } from 'src/app/services/users/user.service';
import  { JpactivityService } from 'src/app/services/jpactivity/jpactivity.service'  //update
import { Jpactivity } from 'src/app/models/jpactivity/jpactivity';
import { ClosingPhaseService } from 'src/app/services/eservices/closing-phase.service';
import { closingPhase } from 'src/app/models/eservices/closingPhase/closingPhase';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { Photo } from 'src/app/models/photos/photos';
var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

export interface photo{}

interface htmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}




@Component({
  selector: 'app-closing-phase',
  templateUrl: './closing-phase.component.html',
  styleUrls: ['./closing-phase.component.css']
})
export class ClosingPhaseComponent implements OnInit {
  

  public aprobationMode; 
  public managementId: string;
  public authId: string;


  public showImage1: string = '0';
  public showImage2: string = '0';
  public showImage3: string = '0';

  public imagePath1:string;
  public imagePath2:string;
  public imagePath3:string;

  public image1Id:string; 
  public image2Id:string; 
  public image3Id:string; 


  public selected: any; 

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
    
  public maildata:({ 
    'to' : string,//email de quien recibe
    'toName':string, //nombre de quien recibe
    'from': string, //nombre de quien envia 
     'type': string, 
     'module': string, //modulo de donde se emite el mensaje 
     'subject': string, //titulo del correo 
     'description': string, //descripcion de la actividad asignada 
     
  });
   
  public createOrEdit:string = 'create';
  public closingId:string; 
  file: File; //archivo tipo file que viene de HTML 
  
  constructor(
    public router:Router,
    public route: ActivatedRoute,
    public emailsService: EmailsService,
    public UserService: UserService, 
    public NotificationsService: NotificationsService,  
    public jpactivityService: JpactivityService,
    public ClosingPhaseService: ClosingPhaseService,
    public PhotoService: PhotoService 

  ) { }

  ngOnInit() {
    this.managementId = this.route.snapshot.params["managementId"];
    // console.log('managementID', this.managementId);
    this.authId = localStorage.getItem("ID");
    this.consultIfExist()
    this.materializecss();
    this.isViewORedit();
  }


  isViewORedit(){
    var viewORedit = this.route.snapshot.params["viewOrEdit"]
   // console.log('viewORedit:',viewORedit);
    this.aprobationMode = viewORedit;
  }

  back(){

  }
 

  materializecss(){

    $(document).ready(function(){
      $('.tooltipped').tooltip();
      // $('.tooltip').tooltip('outDuration', 5000);
      // $('.tooltip').tooltip('inDuration', 150);
    });
  
  
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
    
  
  
  consultIfExist(){
    this.ClosingPhaseService.getClosingPhaseByManagementId(this.managementId).subscribe(res=>{

     // console.log(res);
      if (res[0]){
          this.selected = res[0] as closingPhase;
          this.createOrEdit = 'edit';
          this.closingId = res[0]._id;
          this.consultPhotos()
      }else { 
        this.selected = [];
      }
    })
  }

  saveClose(form:NgForm){
    form.value.managementId = this.managementId; 
    form.value.autorId = this.authId;
    // aqui va el id del usuario que aprueba 
    form.value.aprovatorId = this.authId;


    console.log(form.value);
      if (this.createOrEdit == 'create'){
        this.ClosingPhaseService.postClosing(form.value).subscribe(res=>{
          console.log(res);
          M.toast({html: 'Creado!'})  
          this.consultIfExist()
        })
      } else if (this.createOrEdit == 'edit'){
        this.ClosingPhaseService.putClosing(this.closingId, form.value).subscribe(res=>{
          console.log(res);
          M.toast({html: 'Guardado!'})  
        })
      }
  }

  //-----------------------------------------
  //-----------------photos------------------
  //------------------------------------------
  savePhoto( n:any, event?: htmlInputEvent){
    this.file = <File>event.target.files[0];

    if (n == 1){
      this.showImage1 = '1';
      var array = ({
        idAutor:  this.authId,
        item: 'ticket1',  //ticket 1
        managementId: this.managementId
      });
     }


     
    if (n == 2){
      this.showImage2 = '1';
      var array = ({
        idAutor:  this.authId,
        item: 'KPI1',  //kpi 1 
        managementId: this.managementId
      });
     }


        
    if (n == 3){
      this.showImage3 = '1';
      var array = ({
        idAutor:  this.authId,
        item: 'NPT1',  //NPT 1 
        managementId: this.managementId
      });
     }

    //console.log(this.file)
     this.PhotoService.postPhotoOrDocument (this.file, array).subscribe(
       res=>{
      //  console.log(res);
      var photo = res as Photo;
            if (res == 501){
              if (photo.item == "ticket1"){
                this.imagePath1 = '0';
                this.image1Id = '0';
              }

              if (photo.item == "KPI1"){
                this.imagePath2 = '0'
                this.image2Id = '0';
              }

              if (photo.item == "NPT1"){
                this.imagePath3 = '0';
                this.image3Id = '0';
              } 

              M.toast({ html: 'Formato No Aceptado', classes: 'rounded red darken-1'});
            } else {
              var photo = res as Photo;
            //  console.log(photo);
              if (photo.item == "ticket1"){
                this.imagePath1 = photo.imagePath;
                this.image1Id = photo._id;
              }

              if (photo.item == "KPI1"){
                this.imagePath2 = photo.imagePath;
                this.image2Id = photo._id;
              }

              if (photo.item == "NPT1"){
                this.imagePath3 = photo.imagePath;
                this.image3Id = photo._id;
              } 
              //console.log(this.imagePath);
              M.toast({ html: 'Guardado', classes: 'rounded lighten-2' });
            }
       });

  }

  consultPhotos(){
  
    var array =({
      item : 'ticket1',
      managementId : this.managementId,
      userId: this.authId
    })
 
    this.PhotoService.getPhotoByClosingPhase(array).subscribe
    (res=>{
      console.log(res);
      if (res[0]){
        var photo = res[0] as Photo;
        this.imagePath1 = photo.imagePath;
        this.image1Id = photo._id;
        this.showImage1 = '1';
      }
  
      var array =({
        item : 'KPI1',
        managementId : this.managementId,
        userId: this.authId
      })
   
      this.PhotoService.getPhotoByClosingPhase(array).subscribe
      (res=>{
        console.log(res);
        if (res[0]){
          var photo = res[0] as Photo;
          this.imagePath2 = photo.imagePath;
          this.image2Id = photo._id;
          this.showImage2 = '1';
        }
        var array =({
          item : 'NPT1',
          managementId : this.managementId,
          userId: this.authId
        })
     
        this.PhotoService.getPhotoByClosingPhase(array).subscribe
        (res=>{
          console.log(res);
          if (res[0]){
            var photo = res[0] as Photo;
            this.imagePath3 = photo.imagePath;
            this.image3Id = photo._id;
            this.showImage3 = '1';
          }
        })
      })



    })

   


  



  }




  deletePhoto(n){
    
    if (n == '1'){
      console.log('es 1')
      this.PhotoService.deletePhoto(this.image1Id).subscribe(res=>{
      console.log(res);
      this.showImage1 = '0';
      
    });
    }

    if (n == '2'){
      console.log('es 2')
      this.PhotoService.deletePhoto(this.image2Id).subscribe(res=>{
      console.log(res);
      this.showImage2 = '0';
    });
    }

    if (n == '3'){
      console.log('es 3')
      this.PhotoService.deletePhoto(this.image3Id).subscribe(res=>{
      console.log(res);
      this.showImage3 = '0';
    });
    }
  }

  

}
