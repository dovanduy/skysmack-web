import { Dashboard } from '../models';
import { Observable } from 'rxjs';

export abstract class DashboardProvider {
    public abstract id: string;
    public abstract getDashboards(): Observable<Dashboard[]>;
}
