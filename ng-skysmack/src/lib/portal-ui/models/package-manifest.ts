import { PackageType } from '@skysmack/framework';

export interface PackageManifest extends PackageType {
    icon: string;
    location: string;
}