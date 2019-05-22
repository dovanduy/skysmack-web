import { Pipe, PipeTransform } from '@angular/core';
import { EntityAction } from '@skysmack/ng-ui';

@Pipe({ name: 'showEntityAction', pure: false })
export class ShowEntityActionPipe implements PipeTransform {
    transform(entityAction: EntityAction, entity: any) {
        return entityAction.runShowLogic(entity);
    }
}
