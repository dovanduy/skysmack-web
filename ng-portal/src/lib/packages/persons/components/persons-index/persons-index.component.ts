import { Component, OnInit } from '@angular/core';
import { Person } from '@skysmack/packages-persons';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const person: Person = new Person({
      Id: 2
    });

    console.log(person);
  }

}
