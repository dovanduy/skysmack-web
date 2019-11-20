import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { Template } from '../../models/template';
import { sharedReducer } from '@skysmack/redux';
import { TEMPLATES_REDUX_KEY, TEMPLATES_REDUCER_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access templates via the GLOBAL state. E.g. state.templates (where templates is the reducer name.)
 */
export class TemplatesAppState extends AppState {
    public templates: TemplatesState;
}

export class TemplatesState implements RecordState<Template, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<Template, number>>> = {};
}

export function templatesReducer(state = new TemplatesState(), action: ReduxAction, prefix: string = TEMPLATES_REDUX_KEY): TemplatesState {
    state = sharedReducer(state, action, new TemplatesState(), TEMPLATES_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<TemplatesState, Template, number>(state, action, prefix)
            };
    }
}
