import { Component, OnInit } from '@angular/core';
import { JpactivityService } from '../../../services/jpactivity/jpactivity.service'  //update
import { Jpactivity } from '../../../models/jpactivity/jpactivity';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Photo} from '../../../models/photos/photos';
declare var jQuery:any;
declare var $:any; 
declare var Materialize: any; 
declare var M: any; 



@Component({
  selector: 'details-management',
  templateUrl: './details-management.component.html',
  styleUrls: ['./details-management.component.css'],
  providers: [JpactivityService]
})


export class DetailsManagementComponent implements OnInit {

  constructor(public jpactivityService: JpactivityService, public router:Router,  public route:ActivatedRoute) { }

  ngOnInit() {
    const managementId = this.route.snapshot.params["id"]; //capturamos el id enrutado
    this.materializecssFunctions(); 
    this.detailsOfService(managementId);
  }

  detailsOfService(managementId:string){
    this.jpactivityService.getJpactivity(managementId).subscribe
    (res=> {
      this.jpactivityService.selectedJpactivity = res as any;
      console.log('la actividad es:', this.jpactivityService.selectedJpactivity)
    });
  }



//funcionamiento de materialize css
  materializecssFunctions(){
    $(document).ready(function(){
      $('.modal').modal();
    });
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
      });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      //var instances = M.FormSelect.init(elems, options);
    });
  }
}
