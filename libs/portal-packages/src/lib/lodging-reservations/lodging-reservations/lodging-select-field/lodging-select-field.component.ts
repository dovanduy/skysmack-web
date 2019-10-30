import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { MatDialog } from '@angular/material/dialog';
import { take, tap, map, switchMap, startWith, debounceTime, filter } from 'rxjs/operators';
import { LocalObject } from '@skysmack/framework';
import { DetailedLodging, Lodging } from '@skysmack/packages-lodgings';
import { Observable, combineLatest, of } from 'rxjs';
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
            // this.setFieldValue('hulla bull');
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
      map(valueChanged => {
        const _value = this.fh.form.get('lodgingTypeId').value;
        console.log('valueChanged', valueChanged, _value);
        return _value && Number.isInteger(_value);
        // console.log('valueChanged', valueChanged);
        // return valueChanged && Number.isInteger(valueChanged);
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
