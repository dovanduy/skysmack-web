import { NumIndex } from '@skysmack/framework';

export class GetApplicationsRolesSuccessPayload {
    applicationRoles: NumIndex<string[]>;
    packagePath: string;
}