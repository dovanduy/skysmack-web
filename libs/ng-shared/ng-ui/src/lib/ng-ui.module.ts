import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ngUiComponents } from './components/ng-ui-components';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...ngUiComponents
    ],
    exports: [
        ...ngUiComponents
    ],
    providers: []
})
export class NgUIModule {
    constructor() { }
}
