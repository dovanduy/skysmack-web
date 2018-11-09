import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Menu } from './../../../models/menu';
import { UIRedux } from './../../../redux/ui-redux';
import { SettingsRedux } from './../../../redux/settings/settings-redux';

@Component({
  selector: 'ss-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  public menu$: Observable<Menu>;

  constructor(
    public translate: TranslateService,
    public settingsRedux: SettingsRedux,
    public redux: UIRedux
  ) {

  }

  ngOnInit() {
    // Get menu
    this.menu$ = this.redux.getMenu();
  }

  public setLanguage(selectedLanguage) {
    this.translate.use(selectedLanguage);
    this.settingsRedux.setLanguage(selectedLanguage);
  }

  public toLangString(lang) {
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
