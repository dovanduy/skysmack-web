import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class TemplatesPermissions {
    private static templates = 'Templates';

    public static findTemplates = FIND + TemplatesPermissions.templates;
    public static addTemplates = ADD + TemplatesPermissions.templates;
    public static updateTemplates = UPDATE + TemplatesPermissions.templates;
    public static removeTemplates = REMOVE + TemplatesPermissions.templates;
}