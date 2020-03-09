import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientesService } from 'src/app/services/config-master/clientes/clientes.service';
import { Clientes } from 'src/app/models/config-master/clientes/clientes';
declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.css'],
  providers: [ClientesService]
})

export class AddClientesComponent implements OnInit {

  constructor(
    public clientesService: ClientesService
  ) { }

  ngOnInit() {
  }

  addClient (form: NgForm){
    console.log('formulario',form.value);
    if (form.value.id){
      this.clientesService.putCliente(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Cliente Actualizado'});
        var url = (`config/client/clientList`);
        location.assign(url);
      });
    }else{ 
      this.clientesService.postCliente(form.value)
      .subscribe(res => {
        M.toast({ html: 'Cliente agregado'});
        var url = (`config/client/clientList`);
        location.assign(url);
      })
    }
  }
  resetForm(form?: NgForm) {
    if(form){
      form.reset();
      //this.clientesService.selectedCliente = new Clientes();
    }
  } 

}
