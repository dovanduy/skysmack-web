import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { ResultField } from '@skysmack/ng-ui';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-result-field',
  templateUrl: './result-field.component.html'
})
export class ResultFieldComponent extends FieldBaseComponent<ResultField> implements OnInit {
  public result$: Observable<string>;
  ngOnInit() {
    super.ngOnInit();
    this.result$ = this.fh.form.valueChanges.pipe(
      map(changes => {
        return this.field.resultLogic(changes, this.fields, this.fh.form);
      })
    );
  }
}
