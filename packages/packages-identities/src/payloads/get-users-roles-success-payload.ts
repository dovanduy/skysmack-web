import { StrIndex } from '@skysmack/framework';

export class GetUsersRolesSuccessPayload {
    userRoles: StrIndex<string[]>;
    packagePath: string;
}