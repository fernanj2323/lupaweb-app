import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Photo} from '../../models/photos/photos'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  readonly URL_PHOTOS = 'http://localhost:3000/api/photos';
  id: string; 

  selectedPhoto: Photo;
  Photos: Photo[];
 
 
  constructor(private http: HttpClient) {
   }

//guardar foto
 public elearningSavePhoto(photo: File, courseId){
  const fd = new FormData();
  fd.append('photo', photo);
  fd.append('autor', localStorage.getItem('FIRSTNAME')+' '+localStorage.getItem('LASTNAME'));
  fd.append('idAutor', localStorage.getItem('ID'));
  fd.append('courseId', courseId);
  fd.append('type',photo.type);
  fd.append('type_data', 'cursos');
  return this.http.post(this.URL_PHOTOS +'/addCourses', fd);  
 }

//guardar foto o documento 
public postPhotoOrDocument(photo:File, array){

  const fd = new FormData();
  fd.append('photo', photo);
  fd.append('idAutor', array.idAutor);
  fd.append('autor', array.autor);
  fd.append('item', array.item);
  fd.append('managementId', array.managementId);
  fd.append('observation', array.observation);


  return this.http.post(this.URL_PHOTOS + '/postPhotoOrDocument' , fd)
}


  //traer todas las fotos
  public getPhotos(){
    return this.http.get(this.URL_PHOTOS);
  }
  //traer foto
  public getPhoto(id){
    console.log('servicio', id);
    return this.http.get(this.URL_PHOTOS + '/getPhotoByCoureId' + `/${id}`);
  }

  public deletePhoto(_id: string){ 
    console.log('deletePhoto');
    return this.http.delete(this.URL_PHOTOS + `/${_id}`)
}

   //editar con foto 
   public putJpactivityWPhoto(item:string, form:string, photo: File, managementId){

    const fd = new FormData();
   fd.append('photo', photo);
   fd.append('autor', localStorage.getItem('NAME'));
   fd.append('idAutor', localStorage.getItem('ID'));

   return this.http.post(this.URL_PHOTOS, fd);  
  }

 //buscar foto por item, managementId y userId
  public getPhotoByClosingPhase(array){
  

    return this.http.post(this.URL_PHOTOS + '/getPhotoByClosingPhase', array  );
  }

}