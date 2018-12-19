import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ss-dynamic-fields-index',
  templateUrl: './dynamic-fields-index.component.html',
  styleUrls: ['./dynamic-fields-index.component.scss']
})
export class DynamicFieldsIndexComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(x => console.log(x));
  }

}
