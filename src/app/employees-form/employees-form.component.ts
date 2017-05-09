import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Employee } from './employee.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  constructor() { }
    employeeForm: FormGroup;
    employee: Employee= new Employee();

   ngOnInit(): void {
      this.employeeForm = new FormGroup({
        name: new FormControl(),
        admin: new FormControl()
      });
    }


    save() {
      console.log(this.employeeForm);
      console.log('Saved: ' + JSON.stringify(this.employeeForm.value));
    }

 
}
