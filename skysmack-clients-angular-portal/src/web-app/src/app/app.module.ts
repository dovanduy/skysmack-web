import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonPackageModule } from 'person-package';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PersonPackageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
