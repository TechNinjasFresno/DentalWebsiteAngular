import { Component } from '@angular/core';
import { EmployeesService } from './employees/employees.service';
import { EquipmentService } from './equipment/equipment.service';
import { VendorsService } from './vendors/vendors.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ EmployeesService, EquipmentService, VendorsService ]
})
export class AppComponent {
  title = 'Dental Equipment Tracking';
}
