import { Observable } from 'rxjs';
import { MenuItem } from './../models/menu-item';

export abstract class MenuItemProvider {
    public abstract id: string;
    public abstract menuId: string;
    public abstract icon: string;

    public abstract getItems(menuId: string, packagePath: string): Observable<MenuItem[]>;
}
