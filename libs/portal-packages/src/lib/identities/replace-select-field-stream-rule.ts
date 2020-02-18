import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { PagedQuery } from '@skysmack/framework';
import { debounceTime } from 'rxjs/operators';
import { NgTemplatesStore, NgTemplatesActions } from '@skysmack/ng-templates';

export class ReplaceSelectFieldStreamRule extends FormRule {
    private first = true;

    constructor(
        /*
         * Field keys this rule will run on
         */
        public keys: string[],
        private templatesStore: NgTemplatesStore,
        private templatesActions: NgTemplatesActions
    ) {
        super(keys);
    }

    protected rule(deps: { fields: Field[], selectedValue: string }) {
        const { fields, selectedValue } = deps;

        if (this.first) {
            this.first = false;
        } else {
            // Reset control values if a new package is selected.
            // This should not be done the first time this rule runs, 
            // as that would be when the form is created.
            const controls = this.getDefaultGroupControls();
            controls['confirmEmailTemplateId'].setValue(undefined);
            controls['resetPasswordTemplateId'].setValue(undefined);
        }

        // Get email templates for selected package
        if (selectedValue) {
            this.templatesActions.getPaged(selectedValue, new PagedQuery());
        }
        const result$ = this.templatesStore.get(selectedValue);

        const confirmEmailTemplateField = this.getField(fields, 'confirmEmailTemplateId') as SelectField;
        confirmEmailTemplateField.optionsData$ = result$.pipe(
            debounceTime(0),
            confirmEmailTemplateField.dataToOptions()
        );

        const resetPasswordTemplateField = this.getField(fields, 'resetPasswordTemplateId') as SelectField;
        resetPasswordTemplateField.optionsData$ = result$.pipe(
            debounceTime(0),
            confirmEmailTemplateField.dataToOptions()
        );
    }
}
