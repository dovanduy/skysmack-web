import { PersonsType } from '@skysmack/packages-persons';
import { PackageManifest } from 'lib/portal-ui';

export class PersonsManifest extends PersonsType implements PackageManifest {
    icon = 'face';
    location = 'main';
}
