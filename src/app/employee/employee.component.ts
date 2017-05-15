import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { IEmployees } from '../employees/employees.interface';
import { EmployeesService } from '../employees/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
    employee: IEmployees;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private employeeService: EmployeesService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let _id = +params['id'];
                this.getEmployee(_id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getEmployee(id: number) {
        this.employeeService.getEmployee(id).subscribe(
            employee => this.employee = employee,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/employees']);
    }
}