import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { EmployeesComponent } from './employees/employees.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VendorsComponent } from './vendors/vendors.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employee/:id', component: EmployeeComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee-add', component: EmployeesFormComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
    declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeesFormComponent,
    EmployeesComponent,
    EquipmentComponent,
    HomeComponent,
    LoginComponent,
    VendorsComponent

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
