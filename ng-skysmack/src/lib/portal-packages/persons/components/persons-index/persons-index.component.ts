import { Component, OnInit } from '@angular/core';
import { NgPersonsRequests } from './../../../../ng-packages/persons/redux/ng-persons-requests';
import { NgPersonsRedux } from './../../../../ng-packages/persons/redux/ng-persons-redux';

@Component({
  selector: 'ss-persons-index',
  templateUrl: './persons-index.component.html',
  styleUrls: ['./persons-index.component.scss']
})
export class PersonsIndexComponent implements OnInit {

  constructor(
    public personsRequests: NgPersonsRequests,
    public personsRedux: NgPersonsRedux,
  ) { }

  ngOnInit() { }

}
