import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss']
})
export class CheckboxFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public init(fields: Field[]) { }
}
