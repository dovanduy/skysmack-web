import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { PersonPackageModule } from 'person-package';
import { RouterModule } from '@angular/router';
import { createStore, Store, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PersonPackageModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    // public ngRedux: NgRedux<any>,
    // public rootEpics: RootEpics
  ) {
    // this.configureRedux();
  }
}

//   configureRedux(): any {
//     const epicMiddleware = createEpicMiddleware();
//     const store: Store<any> = createStore(
//       rootReducer,
//       {},
//     );

//     this.ngRedux.provideStore(store);

//     epicMiddleware.run(this.rootEpics.getEpics());
//   }
// }

// function rootReducer(state: any, action) {
//   let newState: any;
//   switch (action.type) {
//     default:
//       newState = state;
//       break;
//   }

//   return appReducer(newState, action);
// }

// export interface IAppState {
//   // General
//   // persons?: PersonsState;
// }

// export const appReducer = combineReducers({
//   // persons: personsReducer
// } as any);

// @Injectable({
//   providedIn: 'root'
// })
// export class RootEpics {
//   constructor(
//     // Packages
//     // public personsEpics: PersonsEpics
//   ) { }

//   public getEpics = () => combineEpics(
//     // General
//     // this.personsEpics.getEpics(),
//   )
// }
