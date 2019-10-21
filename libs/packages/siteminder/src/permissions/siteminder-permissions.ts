import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class SiteMinderPermissions {
    private static channels = 'Channels';
    public static findChannels = FIND + SiteMinderPermissions.channels;
    public static addChannels = ADD + SiteMinderPermissions.channels;
    public static updateChannels = UPDATE + SiteMinderPermissions.channels;
    public static removeChannels = REMOVE + SiteMinderPermissions.channels;
}