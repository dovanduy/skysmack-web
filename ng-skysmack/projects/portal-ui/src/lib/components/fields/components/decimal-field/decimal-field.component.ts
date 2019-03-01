import { Component } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-decimal-field',
  templateUrl: './decimal-field.component.html',
  styleUrls: ['./decimal-field.component.scss']
})
export class DecimalFieldComponent extends FieldBaseComponent {

  public init(fields: Field[]) { }
}
