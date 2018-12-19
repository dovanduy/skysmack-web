import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ss-fields-create',
  templateUrl: './fields-create.component.html',
  styleUrls: ['./fields-create.component.scss']
})
export class FieldsCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('FieldsCreateComponent hit');
  }

}
