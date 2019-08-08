import { Observable } from 'rxjs';
import { MenuItem } from './menu-item';
import { MenuArea } from './menu-area';

export interface MenuProvider {
    id: string;
    translationPrefix: string;
    getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]>;
    getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]>;
}
