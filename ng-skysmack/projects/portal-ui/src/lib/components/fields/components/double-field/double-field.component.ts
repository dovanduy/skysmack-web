import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

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
