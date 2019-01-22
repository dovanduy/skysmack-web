import { PackagePathPayload } from './package-path-payload';

export interface GetIntervalPayload extends PackagePathPayload {
    start: string;
    end: string;
}
