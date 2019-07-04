import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from '@skysmack/framework';

@Pipe({ name: 'showMenuItemAction', pure: false })
export class ShowMenuItemActionPipe implements PipeTransform {
    transform(menuItemAction: MenuItem, entity: any) {
        return menuItemAction.runShowLogic(entity);
    }
}
