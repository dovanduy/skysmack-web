import { LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

export interface SettingsStore {
    get<TSetting>(packagePath: string, settingsKey: string): Observable<LocalObject<TSetting, unknown>>;
}
