import { Component, OnInit } from '@angular/core';
import { NgTerminalsActions, NgTerminalsStore } from '@skysmack/ng-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-terminals-process',
  templateUrl: './terminals-process.component.html'
})
export class TerminalsProcessComponent extends BaseComponent<TerminalsAppState, unknown> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgTerminalsStore,
  ) {
    super(router, activatedRoute, skysmackStore);
  }


  ngOnInit() {
    this.editorNavService.showEditorNav();
    super.ngOnInit();
  }

  public cancel() {
    this.router.navigate([this.router.url.substring(0, this.router.url.length - 11), 'pay']);
  }
}
