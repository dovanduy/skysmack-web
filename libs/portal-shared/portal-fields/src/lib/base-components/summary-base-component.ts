import { Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { EntityActions } from '@skysmack/redux';
import { EditorNavService } from '@skysmack/portal-ui';

export class SummaryBaseComponent<TKey> {
    constructor(
        protected router: Router,
        protected editorNavService: EditorNavService,
        protected actions: EntityActions<any, TKey>,
        protected skysmackStore: NgSkysmackStore,
    ) { }
}
