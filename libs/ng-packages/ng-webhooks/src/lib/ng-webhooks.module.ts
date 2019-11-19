import { NgModule } from '@angular/core';
import { webhooksReducer, WEBHOOKS_REDUCER_KEY } from '@skysmack/packages-webhooks';
import { WebhooksEpics } from './webhooks/redux/ng-webhooks-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgWebhooksModule {
  constructor(
    webhooksEpics: WebhooksEpics,
  ) {
    registerRedux(WEBHOOKS_REDUCER_KEY, webhooksReducer, webhooksEpics);
  }
}
