import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-field-permission-field',
  templateUrl: './field-permission-field.component.html',
  styleUrls: ['./field-permission-field.component.scss']
})
export class FieldPermissionFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
    super.ngOnInit();
  }

}
