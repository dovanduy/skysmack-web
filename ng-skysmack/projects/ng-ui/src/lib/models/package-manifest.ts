import { PackageType } from '@skysmack/framework';

export interface PackageManifest extends PackageType {
    id: string;
    icon: string;
    menuLocation: string;
    modulePath: string;
}
