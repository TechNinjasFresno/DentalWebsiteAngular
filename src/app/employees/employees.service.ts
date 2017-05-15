import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { IEmployees } from './employees.interface';

@Injectable()
export class EmployeesService {
  private _employeesUrl = 'http://localhost:8000/api/employees';

  constructor(private _http: Http){}

    getEmployees(): Observable<IEmployees[]> {
        return this._http.get(this._employeesUrl)
          .map((response: Response) => <IEmployees[]> response.json())
          .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
    }

    getEmployee(id: number): Observable<IEmployees> {
      if (id === 0) {
          return Observable.of(this.initializeEmployee());
      };
      
      const url = `${this._employeesUrl}/${id}`;
      return this._http.get(url)
        .map(this.extractData)
        .do(data => console.log('get employee: ' + JSON.stringify(data)))
        .catch(this.handleError);
    }

    removeEmployee(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this._employeesUrl}/${id}`;
        return this._http.delete(url, options)
            .do(data => console.log('deleteEmployee: ' + JSON.stringify(data)))
            .catch(this.handleError);        
    }

    saveEmployee(employee: IEmployees): Observable<IEmployees> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (employee._id === 0) {
            return this.createEmployee(employee, options);
        }
        return this.updateEmployee(employee, options);
    }
   private createEmployee(employee: IEmployees, options: RequestOptions): Observable<IEmployees> {
        employee._id = undefined;
        return this._http.post(this._employeesUrl, employee, options)
            .map(this.extractData)
            .do(data => console.log('createEmployee: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateEmployee(employee: IEmployees, options: RequestOptions): Observable<IEmployees> {
        const url = `${this._employeesUrl}/${employee._id}`;
        return this._http.put(url, employee, options)
            .map(() => employee)
            .do(data => console.log('updateEmployee: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeEmployee(): IEmployees {
        return {
            _id: 0,
            name: null,
            password: null,
            admin: null
        };
    }

}
