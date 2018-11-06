import { Component, OnInit } from '@angular/core';
import { PersonsRequests, PersonsRedux } from 'packages/persons/redux';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent implements OnInit {

  constructor(
    public personsRequests: PersonsRequests,
    public personsRedux: PersonsRedux,
  ) { }

  ngOnInit() {
    this.personsRedux.test();
  }

}
