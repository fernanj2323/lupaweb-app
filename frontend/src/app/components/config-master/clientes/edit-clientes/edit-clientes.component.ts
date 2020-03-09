import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ClientesService } from 'src/app/services/config-master/clientes/clientes.service';
import { Clientes } from 'src/app/models/config-master/clientes/clientes';


declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any;

 
@Component({
  selector: 'app-edit-clientes',
  templateUrl: './edit-clientes.component.html',
  styleUrls: ['./edit-clientes.component.css'],
  providers: [ClientesService]
})

export class EditClientesComponent implements OnInit {

  constructor(
    public clientesService: ClientesService, public route: ActivatedRoute
  ) { }

  ngOnInit() {
    const clienteId = this.route.snapshot.params["_id"];
    this.getCliente(clienteId);
  }

  getCliente(id){
    this.clientesService.getCliente(id).subscribe
    (res=>{
      this.clientesService.selectedCliente = res as any; 
    });
  }


  addClient( from?: NgForm){
    if(confirm('Esta seguro que desea Editar el cliente?')){
    // if (form.value._id){
    //    this.clientesService.putCliente(from.value)
    //    .subscribe(res=>{
    //      console.log(res)
    //      M.toast({
    //        html: 'Cambios Realizados'
    //      })
    //      var url = ('config/client/clientEdit/:_id')
    //      location.assign(url);
    //    })
    // }else{

    // }
    }

  }
}
