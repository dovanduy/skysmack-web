import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { NgPersonsStore, NgPersonsActions, NgSkysmackStore, NgPersonsLodgingReservationsType } from '@skysmack/ng-packages';
import { MatSelectChange } from '@angular/material';
import { Package, PagedQuery, LocalObject } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-manage-persons-field',
  templateUrl: './manage-persons-field.component.html'
})
export class ManagePersonsFieldComponent extends FieldBaseComponent implements OnInit {

  public personPackages: any[];
  public value: any;

  constructor(
    public personsStore: NgPersonsStore,
    public personsActions: NgPersonsActions,
    public skysmackStore: NgSkysmackStore
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.get();
  }

  public selectionChanged(change: MatSelectChange) {
    this.setFieldValue(change.value);
  }

  private get() {
    this.skysmackStore.getPackages().pipe(
      map(packages => packages.filter(_package => _package.object.type === NgPersonsLodgingReservationsType.id)),
      map((packages: LocalObject<Package, string>[]) => {
        // GET
        packages.forEach(_package => {
          this.personsActions.getPaged(_package.object.dependencies[0], new PagedQuery());
        });

        // SET
        this.personPackages = packages.map(_package => {
          return {
            name: _package.object.dependencies[0],
            persons: this.personsStore.get(_package.object.dependencies[0])
          };
        });
      })
    );
  }
}
