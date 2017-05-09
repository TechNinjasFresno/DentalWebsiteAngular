import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { VendorsComponent } from './vendors/vendors.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee', component: EmployeesFormComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
    declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    HomeComponent,
    EquipmentComponent,
    VendorsComponent,
    EmployeesFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
