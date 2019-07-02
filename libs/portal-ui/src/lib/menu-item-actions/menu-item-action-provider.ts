import { Observable } from 'rxjs';
import { LocalObject, MenuItem } from '@skysmack/framework';

export abstract class MenuItemActionProvider {
    public abstract getMenuItemActions(packagePath: string, area: string, entity?: LocalObject<any, any>): Observable<MenuItem[]>;
}
