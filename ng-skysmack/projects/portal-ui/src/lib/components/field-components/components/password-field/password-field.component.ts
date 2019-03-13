import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
