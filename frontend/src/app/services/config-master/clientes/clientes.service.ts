import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clientes } from 'src/app/models/config-master/clientes/clientes';

@Injectable({
  providedIn: 'root'
})


export class ClientesService {
selectedCliente: Clientes;
clientes: Clientes[];
readonly URL_API = "http://localhost:3000/api/Client";
 
constructor(private http: HttpClient) { 
  //this.selectedCliente = new Clientes();
 }

 getClientes(){
  return this.http.get(this.URL_API);
 }
 getCliente(cliente_id: string){
  return this.http.get(this.URL_API+`/${cliente_id}`);
 }
 postCliente(Cliente: Clientes){
  return this.http.post(this.URL_API, Cliente);
 }
 putCliente(cliente: Clientes){
  console.log('put', cliente);
  return this.http.put(this.URL_API + `/${cliente._id}`, cliente);
 }
 deleteCliente(id: string){
  return this.http.delete(this.URL_API + `/${id}`);
 }
}
