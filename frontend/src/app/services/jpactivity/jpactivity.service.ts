import { Injectable } from '@angular/core';
import { Jpactivity } from '../../models/jpactivity/jpactivity';
import { Observable, BehaviorSubject, from } from 'rxjs';
// import { JwResponse } from '../../models/auth/jw-response';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { JpQuestions } from 'src/app/models/jpactivity/jpQuestions';
import { CriticalReq } from 'src/app/models/jpactivity/criticalReq';
import { ManagementStatus } from 'src/app/models/config-master/eservicesManagementStatus/managementStatus';
import { workPreparation } from '../../models/eservices/workPreparation';
import { workPreparationQuestions } from 'src/app/models/eservices/workPreparationQuestions';
import { hseElements} from 'src/app/models/eservices/hseElements';
import { fiRequirement } from 'src/app/models/eservices/fiRequirements';
@Injectable({
  providedIn: 'root'
})

export class JpactivityService {

  selectedFiRequirements:fiRequirement;  
fiRequirements:fiRequirement[];
selectedhseElements:hseElements;
hseqElements:hseElements[];
selectedCriticalReq:CriticalReq; //datos criticos del mismo management previamente creado
selectedQuestion:JpQuestions;
Questions:JpQuestions[]; //un array de preguntas 
selectedJpactivity: Jpactivity;
Jpactivitys: Jpactivity[]; //un array de fotos 
selectedManagementStatus:ManagementStatus; 
managementStatus:ManagementStatus[];
selectedWorkPreparation:workPreparation;  //preparacion de trabajo respuestas
workPreparations:workPreparation[]; 
workPreparationQuestions:workPreparationQuestions[];
selectedWorkPreparationQuestions:workPreparationQuestions; //preparacion de trabajos preguntas from db

readonly URL_WPQ = 'http://localhost:3000/api/workPreQuestions'; //work preparation question 
readonly URL_WP = 'http://localhost:3000/api/workPreparation'; //work preparation answers 
readonly URL_API = 'http://localhost:3000/api/eservices';
readonly URL_PHOTOS = 'http://localhost:3000/api/photos';
readonly URL_APICRITICAL = 'http://localhost:3000/api/eservices/criticalReq/ofmanagement';

id: string; 

public form:({ 
  'managementId' : string,
  'item': string, 
   'idAutor': string
})

public complete:({
  'phase':string 
})

// fd:string; 
constructor(private http: HttpClient) { 
  //this.selectedCriticalReq = new CriticalReq(); //requerimientos criticos de un management id previo 
 // this.selectedJpactivity = new Jpactivity();
  // this.selectedQuestion = new JpQuestions();
  //this.selectedManagementStatus = new ManagementStatus();
  //this.selectedWorkPreparation = new workPreparation();
//  this.selectedhseElements = new hseElements();
 // this.selectedFiRequirements= new fiRequirement();
  }

  // new --------------------------

  public getTendered (){
    return this.http.get(this.URL_API + '/getTendered')
  }

  public getFinished (){
    return this.http.get(this.URL_API + '/getFinished')
  }

//--------------------------------------------------- 


  public getStatus(){
    return this.http.get(this.URL_API + '/getStatus' )
  }
 
  // ----------API CON FOTOS ----------------// 

  //traer todas las fotos
  public getPhotos(){
    return this.http.get(this.URL_PHOTOS);
  }
  //traer foto
  public getPhoto(id: string){
    return this.http.get(this.URL_PHOTOS + '/' + id);
  }
  //traer foto con filtrado por formulario y item 
  public findPhoto(managementId?:string, _i?:string){

      var form = ({
        'managementId' : managementId,
         'idAutor': localStorage.getItem('ID'),
         'phase': _i
       });
   
       return this.http.put(this.URL_PHOTOS + '/eservices/findPhotos', form);

  }

  public deletePhoto(_id: string){ 
      // console.log('deletePhoto');
      return this.http.delete(this.URL_PHOTOS + `/${_id}`)
  }


