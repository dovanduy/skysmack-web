import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-multi-file-upload-field',
  templateUrl: './multi-file-upload-field.component.html'
})
export class MultiFileUploadFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public inputChanged(event) {
    console.log(event.target.value);
  }
}
