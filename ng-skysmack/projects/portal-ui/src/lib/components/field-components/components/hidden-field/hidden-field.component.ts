import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-hidden-field',
  templateUrl: './hidden-field.component.html'
})
export class HiddenFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() { super.ngOnInit(); }
}
