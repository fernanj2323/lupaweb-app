import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";
import { RolConfigService } from '../../../../services/config-master/rol-config/rol-config.service';
import { RolConfig } from '../../../../models/config-master/rol-config/rolConfig';

declare var jQuery:any; 
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 

@Component({
  selector: 'app-rol-config-edit',
  templateUrl: './rol-config-edit.component.html',
  styleUrls: ['./rol-config-edit.component.css'],
  providers: [RolConfigService]
})
export class RolConfigEditComponent implements OnInit {

  constructor(
    public rolConfigService: RolConfigService, public route: ActivatedRoute,
    public menusService: RolConfigService 
  ) { }

  ngOnInit() {
    const rolConfig_id = this.route.snapshot.params["_id"];
    console.log(rolConfig_id);
    this.getRol(rolConfig_id);   
  }
  getRol(rolConfig_id: String){
    this.rolConfigService.getRol(rolConfig_id)
    .subscribe(res => {
      this.rolConfigService.selectedRols = res as any;
      console.log(this.rolConfigService.selectedRols);
    })
  }
  //This method is for edit deparment
  addRol(form?: NgForm) {
    if(confirm('Esta seguro de editar el rol?')){
      if(form.value._id) {
        console.log(form.value);
        this.rolConfigService.putRol(form.value)
          .subscribe(res => {
            console.log(res);
            M.toast({
              html: 'Rol actualizado satisfactoriamente'
              })
          });
          var url = (`/config/rols`);
          location.assign(url);
      } else {
        this.rolConfigService.postRol(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Rol creado exitosamente'});
        });
      }
    }
  }
  showMenus(menu){
    if(menu=='submenu'){
      this.rolConfigService.getRolsbyType(menu)
      .subscribe(res => {
        this.menusService.selectedMenu = res as any;
      });
    }
  }
  resetForm(form? : NgForm ){
    if (form){
      form.reset();
      //de esta forma reseteamos todo el formulario
     // this.rolConfigService.selectedRols = new RolConfig ();
    }
  }  
}
