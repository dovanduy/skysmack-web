import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from 'framework';

@Component({
  selector: 'ss-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss'],
})
export class StringFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public focusLost() {
    this.runRules();
  }
}
