import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ngUiComponents } from './components/ng-ui-components';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ngUIDirectives } from './directives/ng-ui-directives';

const material = [
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
];

@NgModule({
    imports: [
        CommonModule,
        ...material
    ],
    declarations: [
        ...ngUiComponents,
        ...ngUIDirectives
    ],
    exports: [
        ...ngUiComponents,
        ...ngUIDirectives,
        ...material
    ],
    providers: []
})
export class NgUIModule {
    constructor() { }
}
