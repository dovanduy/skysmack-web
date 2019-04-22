import { NumIndex } from '@skysmack/framework';

export class GetUsersRolesSuccessPayload {
    userRoles: NumIndex<string[]>;
    packagePath: string;
}