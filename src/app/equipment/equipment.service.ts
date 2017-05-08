import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IEquipment } from './equipment.interface';

@Injectable()
export class EquipmentService {
  private _equipmentUrl = 'http://localhost:8000/api/equipment';

  constructor(private _http: Http){}

    getEquipment(): Observable<IEquipment[]> {
        return this._http.get(this._equipmentUrl)
          .map((response: Response) => <IEquipment[]> response.json())
          .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
    }

private handleError(error: Response) {
  console.error(error);
  return Observable.throw(error.json().error || 'Server error');
}

}
