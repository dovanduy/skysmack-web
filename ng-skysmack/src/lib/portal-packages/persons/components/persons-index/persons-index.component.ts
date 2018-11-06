import { Component, OnInit } from '@angular/core';
import { NgPersonsRequests, NgPersonsRedux } from 'lib/ng-packages';

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
