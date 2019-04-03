import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';

@Component({
  selector: 'ss-string-field',
  templateUrl: './string-field.component.html'
})
export class StringFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public focusLost() {
    this.runRules();
  }
}
