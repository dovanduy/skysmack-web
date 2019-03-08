import { LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

export interface SettingsStore {
    get(packagePath: string): Observable<LocalObject<any, unknown>>;
}
