import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonPackageService {

  constructor() { }

  sayHi(): string {
    return 'Hi from person package!';
  }
}
