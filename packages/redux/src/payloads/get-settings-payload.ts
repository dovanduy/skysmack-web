import { PackagePathPayload } from './package-path-payload';

export interface GetSettingsPayload extends PackagePathPayload {
    settingKey: string;
}
