import { Component, OnInit } from '@angular/core';
import { NgTerminalsActions, NgTerminalsStore } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { HttpClient } from '@angular/common/http';
import { SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-terminals-actions',
  templateUrl: './terminals-actions.component.html',
  styleUrls: ['./terminals-actions.component.scss']
})
export class TerminalsActionsComponent extends BaseComponent<TerminalsAppState, unknown> implements OnInit {
  public selectedOption: any;
  public message: string;

  public options: SelectFieldOption[] = [
    {
      value: 1,
      displayName: 'First option'
    },
    {
      value: 2,
      displayName: 'Second option'
    },
    {
      value: 3,
      displayName: 'Third option'
    }
  ]

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgTerminalsStore,
    public httpClient: HttpClient
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    this.editorNavService.showEditorNav();
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }

  public submit() {
    this.message = '';
    const url = 'url';
    const body = {};
    if (this.selectedOption) {
      // this.httpClient.post<any>(url, body, { observe: 'response' }).pipe(
      //   tap(x => console.log(XPathExpression)),
      //   take(1),
      // ).subscribe();
    } else {
      this.message = 'Please choose an action'
    }

    // Prevents form submit causing a page reload.
    return false;
  }
}
