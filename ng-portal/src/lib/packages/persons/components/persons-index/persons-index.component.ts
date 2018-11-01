import { Component, OnInit } from '@angular/core';
import { PersonsRequests } from 'packages/persons/redux/persons-requests';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent implements OnInit {

  constructor(
    public personsRequests: PersonsRequests
  ) { }

  ngOnInit() {
    console.log(this.personsRequests);
  }

}
