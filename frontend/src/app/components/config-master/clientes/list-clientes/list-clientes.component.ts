import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/config-master/clientes/clientes.service'
import { Clientes } from 'src/app/models/config-master/clientes/clientes' 
import { NgForm } from "@angular/forms";
declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 


@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})


export class ListClientesComponent implements OnInit {


  public tab:number = 1; //show 



  constructor(public  clientesService:ClientesService) { }


  ngOnInit() {  
    // this.tab = 1; 
    
  $(document).ready(function() {
    M.updateTextFields();
  });
    this.getClientes();

  }

  getClientes(){
    this.clientesService.getClientes()
    .subscribe(res => {
      // console.log('clientes', res)
      this.clientesService.clientes = res as Clientes[];
    });
  }

  deleCliente(id){
    if (confirm('¿Está seguro que desea Eliminar éste cliente?')) {
      this.clientesService.deleteCliente(id)
      .subscribe(res=>{
        this.getClientes();
      })
    }else {
      this.getClientes();
    }

  }
  editClientesMode(id?){
    this.tab=2; 
  }
  undoEditMode(){
    if (confirm('¿Volver a Lista de clientes?')) {
      this.tab=1; 
  }else{
    this.tab=2; 
  }
}
editClient(form?: NgForm){
console.log('save client', form.value);
this.clientesService.putCliente(form.value)
.subscribe(res => {
  M.toast({
          html: 'Cambios Realizados'
         })
        console.log(res);
    });
  }
}
