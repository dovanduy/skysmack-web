import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class WebhooksPermissions {
    private static webhooks = 'Webhooks';

    public static findWebhooks = FIND + WebhooksPermissions.webhooks;
    public static addWebhooks = ADD + WebhooksPermissions.webhooks;
    public static updateWebhooks = UPDATE + WebhooksPermissions.webhooks;
    public static removeWebhooks = REMOVE + WebhooksPermissions.webhooks;
}