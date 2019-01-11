import { StrIndex } from '@skysmack/framework';

export class GetUsersRolesSuccessPayload {
    userRoles: StrIndex<number[]>;
    packagePath: string;
}