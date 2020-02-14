import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getMenuEntries, getCombinedMenuEntries } from '@skysmack/ng-framework';
import { WorkflowsTypeId } from '@skysmack/package-types';
import { DefinitionsIndexComponent } from './workflows/components/definitions-index/definitions-index.component';

@Injectable({ providedIn: 'root' })
export class NgDefinitionsIndexMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private workflowsTranslationPrefix = 'WORKFLOWS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(
                packagePath,
                WorkflowsTypeId,
                componentKey,
                DefinitionsIndexComponent.COMPONENT_KEY,
                this.getWorkflowsMenuAreas,
                this.store
            )
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(
                packagePath,
                WorkflowsTypeId,
                componentKey,
                DefinitionsIndexComponent.COMPONENT_KEY,
                this.getWorkflowsMenuItems,
                this.store
            )
        );
    };

    //#region Workflows
    private getWorkflowsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.workflowsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.workflowsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getWorkflowsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.workflowsTranslationPrefix + 'CREATE',
                area: 'actions',
                hotkeyOptions: {
                    keyCode: 67,
                    altKey: true,
                    action: `/${packagePath}/create`
                },
                order: 1,
                icon: 'add',
                permissions: [
                    // WorkflowsPermissions.addWorkflows
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            new MenuItem({
                url: 'settings',
                displayName: this.workflowsTranslationPrefix + 'SETTINGS',
                area: 'manage',
                order: 1,
                icon: 'add',
                permissions: [],
                providedIn: [SIDEBAR]
            })
        ];
    };
    //#endregion
}