    //editar con foto 
  public putJpactivityWPhoto(form:string, photo: File, managementId, phase:string){

    // console.log('fomulario', form);
    // console.log('photo', photo);
    // console.log('ManagementId', managementId);
    // if ()
    
    const fd = new FormData();

   //aqui unimos todo todo el texto con la imagen
   fd.append('photo', photo);
   fd.append('managementId', managementId);
   //  fd.append('item', item);
   fd.append('form', form);
   fd.append('phase', phase);
   fd.append('autor', localStorage.getItem('NAME'));
   fd.append('idAutor', localStorage.getItem('ID'));

  //  fd.append('image', );
  //  console.log('putJpactivityWPhotosssssssssssssss');
  //  console.log(fd);

   return this.http.post(this.URL_PHOTOS + '/eservices/managementWPhoto', fd);  
  }

    //guardar con foto
    public postJpactivityWPhoto( Jpactivity: string , photo: File)
    {
      const fd = new FormData();
     fd.append('Jpactivity', Jpactivity);
     fd.append('image', photo);
    //  console.log('1-----service----')
    //  console.log(fd);
  
      return this.http.post(this.URL_API, fd);
    }


// ----------API CON FOTOS ----------------// 


//crear nuevo 
  public postJpactivity(Jpactivity?: Jpactivity, dates?){
  //  console.log('jp' , Jpactivity)
    var concatenado = [].concat(Jpactivity, dates);
    console.log('concantendo', concatenado[1])
  //   console.log('fechas',dates)

    if (dates.dateInit !== '0' || dates.dateEnd !== '0') {
     console.log('hay al menos una fecha');
  //   console.log('jp' , Jpactivity)

  //   var concatenado = [].concat(Jpactivity, dates);

     if (concatenado[0].HSEQRequirements  !== "" && 
       concatenado[0].NewCamp !==  "" &&
       concatenado[0].NewClient !== "" && 
       concatenado[0].NewDistrict !== "" && 
       concatenado[0].NewWell !=="" && 
       concatenado[0].RRHHRequirements !== "" && 
       concatenado[0].RequestInformation !== "" && 
       concatenado[0].adminisitrativeRequirements !== "" && 
       concatenado[0].camp !== "" && 
       concatenado[0].client !== "" && 
       concatenado[0].country !== "" && 
       concatenado[1].dateEnd !== "" && 
       concatenado[1].dateInit !== "" && 
       concatenado[0].district !== "" && 
       concatenado[0].exclusions!== "" && 
       concatenado[0].history!== "" && 
       concatenado[0].leaderDesignation !== "" && 
      concatenado[0].name!== "" &&
      //  concatenado[0].otherRequirements!== "" && 
       concatenado[0].planningFormat!== "" && 
       concatenado[0].responsibleLine!== "" && 
       concatenado[0].scopeODT !== "" && 
       concatenado[0].serviceDetail!== "" && 
       concatenado[0].stimatedRevenue!== "" && 
       concatenado[0].technicalRequirements!== "" && 
       concatenado[0].well !== ""
      ){
        //actividad full 
      concatenado[0].phase = '1'; 
      console.log('creado full', concatenado);
      return this.http.post(this.URL_API, concatenado);
    }else{
      //actividad no full 
      console.log('no full' , concatenado); 
      return this.http.post(this.URL_API, concatenado);
    }

  }else{
   //sin fechas 
    console.log('actividad sin fechas ')
     var array = ''; 
     return this.http.post(this.URL_API, Jpactivity);
    // return this.http.get(this.URL_API + '/newManagement');
  }
  
  }

//phase 1 
//editar con un id ya creado 
  public putJpactivity(Jpactivity, managementId?:string, dates?){ //edit 
    console.log(' servicio -------editando -------------------');
    var id=managementId; 
    var concatenado = [].concat(Jpactivity, dates)
     console.log('concatenado', concatenado)


     if (concatenado[0].HSEQRequirements  !== "" && 
     concatenado[0].NewCamp !==  "" &&
     concatenado[0].NewClient !== "" && 
     concatenado[0].NewDistrict !== "" && 
     concatenado[0].NewWell !=="" && 
     concatenado[0].RRHHRequirements !== "" && 
     concatenado[0].RequestInformation !== "" && 
     concatenado[0].adminisitrativeRequirements !== "" && 
     concatenado[0].camp !== "" && 
     concatenado[0].client !== "" && 
     concatenado[0].country !== "" && 
     concatenado[1].dateEnd !== "" && 
     concatenado[1].dateInit !== "" && 
     concatenado[0].district !== "" && 
     concatenado[0].exclusions!== "" && 
     concatenado[0].history!== "" && 
     concatenado[0].leaderDesignation !== "" &&   
     concatenado[0].name!== "" &&
    //  concatenado[0].otherRequirements!== "" && 
     concatenado[0].planningFormat!== "" && 
    //  concatenado[0].responsibleLine!== "" && 
     concatenado[0].scopeODT !== "" && 
     concatenado[0].serviceDetail!== "" && 
     concatenado[0].stimatedRevenue!== "" && 
     concatenado[0].technicalRequirements!== "" && 
     concatenado[0].well !== ""
    ){
        //si esta completo 
        concatenado[0].phase = '1'; 
        console.log('array modificado',concatenado)
        console.log('sin danar las fechas ', Jpactivity)
        console.log('esta completo')
        return this.http.put(this.URL_API+`/${id}`,concatenado); 
      }else{
        console.log('array modificado',concatenado)
        console.log('no esta completo')
        concatenado[0].phase = '0'; 
        return this.http.put(this.URL_API+`/${id}`,concatenado); 
      }
  }
  
