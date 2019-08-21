import { NgModule } from '@angular/core';
import { directives } from './directives/directives';

@NgModule({
    imports: [],
    declarations: [
        ...directives
    ],
    providers: []
})
export class NgFrameworkModule {
    constructor() { }
}
