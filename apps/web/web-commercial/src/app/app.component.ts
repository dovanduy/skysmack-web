import { Component, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'skysmack-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {  
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;

  constructor() { }

  public onToggleSidenav = () => {
    this.sidenav.toggle();
  }
 
  public onSidenavClose = () => {
    this.sidenav.close();
  }
}
