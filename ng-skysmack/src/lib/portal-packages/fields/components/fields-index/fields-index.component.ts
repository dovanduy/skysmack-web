import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ss-fields-index',
  templateUrl: './fields-index.component.html',
  styleUrls: ['./fields-index.component.scss']
})
export class FieldsIndexComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(x => console.log(x));
  }

}
