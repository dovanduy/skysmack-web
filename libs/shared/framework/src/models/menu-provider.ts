import { Observable } from 'rxjs';
import { MenuItem } from './menu-item';
import { MenuArea } from './menu-area';

export abstract class MenuProvider {
    public abstract id: string;
    public abstract translationPrefix: string;
    public abstract getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]>;
    public abstract getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]>;

    public getConnectedPackageMenuArea(): MenuArea {
        return new MenuArea({
            area: 'connected_packages',
            translationPrefix: 'UI.MISC.',
            order: 1000,
        });
    }
}
