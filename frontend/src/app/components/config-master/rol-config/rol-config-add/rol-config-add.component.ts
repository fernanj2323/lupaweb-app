import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RolConfigService } from '../../../../services/config-master/rol-config/rol-config.service';
import { RolConfig } from '../../../../models/config-master/rol-config/rolConfig';

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-rol-config-add',
  templateUrl: './rol-config-add.component.html',
  styleUrls: ['./rol-config-add.component.css'],
  providers: [RolConfigService]
})
export class RolConfigAddComponent implements OnInit {
  public show: number;

  constructor(
    public rolConfigService: RolConfigService,
    public menusService: RolConfigService
  ) { }

  ngOnInit() {
  }

  addRol(form: NgForm){
    if(form.value.id){
      this.rolConfigService.putRol(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Rol actualizado satisfactoriamente'});
        var url = (`config/rols`);
      })
    }else{
      this.rolConfigService.postRol(form.value)
      .subscribe(res => {
        M.toast({ html: 'Rol creado exitosamente' });
        var url = (`config/rols`);
        location.assign(url);
      })
    }
  }
  showMenus(menu){
    if(menu=='Menu'){
      this.show = 1;
      this.rolConfigService.getRolsbyType(menu)
      .subscribe(res => {
        this.rolConfigService.selectedRols = res as any;
      });
    }else{
      this.show = 0;
    }
  }

  //Reincia el form
  resetForm(form?: NgForm) {
    if(form){
      form.reset();
   //   this.rolConfigService.selectedRols = new RolConfig();
    }
  }   
}
