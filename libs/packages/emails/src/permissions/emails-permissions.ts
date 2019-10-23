import { PREPARE } from '@skysmack/framework';

export class EmailsPermissions {
    private static emails = 'Emails';

    public static findPackages = PREPARE + EmailsPermissions.emails;
    
}