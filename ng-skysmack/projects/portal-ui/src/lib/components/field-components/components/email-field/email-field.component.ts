import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss'],
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
export class EmailFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }
}
