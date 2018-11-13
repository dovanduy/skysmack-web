import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle } from './../../../../../../../lib/portal-ui/models/entity-component-page-title';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'ss-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

  constructor(public componentPageTitle: EntityComponentPageTitle) { }

  ngOnInit() {
    this.componentPageTitle.setTitle('Skysmack', true);
  }

}
