import { PackagePathPayload } from './package-path-payload';

export interface GetSingleFieldPayload extends PackagePathPayload {
    fieldKey: string;
}
