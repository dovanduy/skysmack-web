import { Component } from '@angular/core';
import { PersonPackageService } from 'person-package';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = this.personPackageService.sayHi();

  constructor(public personPackageService: PersonPackageService) { }
}
