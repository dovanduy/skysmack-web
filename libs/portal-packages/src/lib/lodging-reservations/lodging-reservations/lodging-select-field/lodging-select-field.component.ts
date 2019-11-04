import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { MatDialog } from '@angular/material/dialog';
import { take, tap, map, switchMap, startWith, debounceTime, filter } from 'rxjs/operators';
import { LocalObject, SubscriptionHandler } from '@skysmack/framework';
import { DetailedLodging, Lodging } from '@skysmack/packages-lodgings';
import { Observable } from 'rxjs';
import { LodgingSelectDialogComponent } from '../lodging-select-dialog/lodging-select-dialog.component';
import { NgLodgingsStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';

@Component({
  selector: 'ss-lodging-select-field',
  templateUrl: './lodging-select-field.component.html',
  styleUrls: ['./lodging-select-field.component.scss']
})
export class LodgingSelectFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  public selectedLodging: LocalObject<Lodging, number>;
  public lodgingTypeSelected$: Observable<boolean>;
  protected subscriptionHandler = new SubscriptionHandler();

  constructor(
    private dialog: MatDialog,
    private lodgingStore: NgLodgingsStore,
    private router: Router,
    private skysmackStore: NgSkysmackStore
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setlodgingTypeSelected$();
    this.setSelectedLodging();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public selectLodging(): void {
    this.subscriptionHandler.register(this.dialog.open(LodgingSelectDialogComponent, {
      data:
      {
        from: this.fh.form.get('checkIn').value,
        to: this.fh.form.get('checkOut').value,
        lodgingTypeId: this.fh.form.get('lodgingTypeId').value,
        lodgingId: this.getFieldValue()
      }
    }).afterClosed().pipe(
      tap((detailedLodging: DetailedLodging) => {
        if (detailedLodging || detailedLodging === null) {
          const selectedLodging = detailedLodging && detailedLodging.lodging;
          if (selectedLodging && selectedLodging.object && selectedLodging.object.id) {
            this.setFieldValue(selectedLodging.object.id);
            this.selectedLodging = selectedLodging;
          } else {
            this.fh.form.controls[this.field.key].setValue(null)
            this.selectedLodging = null;
          }
        }
      }),
      take(1)
    ).subscribe());
  }

  private setlodgingTypeSelected$() {
    this.lodgingTypeSelected$ = this.fh.form.get('lodgingTypeId').valueChanges.pipe(
      startWith(''),
      map(() => {
        const lodgingTypeId = this.fh.form.get('lodgingTypeId').value;
        return lodgingTypeId && Number.isInteger(lodgingTypeId);
      })
    );
  }

  private setSelectedLodging(): void {
    const selectedLodgingId = this.getFieldValue();
    if (selectedLodgingId) {
      const packagePath = this.router.url.split('/')[1];
      this.subscriptionHandler.register(getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]).pipe(
        switchMap(_package => this.lodgingStore.getSingle(_package.object.path, selectedLodgingId))
      ).pipe(
        filter(x => !!x),
        tap(selectedLodging => this.selectedLodging = selectedLodging),
        take(1)
      ).subscribe());
    }
  }
}
