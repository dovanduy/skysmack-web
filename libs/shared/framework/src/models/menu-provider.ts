import { Observable } from 'rxjs';
import { MenuItem, MenuArea } from '@skysmack/framework';

export abstract class MenuProvider {
    public abstract id: string;
    public abstract translationPrefix: string;
    public abstract getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]>;
    public abstract getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]>;
}
