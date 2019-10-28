import { SiteMinderColumn } from '../../../models/siteminder-column';
import { StrIndex, LocalObject } from '@skysmack/framework';
import { LodgingTypeAvailability, LodgingTypeAvailabilityKey } from '@skysmack/packages-siteminder';
import { BehaviorSubject } from 'rxjs';
import { RateSummary } from '../../../models/rate-summary';
import { RateInfo } from '../../../models/rate-info';

export class UiOptions {
    public hideRates: boolean;
    public hideAvailability: boolean;
    public hideAll: boolean;
    public hideRestrictions: boolean;
    public hideChannels: number[];
    public hideRatePlans: number[];
    public hideLodgingTypes: number[];

    public constructor(init?: Partial<UiOptions>) {
        Object.assign(this, init);
    }
}

export class Columns {
    public dateColumn: SiteMinderColumn;
    public lodgingTypeColumns: SiteMinderColumn[];
    public availabilityColumns: StrIndex<SiteMinderColumn>;
    public ratePlanColumns: StrIndex<SiteMinderColumn[]>;
    public rateSummaryColumns: StrIndex<SiteMinderColumn>;
    public channelsColumns: StrIndex<SiteMinderColumn[]>;

    public constructor(init?: Partial<Columns>) {
        Object.assign(this, init);
    }
}

export class Cells {
    public availabilityCells: StrIndex<StrIndex<BehaviorSubject<LocalObject<LodgingTypeAvailability, LodgingTypeAvailabilityKey>>>>;
    public rateSummaryCells: StrIndex<StrIndex<StrIndex<BehaviorSubject<RateSummary>>>>;
    public channelsCells: StrIndex<StrIndex<StrIndex<StrIndex<BehaviorSubject<RateInfo>>>>>;
    
    public constructor(init?: Partial<Cells>) {
        Object.assign(this, init);
    }
}