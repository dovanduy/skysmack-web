import { Input, OnDestroy, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubscriptionLike as ISubscription, Observable } from 'rxjs';
import { FormHelper, Field, FormRule } from '@skysmack/ng-ui';
import { pairwise, filter } from 'rxjs/operators';
import { SubscriptionHandler } from '@skysmack/framework';


interface AddedEvent {
    component: ElementRef;
    querySelector: string;
    event: string;
    callback: Function;
}

export abstract class FieldBaseComponent implements OnInit, OnDestroy {
    @Input() public fh: FormHelper;
    @Input() public field: Field;
    @Input() public fields$: Observable<Field[]>;
    @Input() public rules: FormRule[];

    public subscriptionHandler = new SubscriptionHandler();


    private oldFieldValue: string;
    private addedEvents: AddedEvent[] = [];
    public initted: boolean;

    ngOnInit() {
        // this.fh.form.valueChanges.subscribe(x => console.log('fh value changes', x));
        this.ensureControlExists();
        this.initFieldComponent();
    }

    public initFieldComponent() {
        this.subscriptionHandler.register(this.fields$.pipe(
            pairwise(),
            filter(values => !Object.is(JSON.stringify(values[0]), JSON.stringify(values[1])))
        ).subscribe(values => {
            const newFields = values[1];
            const newField = newFields.find(incomingField => incomingField.key === this.field.key);

            if (!Object.is(JSON.stringify(this.field), JSON.stringify(newField))) {
                this.field = newField;
                this.init(newFields);
            } else if (!this.initted) {
                this.init(newFields);
                this.initted = true;
            }
        }));
    }

    public abstract init(fields: Field[]): void;

    protected ensureControlExists() {
        if (!this.fh.form.get(this.field.key)) {
            this.fh.form.addControl(this.field.key, new FormControl());
        }
    }

    /**
     * Sets the value of a form field if the new value is not the same as the old.
     * @param newValue The new value to update the input with. Must have a [fieldControlName] binding.
     */
    protected setFieldValue(newValue: any) {
        const newValuesAsString = JSON.stringify(newValue);
        this.oldFieldValue = JSON.stringify(this.getFieldValue());
        if (this.oldFieldValue !== newValuesAsString) {
            this.fh.form.controls[this.field.key].setValue(newValue);
            this.oldFieldValue = newValuesAsString;
        }
    }

    protected setOtherFieldValue(fieldKey: string, newValue: any) {
        const fieldControl = this.fh.form.controls[fieldKey];

        if (fieldControl) {
            const newValuesAsString = JSON.stringify(newValue);
            this.oldFieldValue = JSON.stringify(this.getFieldValue());
            if (this.oldFieldValue !== newValuesAsString) {
                fieldControl.setValue(newValue);
                this.oldFieldValue = newValuesAsString;
            }
        } else {
            console.log(`
                Cannot find a field with the key ${fieldKey}. Check:
                Is the key spelled correctly?
            `);
        }
    }

    protected runAllRulesOfType(type: string, dependencies?: any) {
        this.rules.forEach(rule => {
            if (rule.type === type) {
                rule.runRule(this.fh.form, dependencies);
            }
        });
    }

    protected getFormField = (): FormControl => (this.fh.form.controls[this.field.key] as FormControl);

    protected getFieldValue() {
        const fieldValue = this.fh.form.controls[this.field.key].value;
        if (fieldValue == null) {
            return undefined;
        }
        return fieldValue;
    }

    protected getOtherFieldValue(fieldKey: string) {
        const field = this.fh.form.controls[fieldKey];
        if (field) {
            return field.value;
        }
        throw new Error('Field not found. Please add it to fields config, or fix typo');
    }

    protected extractSingleValueOfArray() {
        const field = this.fh.form.get(this.field.key);
        if (Array.isArray(field.value)) {
            field.setValue(field.value[0]);
        }
    }

    /**
     * Adds a classic javascript event listener to a component element.
     * The event listener is automatically removed when the component is destroyed
     * @param component The field components own ElementRef
     * @param querySelector The string to be run by the javascript .querySelector()
     * @param event Event to run the callback on. See https://developer.mozilla.org/en-US/docs/Web/Events for possible events.
     * @param callback The function to call when the event is fired.
     */
    protected addEvent(component: ElementRef, querySelector: string, event: string, callback: Function) {
        component.nativeElement
            .querySelector(querySelector).
            addEventListener(event, callback.bind(this));

        this.addedEvents.push({ component, querySelector, event, callback } as AddedEvent);
    }

    /**
     * Removes event listeners for any events added with addEvent() when ngOnDestroy is run.
     */
    private removeEvents() {
        this.addedEvents.forEach(addedEvent => addedEvent.component.nativeElement
            .querySelector(addedEvent.querySelector)
            .removeEventListener(addedEvent.event, addedEvent.callback.bind(this)));
    }

    protected subscribe(subscription: ISubscription): ISubscription {
        this.subscriptionHandler.register(subscription);
        return subscription;
    }

    protected runRules(dependencies?: any) {
        if (this.rules) {
            this.rules.forEach(rule => {
                if (rule.keys.some(key => this.field.key === key)) {
                    rule.runRule(this.fh.form, dependencies);
                }
            });
        }
    }

    ngOnDestroy() {
        this.subscriptionHandler.unsubscribe();
    }
}
