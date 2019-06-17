import { Component, OnInit } from '@angular/core';
import { NgEmailsSmtpMenu } from '../../ng-emails-smtp-menu';

@Component({
  selector: 'ss-emails-smtp-index',
  templateUrl: './emails-smtp-index.component.html'
})
export class EmailsSmtpIndexComponent implements OnInit {
  constructor(
    public sidebarMenu: NgEmailsSmtpMenu
  ) { }

  ngOnInit() {
  }
}
