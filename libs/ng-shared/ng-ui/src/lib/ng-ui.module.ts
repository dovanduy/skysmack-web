import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ngUiComponents } from './components/ng-ui-components';
import { MaterialModule } from './material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
    ],
    declarations: [
        ...ngUiComponents
    ],
    exports: [
        MaterialModule,
        ...ngUiComponents
    ],
    providers: []
})
export class NgUIModule {
    constructor() { }
}
