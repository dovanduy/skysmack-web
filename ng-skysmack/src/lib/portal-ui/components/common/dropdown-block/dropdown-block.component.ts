import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ss-dropdown-block',
  templateUrl: './dropdown-block.component.html',
  styleUrls: ['./dropdown-block.component.scss'],
  animations: [
    trigger(
      'fadeInOut',
      [
        transition(
          ':enter', [
            style({ right: '-190px', opacity: 0.5 }),
            animate('.1s', style({ right: 0, 'opacity': 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ right: 0, 'opacity': 1 }),
            animate('.1s', style({ right: '-190px', 'opacity': 0 }))
          ]
        )]
    )
  ]
})
export class DropDownBlockComponent implements OnInit {
  ngOnInit() {
  }
}
