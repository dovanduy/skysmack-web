import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-sub-domain-field',
  templateUrl: './sub-domain-field.component.html'
})
export class SubDomainFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public focusLost() {
    this.runRules();
  }
}
