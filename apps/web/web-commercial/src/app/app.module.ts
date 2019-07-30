import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@skysmack/portal-ui';
import { commercialAccountRoute } from './packages/commercial_account_wrapper.module';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      commercialAccountRoute,
      {
        path: 'test', component: TestComponent
      }
    ], { initialNavigation: 'enabled' }),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
