import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ss-persons-create',
  templateUrl: './persons-create.component.html',
  styleUrls: ['./persons-create.component.scss']
})
export class PersonsCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('CREATE!')
  }

}
