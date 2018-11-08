import { Component, OnInit } from '@angular/core';
import { FrameworkRedux, Package, log } from 'framework';
import { Observable } from 'rxjs';
import { Menu } from 'ui/models/menu';
import { UIRedux } from 'ui/redux/ui-redux';

@Component({
  selector: 'ss-package-drawer',
  templateUrl: './package-drawer.component.html',
  styleUrls: ['./package-drawer.component.scss']
})
export class PackageDrawerComponent implements OnInit {
  public packages$: Observable<Package[]>;
  public modules$: Observable<Package[]>;
  public menu$: Observable<Menu>;

  constructor(
    public frameworkRedux: FrameworkRedux,
    public uiRedux: UIRedux
  ) { }

  ngOnInit() {
    this.packages$ = this.frameworkRedux.getPackages();
    this.modules$ = this.frameworkRedux.getModules();
    this.menu$ = this.uiRedux.getMenu();
  }
}
