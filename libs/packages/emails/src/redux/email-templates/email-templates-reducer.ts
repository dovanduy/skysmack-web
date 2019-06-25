import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { EmailTemplate } from '../../models/email-template';
import { EMAIL_TEMPLATES_REDUX_KEY, EMAIL_TEMPLATES_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access invoices via the GLOBAL state. E.g. state.invoices (where invoices is the reducer name.)
 */
export class EmailTemplatesAppState extends AppState {
    public invoices: EmailTemplateState;
}

export class EmailTemplateState implements RecordState<EmailTemplate, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<EmailTemplate, number>>> = {};
}

export function emailTemplatesReducer(state = new EmailTemplateState(), action: ReduxAction, prefix: string = EMAIL_TEMPLATES_REDUX_KEY): EmailTemplateState {
    state = sharedReducer(state, action, new EmailTemplateState(), EMAIL_TEMPLATES_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<EmailTemplateState, EmailTemplate, number>(state, action, prefix)
            };
    }
}
