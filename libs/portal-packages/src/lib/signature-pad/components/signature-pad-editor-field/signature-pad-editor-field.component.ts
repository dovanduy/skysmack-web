import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-signature-pad-editor-field',
  templateUrl: './signature-pad-editor-field.component.html'
})
export class SignaturePadEditorFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
