import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-time-field',
  templateUrl: './time-field.component.html'
})
export class TimeFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