  public changueStatus(status:string, id: string){ //edit 
     console.log('changueStatus');
     var array = ({
       status: status
     })
    console.log(array);  
    return this.http.post(this.URL_API+`/changueStatus`+`/${id}`,array); 
  }

  public patchJpactivity(Jpactivity: any){ //edit 
    console.log('patch');
    var id=Jpactivity._id; 
     console.log(Jpactivity);  
    return this.http.patch(this.URL_API+`/${id}`,Jpactivity); 
  }

  public getJpactivitys(){
    // console.log('getJpactivityss')
    return this.http.get(this.URL_API);
 }


 public getManagementByCriticidad(hrisk ){
   var array = ({ criticidad: hrisk })
  // console.log('getJpactivityss')
  return this.http.post(this.URL_API + '/getManagementByCriticidad', array ) ;
}


public getManagementByStatus(status ){
  var array = ({ status: status })
 // console.log('getJpactivityss')
 return this.http.post(this.URL_API + '/getManagementByStatus', array ) ;
}


 public getJpactivity(_id : string){ 
  // console.log('3*********** getJpactivity Service *************')
  // console.log('getJpactivity')
  // console.log(_id)
  return this.http.get(this.URL_API + `/${_id}`);
}

public deleteActivity(_id: string) {
  // console.log('_id2');
  // console.log(_id);
  return this.http.delete(this.URL_API + `/${_id}`);
}

public getQuestions(phase:string)  { 
  //buscar todas las preguntas
  //  console.log('questionsservice', phase)

  
return this.http.get(this.URL_API  + '/questions' +  `/${phase}`) 
}

public findQuestion(_id:string){//buscar una pregunta 

}

//-----------------------------------------
//------------- CRITICAL REQURIREMENTS ----
//-----------------------------------------

//buscar todos
public getCriticalReqOfManagement(){
  return this.http.get(this.URL_APICRITICAL)
}


//buscar by id
public getCriticalReqById(id){
  return this.http.get(this.URL_APICRITICAL + '/byId' + `/${id}`)
}


//buscar by management id 
public getCriticalReqOfManagementId(id:string){
  // console.log('id en servicio',id )
  return this.http.get(this.URL_APICRITICAL + '/byManagementId' + `/${id}`)  
}

//crear
public postCriticalReq(criticalReq){
  // console.log('servicios')
  return this.http.post(this.URL_APICRITICAL,criticalReq) 
}

//editar 
public putCriticalReq(criticalReq, id){
console.log('servicio')
console.log('criticalReq', criticalReq)
console.log('id', id)
  return this.http.put(this.URL_APICRITICAL +`/${id}`,criticalReq) 


}

//-----------------------------------------
//-------END---- CRITICAL REQURIREMENTS ----
//-----------------------------------------

//findByDate 
public findByDate (dateInit, dateEnd){
var dates = ({
  dateInit: dateInit, 
  dateEnd: dateEnd
})
  return this.http.post(this.URL_API + '/findByDate', dates  )
}
//cuando los datos criticos estan llenos, cambiamos el status del management de 1 a 2 
//1 = phase 1 completa, acta de solicitud de proyecto completa 
//2 = phase 2 completa, requerimientos criticos del proyecto completos 
// 

public upStatusOfManagement(id:string){

  return this.http.get(this.URL_API +`/upStatusOfManagement`+`/${id}`) 
}






//-----------------------------------------
//------------- DASHBOARD -----------------
//-----------------------------------------

//actividades licitadas
public tenderedActivities(){

}
//actividades no licitadas 
public untenderedActivities(){

}
//buscar por linea de servicio
public getManagementBySL(sl){
  return this.http.get(this.URL_API + '/getManagementBySL/' + sl);
  
}

//buscar por locacion
public findByLocation(){
  
}

//-----------------------------------------
//----------- FIN DASHBOARD ---------------
//-----------------------------------------


//--------------------------------------------------
//-----------WORK PREPARATION  ---------------------
//--------------------------------------------------
//answers
public saveWorkPreparation(work){
  console.log(work);
  return this.http.post(this.URL_WP + '/saveWorkPreparation', work)
}

public getWorkpreparationByManagementId(id){
 return this.http.get(this.URL_WP + '/getWorkpreparationByManagementId/' + id);
}



public getWorkpreparationByManagementIdandAuthId(managementId, userId, ServiceLine){
  var array =({
    managementId : managementId,
    userId: userId, 
    serviceLine: ServiceLine,
  })

// console.log(sl)
// console.log(managementId)

  return this.http.post(this.URL_WP +'/getWorkpreparationByManagementIdandAuthId/'+ managementId, array)
}


public getWorkpreparationByManagementIdandSl(sl, managementId, userId){
  var array =({
    sl : sl,
    userId: userId
  })

// console.log(sl)
// console.log(managementId)

  return this.http.post(this.URL_WP +'/getWorkpreparationByManagementIdandSl/'+ managementId, array)
}


public getWorkPreparation(id){
 return this.http.get(this.URL_WP + '/getWorkPreparation/' + id);
}


public editWork (work, workid){
  return this.http.put(this.URL_WP + '/editWork/' + workid, work );
}

// QUESTIONS
public  getPreparationQuestions(){
  return this.http.get(this.URL_WPQ)
}

public getQuestionsByServiceLine(serviceLines){
  console.log(serviceLines)
  if (serviceLines == 'wt'){
    var array =({
      wt :  1
    })
    return this.http.post(this.URL_WPQ + '/getQuestionsByServiceLine', array);
  }

  if (serviceLines == 'wl'){
    const array =({
      wl :  1
    })
    return this.http.post(this.URL_WPQ + '/getQuestionsByServiceLine', array);
  }

 
}


public  saveHseElements (element){

  return this.http.post(this.URL_WP + '/saveHseElements/',  element );
}


public  editHseElements (element, hseElementId){
  console.log('editHseElements')
  return this.http.put(this.URL_WP + '/editHseElements/' + hseElementId ,  element );
}


public  getHseElements (workPreparationId, userId){
  
  const array = ({
    userId: userId,
    workPreparationId: workPreparationId,
  })

  return this.http.post(this.URL_WP + '/getHseElements/' ,  array );
}


// requerimientos de frente de inyeccion 

public  getFiRequierements (workPreparationId, userId){
  
  const array = ({
    userId: userId,
    workPreparationId: workPreparationId,
  })

  return this.http.post(this.URL_WP + '/getFiRequierements/' ,  array );
}

public  createFiRequirements(fiReq){

  return this.http.post(this.URL_WP + '/createFiRequirements/' ,  fiReq );
}



public  editFiRequirements (fiReq, fiReqId){
  console.log('editFiRequirements')
  return this.http.put(this.URL_WP + '/editFiRequirements/' + fiReqId ,  fiReq );
}


public checkFinish (id){
 console.log('checkFinish' , id)
  return this.http.get(this.URL_API + '/checkFinish/' + id );
}


//--------------------------------------------------
//----------- FIN WORK PREPARATION   ---------------
//--------------------------------------------------
}





