import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MenuItem } from '../models/sidebar-menu/menu-item';

export abstract class MenuItemProvider {
    public static TOKEN = new InjectionToken<MenuItemProvider>('MenuItemProvider');
    public abstract menuId: string;
    public abstract icon: string;

    public abstract getItems(menuId: string, packagePath: string): Observable<MenuItem[]>;
}
