import { PackageType } from '@skysmack/framework';
import { IdentitiesTypeId } from './identities-type';

export const OAuth2TypeId = 'e9d53bca-2906-4130-959b-c9928d73c66c';

export class OAuth2Type implements PackageType {
  id = OAuth2TypeId;
  dependencies = [IdentitiesTypeId];
}
