import { PersonsType } from '@skysmack/packages-persons';
import { PackageManifest } from './../../portal-ui/models/package-manifest';

export class PersonsPackageManifest extends PersonsType implements PackageManifest {
    icon = 'face';
    location = 'main';
}
