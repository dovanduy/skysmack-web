import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Menu } from '@skysmack/ng-ui';
import { UIRedux } from './../../../redux/ui-redux';
import { StandardSettingsRedux } from './../../../redux/settings/standard-settings-redux';

@Component({
  selector: 'ss-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  public menu$: Observable<Menu>;

  constructor(
    public translate: TranslateService,
    public settingsRedux: StandardSettingsRedux,
    public redux: UIRedux
  ) {

  }

  ngOnInit() {
    // Get menu
    this.menu$ = this.redux.getMenu();
  }

  public setLanguage(selectedLanguage: string) {
    if (selectedLanguage.length > 0) {
      this.settingsRedux.setLanguage(selectedLanguage);
    }
  }

  public toLangString(lang: string) {
    switch (lang) {
      case 'da':
        return 'Dansk';
      case 'en':
        return 'English';
      default:
        return lang;
    }
  }
}