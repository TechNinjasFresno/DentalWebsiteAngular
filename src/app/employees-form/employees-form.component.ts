import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IEmployees } from '../employees/employees.interface';
import { EmployeesService } from '../employees/employees.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Edit Employee';
    errorMessage: String;
    employeeForm: FormGroup;

    employee: IEmployees;
    private sub: Subscription;

    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeesService) {
                
           this.validationMessages = {
            name: {
                required: 'Employee name is required.'
            },
            password: {
                required: 'Passoword is required.'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }


   ngOnInit(): void {
      this.employeeForm = this.fb.group({
        name: ['', [Validators.required]],
        password: ['', [Validators.required]],
        admin: false
      });    

    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['_id'];
        this.getEmployee(id);
      }
    )
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
      let controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.employeeForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.employeeForm);
      });
    }

    getEmployee(id: number): void {
      this.employeeService.getEmployee(id)
        .subscribe(
          (employee: IEmployees) => this.onEmployeeRetrieved(employee),
          (error: any) => this.errorMessage = <any>error
        );
    }
    onEmployeeRetrieved(employee: IEmployees): void {
        if (this.employeeForm) {
            this.employeeForm.reset();
        }
        this.employee = employee;

        if (this.employee._id === 0) {
            this.pageTitle = 'Add Employee';
        } else {
            this.pageTitle = `Edit Employee: ${this.employee.name}`;
        }

        // Update the data on the form
        this.employeeForm.patchValue({
            name: this.employee.name,
            password: this.employee.password,
            admin: this.employee.admin
        });
        }

    removeEmployee(): void {
        if (this.employee._id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the employee: ${this.employee.name}?`)) {
                this.employeeService.removeEmployee(this.employee._id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveEmployee(): void {
      if (this.employeeForm.dirty && this.employeeForm.valid) {
        let p = Object.assign({}, this.employeeForm.value);

        this.employeeService.saveEmployee(p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      } else if (!this.employeeForm.dirty) {
        this.onSaveComplete
      }
    }

    onSaveComplete(): void {
      this.employeeForm.reset();
      this.router.navigate(['/employee-add'])
    }
 
}
