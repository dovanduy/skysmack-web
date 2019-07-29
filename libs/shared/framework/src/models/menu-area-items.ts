import { MenuArea } from './menu-area';
import { MenuItem } from './menu-item';

export class MenuAreaItems {
    public area: MenuArea;
    public items: MenuItem[];
    public providedIn: string[] = [];

    public constructor(init?: Partial<MenuAreaItems>) {
        Object.assign(this, init);
    }
}
