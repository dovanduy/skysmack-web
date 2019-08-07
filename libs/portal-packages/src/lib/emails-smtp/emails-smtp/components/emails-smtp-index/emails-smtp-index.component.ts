import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ss-emails-smtp-index',
  templateUrl: './emails-smtp-index.component.html'
})
export class EmailsSmtpIndexComponent implements OnInit {

  public static COMPONENT_KEY = 'emails-smtp';
  public componentKey: string = EmailsSmtpIndexComponent.COMPONENT_KEY;

  constructor(
  ) { }

  ngOnInit() {
  }
}
