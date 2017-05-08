import { Component, Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { IEquipment } from './equipment.interface';
import { EquipmentService } from './equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
@Injectable()

export class EquipmentComponent implements OnInit {
  errorMessage: string;

  equipment: IEquipment[];
 
  constructor(private _equipmentService: EquipmentService){

  }
  ngOnInit(): void {
    this._equipmentService.getEquipment()
    .subscribe(equipment => this.equipment = equipment,
        error => this.errorMessage = <any>error);
  }
}