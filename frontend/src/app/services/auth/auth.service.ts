import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwResponse } from '../../models/auth/jw-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../models/auth/user';

//console.log('flag Aut service - 0 ');
@Injectable()
export class AuthService {

 // AUTH_SERVER: string = 'http://132.148.166.222:3000/api'; //go daddy back 
AUTH_SERVER: string = 'http://localhost:3000/api';
 //AUTH_SERVER: string = '/api';
  authSubject = new BehaviorSubject(false);
   token: string;
   email: string;
   lastName: string; 
   firstName: string; 
   department: string; 
   rol: string; 
   expiresIn: string; 
   id: string; 
  
   selectedUser: User; 
   users: User[];

  constructor(
    private httpClient: HttpClient) { 
  //  this.selectedUser = new User();
  }

  register(user: User): Observable<JwResponse> {
   // console.log('register')
   // console.log('flag Aut service - 1 ');
   // console.log (user);
    return this.httpClient.post<JwResponse>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: JwResponse) => {
          if (res) {
            // guardar token
       //     console.log('flag Aut service - 2 ');
        //    this.saveToken(res.dataUser);
          }

        // if (err) { 
          //  console.log(err);

           //}

        })
      );
  }

  login(user: User): Observable<JwResponse> {
  console.log('flag login service - 1 ');
    console.log(user);
    var status = 1; 
    
    return this.httpClient.post<JwResponse>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: JwResponse) => {
          if (res) {
            // guardar token
           // console.log('flag login service - 2 ');
           // console.log(res);
          
            this.saveToken(res.dataUser);
            this.getToken()
         
          }

        })
        
      );    
  };

  public getUsers(){
   // console.log('getUsers')
    return this.httpClient.get(`${this.AUTH_SERVER}/list`);
          
  };  

  public findByRole(){
    
    //console.log('getUsersForRole');
    return this.httpClient.get(`${this.AUTH_SERVER}/listForRole` );
          
  };  

  public findbyId(_id){
    //console.log('findbyId');
    //console.log(_id);
    return this.httpClient.post(`${this.AUTH_SERVER}/findById`+`/${_id}`, _id); 
      };
      //editar
    public putUser (user: User){
     // console.log('user');
     // console.log(user);
      return this.httpClient.put(`${this.AUTH_SERVER}/edit`, user);
    };

     public deleteUser (_id: string){
  
      console.log(`${this.AUTH_SERVER}` +`/${_id}`);
     return this.httpClient.delete(`${this.AUTH_SERVER}` +`/${_id}`)
     };
    


  logout(): void {
    console.log("eee");
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("FIRSTNAME");
    localStorage.removeItem("LASTNAME");
    localStorage.removeItem("ROL");
    localStorage.removeItem("DEPARTMENT");
    localStorage.removeItem("ID");
    localStorage.removeItem("EMAIL");
    localStorage.removeItem("PERMISOLOGY");
    var url = (`http://localhost:4200/Auth/login`);
    location.assign(url);
  }

  private saveToken(dataUser): void {
    console.log('saving on local');
    localStorage.setItem("ACCESS_TOKEN", dataUser.accessToken);
    localStorage.setItem("EXPIRES_IN", dataUser.expiresIn);
    localStorage.setItem("FIRSTNAME", dataUser.firstName);
    localStorage.setItem("LASTNAME", dataUser.lastName);
    localStorage.setItem("ROL", dataUser.role);
    localStorage.setItem("DEPARTMENT", dataUser.department);
    localStorage.setItem("ID", dataUser.id);
    localStorage.setItem("EMAIL", dataUser.email);
    localStorage.setItem("PERMISOLOGY", JSON.stringify(dataUser.permisology));
    console.log('localStorage', localStorage)
    
 //localStorage.setItem("NAME", )
    //this.token = token;
  }

   public getToken(): string {
   // console.log('getToken')
  // console.log(localStorage)
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
         
    }
    return this.token;
  }

  public getData() {
    console.log('getData')
        this.token = localStorage.getItem("ACCESS_TOKEN"),
        this.expiresIn = localStorage.getItem("EXPIRES_IN"),
        this.firstName= localStorage.getItem("FIRSTNAME"),
        this.lastName= localStorage.getItem("LASTNAME"),
        this.rol= localStorage.getItem("ROL"),
        this.department= localStorage.getItem("DEPARTMENT"),
        this.id= localStorage.getItem("ID"),
        this.email= localStorage.getItem("EMAIL")


       //console.log('getData');
       return; 
     
  }
 
}