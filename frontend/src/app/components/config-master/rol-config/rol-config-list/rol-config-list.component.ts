import { Component, OnInit } from '@angular/core';
import { RolConfigService } from '../../../../services/config-master/rol-config/rol-config.service';
import { RolConfig } from '../../../../models/config-master/rol-config/rolConfig';

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-rol-config-list',
  templateUrl: './rol-config-list.component.html',
  styleUrls: ['./rol-config-list.component.css'],
  providers: [RolConfigService]
})
export class RolConfigListComponent implements OnInit {
  public datos: any[];
  public total: number;
  constructor(
    public rolConfigService: RolConfigService
  ) { }

  pageActual: number = 1;
  ngOnInit() {
    this.getRols();
  }
  //Obtener lista de linea de servicio
  getRols(){
    this.rolConfigService.getRols()
    .subscribe(res => {
      this.rolConfigService.rolConfig = res as any[];
      this.total = this.rolConfigService.rolConfig.length;
    });
  }

  //Delete
  deleteRol(_id){
    if(confirm('¿Esta seguro que desea Eliminar este registro?')){
      this.rolConfigService.deleteRol(_id)
      .subscribe(res => {
        this.getRols();
      });
    }
  }  
}