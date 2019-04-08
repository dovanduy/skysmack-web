import { Component, OnInit, Input } from '@angular/core';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-backend-errors',
  templateUrl: './backend-errors.component.html'
})
export class BackendErrorsComponent implements OnInit {

  @Input()
  public field: Field;

  constructor() { }

  ngOnInit() {
  }

}
