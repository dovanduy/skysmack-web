import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'ss-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() error: any;

  public production: boolean = environment.production;

  constructor() { }

  ngOnInit() {
  }
}
