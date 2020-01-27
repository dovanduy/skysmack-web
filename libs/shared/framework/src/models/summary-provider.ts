import { Observable } from 'rxjs';
import { Summary } from './summary';

export abstract class SummaryProvider<TKey> {
    public id: string;
    public abstract getSummaries(packagePath: string, entityId: TKey): Observable<Summary<TKey>[]>;
}
