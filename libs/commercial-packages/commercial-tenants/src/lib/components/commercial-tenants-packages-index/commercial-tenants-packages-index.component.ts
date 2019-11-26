import { Component, OnInit } from '@angular/core';
import { HttpSuccessResponse } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { CommercialPackagesService } from '../../services';
import { map } from 'rxjs/operators';
import { CommercialAvailablePackage } from '../../models/commercial-available-package';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-commercial-tenants-packages-index',
  templateUrl: './commercial-tenants-packages-index.component.html',
  styleUrls: ['./commercial-tenants-packages-index.component.scss']
})
export class CommercialTenantsPackagesIndexComponent implements OnInit {
  public availablePackages$: Observable<CommercialAvailablePackage[]>;

  constructor(
    private packagesService: CommercialPackagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.availablePackages$ = this.packagesService.getAvailablePackages().pipe(
      map((x: HttpSuccessResponse<CommercialAvailablePackage>) => x.body as CommercialAvailablePackage[]),
      map(packages => packages.filter(_package => !_package.dependencyTypes || _package.dependencyTypes && _package.dependencyTypes.length === 0))
    );
  }

  public selectPackage(_package: CommercialAvailablePackage) {
    this.router.navigate(['/', 'tenants', 'packages', _package.category, _package.name])
  }
}
