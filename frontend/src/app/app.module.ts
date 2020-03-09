import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http/';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
//material 
import {MaterialModule} from './materialconfig';
//animaciones 

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';

import { Page404Component } from './components/page404/page404.component';



import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { FooterComponent } from './components/footer/footer.component';

//pagination 
import { NgxPaginationModule } from 'ngx-pagination';

import { JpactivityComponent } from './components/jpactivity/jpactivity.component';
import { EservicesDashBoardComponent } from './components/eservices-dash-board/eservices-dash-board.component'; // 
import { StartManagementComponent } from './components/eservices-management/start-management.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DescriptionComponent } from './components/eservices-management/phase1-description/description.component';
import { Phase2ObjectivesComponent } from './components/eservices-management/phase2-objectives/phase2-objectives.component';

import { DetailsManagementComponent } from './components/eservices-management/details-management/details-management.component';

import { DepartmentsListComponent } from './components/config-master/departments/departments-list/departments-list.component';
import { DepartmentsAddComponent } from './components/config-master/departments/departments-add/departments-add.component';
import { DepartmentsEditComponent } from './components/config-master/departments/departments-edit/departments-edit.component';
import { RolConfigListComponent } from './components/config-master/rol-config/rol-config-list/rol-config-list.component';
import { RolConfigAddComponent } from './components/config-master/rol-config/rol-config-add/rol-config-add.component';
import { RolConfigEditComponent } from './components/config-master/rol-config/rol-config-edit/rol-config-edit.component';
import { AddClientesComponent } from './components/config-master/clientes/add-clientes/add-clientes.component';
import { EditClientesComponent } from './components/config-master/clientes/edit-clientes/edit-clientes.component';
import { ListClientesComponent } from './components/config-master/clientes/list-clientes/list-clientes.component';

import { DashboardComponent } from './components/eservices-management/dashboard/dashboard.component';



import { LocationsModalComponent } from './components/eservices-management/modals/locations-modal/locations-modal.component';
import { CriticalReqComponent } from './components/eservices-management/modals/criticalReq-modal/critical-req.component';
import { WorkPreparationComponent } from './components/eservices-management/work-preparation/work-preparation.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { ProfileConfigComponent } from 'src/app/components/users/profile-config/profile-config.component'
import { EditProfileComponent } from 'src/app/components/users/edit-profile/edit-profile.component';
import { ViewWorkComponent } from './components/eservices-management/work-preparation/view-work/view-work.component';
import { EditWorkComponent } from './components/eservices-management/work-preparation/edit-work/edit-work.component'

import { WorkPhase1Component } from 'src/app/components/eservices-management/work-preparation/edit-work/work-phase1/work-phase1.component'
import { WorkPhase2Component } from './components/eservices-management/work-preparation/edit-work/work-phase2/work-phase2.component';
import { WorkPhase3Component } from './components/eservices-management/work-preparation/edit-work/work-phase3/work-phase3.component';
import { WorkPhase4Component } from './components/eservices-management/work-preparation/edit-work/work-phase4/work-phase4.component';

import { Phase1Component } from './components/eservices-management/work-preparation/edit-work/phase1/phase1.component';

import { NotificationComponent } from './components/notification/notification.component';
import { LoginComponent } from './components/login/login.component';


import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { IroCTComponent } from './components/eservices-management/IRO/iro-ct/iro-ct.component';
import { JobBriefComponent } from './components/eservices-management/jobBrief/job-brief/job-brief.component';
import { ClosingPhaseComponent } from './components/eservices-management/closing-phase/closing-phase.component';
import { EservicesHomeComponent } from './components/eservices-management/eservices-home/eservices-home.component';
import { BreadcumNavComponent } from './components/eservices-management/breadcum-nav/breadcum-nav.component';
import { LectionsComponent } from './components/eservices-management/lections/lections.component';

import { SuperFloatButtonComponent } from './components/eservices-management/super-float-button/super-float-button.component';

@NgModule({
  declarations: [
    AppComponent,

    SidenavbarComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,

    ProfileConfigComponent,
    Page404Component,
    Page404Component,


    EditProfileComponent,
    FooterComponent,
  
    JpactivityComponent,
    EservicesDashBoardComponent,
    StartManagementComponent,
    DescriptionComponent,
    Phase2ObjectivesComponent,

    DetailsManagementComponent,
   
    DepartmentsListComponent,
    DepartmentsAddComponent,
    DepartmentsEditComponent,
    RolConfigListComponent,
    RolConfigAddComponent,
    RolConfigEditComponent,
    AddClientesComponent,
    EditClientesComponent,
    ListClientesComponent,

    DashboardComponent,

    LocationsModalComponent,
    CriticalReqComponent,

    WorkPreparationComponent,
    WorkPhase1Component,
    UsersListComponent,
    ViewWorkComponent,
    EditWorkComponent,

    WorkPhase2Component,
    WorkPhase3Component,
    WorkPhase4Component,
    Phase1Component,
 
    NotificationComponent,
    LoginComponent,


    IroCTComponent, JobBriefComponent, ClosingPhaseComponent, EservicesHomeComponent, BreadcumNavComponent, LectionsComponent,
 SuperFloatButtonComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    MaterialModule,
    NgxPaginationModule,
    NgxMaterialTimepickerModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
