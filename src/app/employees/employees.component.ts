import { Component, Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { IEmployees } from './employees.interface';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

@Injectable()

export class EmployeesComponent implements OnInit {

  employees: IEmployees[] = [];
 
  constructor(private _employeesService: EmployeesService){

  }
  ngOnInit() {
    this.employees = this._employeesService.getEmployees();
  }
}
