import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { Owner } from '../../models';

@Component({
  selector: 'ss-multiple-users-field',
  templateUrl: './multiple-users-field.component.html',
  styleUrls: ['./multiple-users-field.component.scss']
})
export class MultipleUsersFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  @ViewChild('emailInput', { static: false }) public emailInput: ElementRef;
  @ViewChild('passwordInput', { static: false }) public passwordInput: ElementRef;

  public owners: Owner[] = [];

  ngOnInit() {
    super.ngOnInit();
    this.owners = this.field.value ? this.field.value : [];
  }

  public add() {
    const email = this.emailInput.nativeElement.value;
    const password = this.emailInput.nativeElement.value;

    this.owners.push(new Owner({ email, password }));

    this.emailInput.nativeElement.value = '';
    this.passwordInput.nativeElement.value = '';

    this.setFieldValue(this.owners);
  }

  public remove(owner: Owner) {
    this.owners = this.owners.filter(addedOwner => addedOwner.email !== owner.email);
    this.setFieldValue(this.owners);
  }
}
