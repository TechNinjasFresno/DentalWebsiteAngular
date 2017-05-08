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
  errorMessage: string;

  employees: IEmployees[];
 
  constructor(private _employeesService: EmployeesService){

  }
  ngOnInit(): void {
    this._employeesService.getEmployees()
    .subscribe(employees => this.employees = employees,
        error => this.errorMessage = <any>error);
  }
}
