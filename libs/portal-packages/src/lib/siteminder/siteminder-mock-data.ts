import { Guid } from 'guid-typescript';
import { LodgingType } from 'libs/packages/lodgings/src';
import { toLocalObject } from '@skysmack/framework';

/*
    - RatePlans as top dimension.
        > On rates expansion, each channel is shown
    - Channels as top dimension
*/

export enum TopColumnType {
    /**
     * Shows rate plans at the top (one for each).
     * Channels are shown as expanded data.
     */
    RatePlans,
    /**
    * Shows channels at the top (one for each).
    * Channels are shown as expanded data.
    */
    Channels
}

export class SiteMinderColumn {
    public id: string;
    public title: string;
    public expandable: boolean;

    constructor(init?: Partial<SiteMinderColumn>) {
        Object.assign(this, init);
        this.id = Guid.create().toString();
    }
}

export const lodgingTypes = [
    toLocalObject(new LodgingType({
        id: 1,
        name: 'Single'
    })),
    toLocalObject(new LodgingType({
        id: 2,
        name: 'Double'
    })),
    toLocalObject(new LodgingType({
        id: 3,
        name: 'Suite'
    }))
];

export const lodgingTypeColumn = lodgingTypes.map(lodgingType => {
    return new SiteMinderColumn({
        title: lodgingType.object.name
    });
});

export const columns = [
    new SiteMinderColumn({
        title: 'Date'
    }),
    ...lodgingTypeColumn
];

