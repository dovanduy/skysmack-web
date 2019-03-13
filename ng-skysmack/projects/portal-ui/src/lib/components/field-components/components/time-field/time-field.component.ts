import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-time-field',
  templateUrl: './time-field.component.html',
  styleUrls: ['./time-field.component.scss']
})
export class TimeFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
