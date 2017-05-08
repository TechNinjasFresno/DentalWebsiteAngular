import { Component, Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { IVendors } from './vendors.interface';
import { VendorsService } from './vendors.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})

@Injectable()

export class VendorsComponent implements OnInit {
  errorMessage: string;

  vendors: IVendors[];
 
  constructor(private _vendorsService: VendorsService){

  }
  ngOnInit(): void {
    this._vendorsService.getVendors()
    .subscribe(vendors => this.vendors = vendors,
        error => this.errorMessage = <any>error);
  }
}
