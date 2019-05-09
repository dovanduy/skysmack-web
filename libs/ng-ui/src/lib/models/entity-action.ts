export class EntityAction {

    public show = true;
    public showLogic: Function;

    // Event Action Props
    public isActionEvent: boolean;
    public action: Function;
    public _this: any;

    // URL Action Props
    public url: string;
    public urlPostfix: string;
    public displayName: string;
    public area: string;
    public order: number;
    public icon: string;

    constructor() { }

    /**
     * Currently "only works" with edit and delete actions.
     * To be precise, the given url is used and gets the entity id/key appended.
     */
    public asUrlAction(url: string, displayName: string, icon: string, urlPostfix: string = ''): EntityAction {
        Object.assign(this, { isActionEvent: false, url, displayName, icon, urlPostfix: urlPostfix });
        return this;
    }

    public asEventAction(displayName: string, action: Function, icon: string, _this?: any): EntityAction {
        Object.assign(this, { isActionEvent: true, displayName, action, icon, _this });
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
