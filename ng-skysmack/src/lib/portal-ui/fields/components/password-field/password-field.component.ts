import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from 'framework';

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
