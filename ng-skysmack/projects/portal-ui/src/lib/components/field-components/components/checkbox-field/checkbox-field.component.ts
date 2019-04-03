import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-checkbox-field',
  templateUrl: './checkbox-field.component.html'
})
export class CheckboxFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
