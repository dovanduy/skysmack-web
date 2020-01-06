import { Observable } from 'rxjs';
import { Summary } from './summary';

export abstract class SummaryProvider {
    public id: string;
    public abstract getSummaries(packagePath: string): Observable<Summary[]>;
}
