import { NgModule } from '@angular/core';
import { templatesReducer, TEMPLATES_REDUCER_KEY } from '@skysmack/packages-templates';
import { TemplatesEpics } from './templates/redux/ng-templates-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgTemplatesModule {
  constructor(
    templatesEpics: TemplatesEpics,
  ) {
    registerRedux(TEMPLATES_REDUCER_KEY, templatesReducer, templatesEpics);
  }
}
