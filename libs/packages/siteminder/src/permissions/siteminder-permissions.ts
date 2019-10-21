import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class SiteMinderPermissions {
    private static channels = 'Channels';
    private static ratePlans = 'RatePlans';

    public static findChannels = FIND + SiteMinderPermissions.channels;
    public static addChannels = ADD + SiteMinderPermissions.channels;
    public static updateChannels = UPDATE + SiteMinderPermissions.channels;
    public static removeChannels = REMOVE + SiteMinderPermissions.channels;

    public static findRatePlans = FIND + SiteMinderPermissions.ratePlans;
    public static addRatePlans = ADD + SiteMinderPermissions.ratePlans;
    public static updateRatePlans = UPDATE + SiteMinderPermissions.ratePlans;
    public static removeRatePlans = REMOVE + SiteMinderPermissions.ratePlans;
}