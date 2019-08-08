import { AllowAccessFor } from '../permissions/allow-access-for';

export class MenuItem {
    public showLogic: Function;
    public providedIn: string[] = [];

    // Event Action Props
    public isActionEvent: boolean;
    public action: Function;
    public _this: any;

    // URL Action Props
    public url: string;
    public displayName: string;
    public area: string;
    public order: number;
    public icon: string;
    public permissions: string[];
    public display = true;
    public allowAccessFor: AllowAccessFor;

    public constructor(init?: Partial<MenuItem>) {
        Object.assign(this, init);
    }
    /**
     * Currently "only works" with edit and delete actions.
     * To be precise, the given url is used and gets the entity id/key appended.
     */
    public asUrlAction(url: string, displayName: string, icon: string): MenuItem {
        Object.assign(this, { isActionEvent: false, url, displayName, icon });
        return this;
    }

    public asEventAction(displayName: string, action: Function, icon: string, _this?: any): MenuItem {
        Object.assign(this, { isActionEvent: true, displayName, action, icon, _this });
        return this;
    }

    public setPermissions(permissions: string[]): MenuItem {
        this.permissions = permissions;
        return this;
    }

    public setShowLogic(showLogic: Function) {
        this.showLogic = showLogic;
        return this;
    }

    public runShowLogic(entity): boolean {
        return this.showLogic ? this.showLogic(entity) : true;
    }
}
