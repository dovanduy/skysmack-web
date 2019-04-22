import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ss-card-body',
  templateUrl: './card-body.component.html'
})
export class CardBodyComponent implements OnInit {
  @HostBinding('class') classes = 'col-12 col-md-6 col-xl-4';
  @Input() public title: string;

  constructor() { }

  ngOnInit() {
  }

}
