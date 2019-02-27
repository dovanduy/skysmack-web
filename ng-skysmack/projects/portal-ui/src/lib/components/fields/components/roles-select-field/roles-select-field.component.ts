import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-roles-select-field',
  templateUrl: './roles-select-field.component.html',
  styleUrls: ['./roles-select-field.component.scss']
})
export class RolesSelectFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
