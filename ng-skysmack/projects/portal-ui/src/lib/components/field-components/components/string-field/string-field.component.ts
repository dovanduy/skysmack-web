import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss'],
})
export class StringFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public focusLost() {
    this.runRules();
  }
}
