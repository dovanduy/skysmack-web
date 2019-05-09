import { Observable } from 'rxjs';
import { EntityAction } from '@skysmack/ng-ui';
import { LocalObject } from '@skysmack/framework';

export abstract class EntityActionProvider {
    public abstract getEntityActions(packagePath: string, area: string, entity?: LocalObject<any, any>): Observable<EntityAction[]>;
}
