import {MatButtonModule, MatCheckboxModule, MatFormField, MatFormFieldModule, MatTableDataSource} from '@angular/material';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule,MatPaginatorModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [MatDatepickerModule,MatPaginatorModule, MatTableModule, MatFormFieldModule, MatMenuModule,MatTableModule,MatButtonModule,MatChipsModule, MatCheckboxModule,BrowserAnimationsModule,MatSidenavModule,MatToolbarModule,MatIconModule],
  exports: [MatDatepickerModule,MatPaginatorModule, MatTableModule , MatFormFieldModule, MatMenuModule,MatTableModule, MatButtonModule,MatChipsModule, MatCheckboxModule,BrowserAnimationsModule,MatSidenavModule,MatToolbarModule,MatIconModule],
})
export class MaterialModule { }  