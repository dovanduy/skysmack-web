import { Guid } from 'guid-typescript';

export class Room {
    public id: string;
    public numberOfPeople: number;

    constructor(values?: Partial<Room>) {
        Object.assign(this, values);
        this.id = Guid.create().toString();
    }
}