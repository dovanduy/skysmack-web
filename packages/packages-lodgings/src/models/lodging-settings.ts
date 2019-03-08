export class LodgingSettings {
    public name: string = '';
    public DefaultCheckIn: Date = new Date();
    public DefaultCheckOut: Date = new Date();
    public timeZoneId: string = '';

    constructor(values: Partial<LodgingSettings>) {
        Object.assign(this, values);
    }
}