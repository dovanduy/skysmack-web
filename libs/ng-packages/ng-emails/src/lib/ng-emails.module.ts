import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { EMAIL_TEMPLATES_REDUCER_KEY, emailTemplatesReducer } from '@skysmack/packages-emails';
import { NgEmailTemplatesEpics } from './email-templates/redux/ng-email-templates-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgEmailsModule {
  constructor(
    emailTemplatesEpics: NgEmailTemplatesEpics,
  ) {
    registerRedux(EMAIL_TEMPLATES_REDUCER_KEY, emailTemplatesReducer, emailTemplatesEpics);
  }
}
