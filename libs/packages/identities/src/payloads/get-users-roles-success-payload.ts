import { UserRoles } from '../models/user-roles';

export class GetUsersRolesSuccessPayload {
    userRoles: UserRoles[];
    packagePath: string;
}