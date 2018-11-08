import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ss-context-sidebar',
  templateUrl: './context-sidebar.component.html',
  styleUrls: ['./context-sidebar.component.scss']
})
export class ContextSidebarComponent implements OnInit {

  public dropDown = false;

  constructor() { }

  ngOnInit() {
  }

  toggleDropDown() {
    if (this.dropDown) {
      this.dropDown = false;
    } else {
      this.dropDown = true;
    }
  }

}
