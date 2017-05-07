import { Injectable } from '@angular/core';

import { IEmployees } from './employees.interface'

@Injectable()
export class EmployeesService {

    getEmployees(): IEmployees[] {
        return[
  {
    "_id": "590e3b59311d8701a0fcf866",
    "name": "Allen",
    "password": "password007",
    "admin": true
  },
  {
    "_id": "590e3c50311d8701a0fcf868",
    "name": "Eric",
    "password": "password789",
    "admin": false
  },
  {
    "_id": "590e3c3e311d8701a0fcf867",
    "name": "Kevin",
    "password": "password456",
    "admin": false
  },
  {
    "_id": "590e3c5e311d8701a0fcf869",
    "name": "Taylor",
    "password": "password123",
    "admin": true
  }
];
    }
}