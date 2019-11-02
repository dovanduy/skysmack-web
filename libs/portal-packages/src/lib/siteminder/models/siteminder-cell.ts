import { TemplateRef } from '@angular/core';

export class SiteminderCell<TData> {
    public data: TData;
    public template: TemplateRef<any>;

    constructor(init?: Partial<SiteminderCell<TData>>) {
        Object.assign(this, init);
    }
}
