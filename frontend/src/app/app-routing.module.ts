import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './auth/login/login.component';
import { Page404Component } from './components/page404/page404.component';

import { AuthGuard } from './guards/auth.guard';

import { EservicesDashBoardComponent } from './components/eservices-dash-board/eservices-dash-board.component';
import {  StartManagementComponent } from './components/eservices-management/start-management.component';
import { DetailsManagementComponent } from './components/eservices-management/details-management/details-management.component';
import { JobBriefComponent } from 'src/app/components/eservices-management/jobBrief/job-brief/job-brief.component';

import { DepartmentsListComponent } from './components/config-master/departments/departments-list/departments-list.component';
import { DepartmentsAddComponent } from './components/config-master/departments/departments-add/departments-add.component';
import { DepartmentsEditComponent} from './components/config-master/departments/departments-edit/departments-edit.component';
import { RolConfigListComponent } from './components/config-master/rol-config/rol-config-list/rol-config-list.component';
import { RolConfigAddComponent } from './components/config-master/rol-config/rol-config-add/rol-config-add.component';
import { RolConfigEditComponent } from './components/config-master/rol-config/rol-config-edit/rol-config-edit.component';
import { AddClientesComponent } from './components/config-master/clientes/add-clientes/add-clientes.component'
import { EditClientesComponent } from './components/config-master/clientes/edit-clientes/edit-clientes.component';
import { ListClientesComponent } from './components/config-master/clientes/list-clientes/list-clientes.component';
import { DashboardComponent } from 'src/app/components/eservices-management/dashboard/dashboard.component';

import { WorkPreparationComponent } from 'src/app/components/eservices-management/work-preparation/work-preparation.component'




import { ProfileConfigComponent } from'src/app/components/users/profile-config/profile-config.component';
import { UsersListComponent } from 'src/app/components/users/users-list/users-list.component';
import { EditProfileComponent } from 'src/app/components/users/edit-profile/edit-profile.component'

import { WorkPhase2Component } from 'src/app/components/eservices-management/work-preparation/edit-work/work-phase2/work-phase2.component'; 
import { WorkPhase3Component} from 'src/app/components/eservices-management/work-preparation/edit-work/work-phase3/work-phase3.component';


import { IroCTComponent } from 'src/app/components/eservices-management/IRO/iro-ct/iro-ct.component';
import  { ClosingPhaseComponent } from 'src/app/components/eservices-management/closing-phase/closing-phase.component';
import { EservicesHomeComponent } from 'src/app/components/eservices-management/eservices-home/eservices-home.component';
import { LectionsComponent  } from 'src/app/components/eservices-management/lections/lections.component'
import { DescriptionComponent } from 'src/app/components/eservices-management/phase1-description/description.component'
import {  Phase2ObjectivesComponent } from 'src/app/components/eservices-management/phase2-objectives/phase2-objectives.component'



const routes: Routes = [ 
  {path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path: 'Auth', loadChildren: './auth/auth.module#AuthModule' },
  {path: 'home', component: HomeComponent,  canActivate: [AuthGuard] },

  {path: 'users/edit/:_id', component: EditProfileComponent , canActivate: [AuthGuard] }, //editar 1 empleado
  {path: 'users/list', component: UsersListComponent ,  canActivate: [AuthGuard]  }, //lista completa de empledos 
  // {path: 'users/profile', component: ProfileComponent,  canActivate: [AuthGuard]},

 // {path: 'eservices-management/start-management',component: StartManagementComponent, canActivate: [AuthGuard]},
  //{path: 'eservices-management/start-management/:n',component: StartManagementComponent, canActivate: [AuthGuard]},



  {path: 'eservices-management/start/1',component: DescriptionComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/start/1/:edit',component: DescriptionComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/start/1/:id',component: DescriptionComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/start/2/:id',component: Phase2ObjectivesComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/start/2/:id/:edit',component: Phase2ObjectivesComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/start/1/:id/:edit',component: DescriptionComponent, canActivate: [AuthGuard]},
 // {path: 'eservices-management/start/:n/:id',component: StartManagementComponent, canActivate: [AuthGuard]},


 // {path: 'eservices-management/start/:n/:id/:edit',component: StartManagementComponent, canActivate: [AuthGuard]},
  //{path: 'eservices-management/start-management/:n/:id/:edit',component: StartManagementComponent, canActivate: [AuthGuard]},
 // {path: 'eservices-management/details-management/:id', component: DetailsManagementComponent, canActivate:[AuthGuard]},
 // {path: 'eservices-management/details-management', component: DetailsManagementComponent, canActivate:[AuthGuard]},
 // {path: 'eservices-management/details-management/:n/:id', component: DetailsManagementComponent, canActivate:[AuthGuard]},
  {path: 'eservices-management/dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/workpreparation', component: WorkPreparationComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/workpreparation/:n/:id', component: WorkPreparationComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/workpreparation/:n/:id/:edit', component: WorkPreparationComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/workpreparation/:n/:id/:sl', component: WorkPreparationComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/workpreparation/:n/:id/:sl/:edit', component: WorkPreparationComponent, canActivate: [AuthGuard]},
  // {path: 'eservices-management/IRO/:sl/:id', component: IroCTComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/IRO/:sl/:id/:aprobator', component: IroCTComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/JobBrief/:managementId', component: JobBriefComponent, canActivate: [AuthGuard]},
  {path: 'eservices/home', component: EservicesHomeComponent, canActivate: [AuthGuard]}, 
  {path: 'eservices-management/JobBrief/:managementId/:viewOrEdit', component: JobBriefComponent, canActivate: [AuthGuard]},
  {path: 'eservices-management/closingPhase/:managementId/:viewOrEdit', component:  ClosingPhaseComponent , canActivate: [AuthGuard]},
  {path: 'eservices-management/closingPhase/:managementId', component:  ClosingPhaseComponent , canActivate: [AuthGuard]},
  {path: 'eservices-management/lections/:managementId/:viewOrEdit', component:  LectionsComponent , canActivate: [AuthGuard]},
  {path: 'eservices-management/lections/:managementId', component:  LectionsComponent , canActivate: [AuthGuard]},
  // {path: 'eservices-management/workpreparation/WorkPhase2Component/:n/:id', component: WorkPhase2Component, canActivate: [AuthGuard]},
  // {path: 'eservices-management/workpreparation/WorkPhase3Component/:n/:id', component: WorkPhase3Component, canActivate: [AuthGuard]},

  {path: 'config/departments', component: DepartmentsListComponent, canActivate: [AuthGuard]},
  {path: 'config/adddepartments', component: DepartmentsAddComponent, canActivate: [AuthGuard]},
  {path: 'config/editdepartments/:_id', component: DepartmentsEditComponent, canActivate: [AuthGuard]},
  {path: 'config/rols', component: RolConfigListComponent, canActivate: [AuthGuard]},
  {path: 'config/addrols', component: RolConfigAddComponent, canActivate: [AuthGuard]},
  {path: 'config/editrol/:_id', component: RolConfigEditComponent, canActivate: [AuthGuard]},
  {path: 'config/client/clientList', component: ListClientesComponent, canActivate: [AuthGuard]},
  {path: 'config/client/clientAdd', component: AddClientesComponent, canActivate: [AuthGuard]},
  {path: 'config/client/clientEdit/:_id', component: EditClientesComponent, canActivate: [AuthGuard]},
  

  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
