import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-limited-string-field',
  templateUrl: './limited-string-field.component.html',
  styleUrls: ['./limited-string-field.component.scss'],
  animations: [
    trigger(
      'shrinkOut',
      [
        transition(
          ':enter', [
            style({ height: 0, opacity: 0.5 }),
            animate('.1s', style({ height: '*', 'opacity': 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ height: '*', 'opacity': 1 }),
            animate('.1s', style({ height: 0, 'opacity': 0 }))
          ]
        )]
    )
  ]
})
export class LimitedStringFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public charsLeft: number;
  public show: boolean;
  private maxLength = 255;

  ngOnInit() {
    super.ngOnInit();
    this.setCharsLeft();
  }

  public setCharsLeft() {
    this.subscriptionHandler.register(this.fh.form.valueChanges.subscribe(() => {
      const fieldValue = (this.getFieldValue() as string);
      let length: number;

      if (fieldValue) {
        length = fieldValue.length;
      }

      if (length) {
        this.charsLeft = this.maxLength - length;
      } else {
        this.charsLeft = this.maxLength;
      }
    }));
  }

  public focusLost() {
    this.runRules();
  }
}
