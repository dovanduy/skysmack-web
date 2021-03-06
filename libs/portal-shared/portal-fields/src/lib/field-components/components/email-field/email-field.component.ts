import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';

@Component({
  selector: 'ss-email-field',
  templateUrl: './email-field.component.html',
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
export class EmailFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
