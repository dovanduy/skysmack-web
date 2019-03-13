import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-double-field',
  templateUrl: './double-field.component.html',
  styleUrls: ['./double-field.component.scss']
})
export class DoubleFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
