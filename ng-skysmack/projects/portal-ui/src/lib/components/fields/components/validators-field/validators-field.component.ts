import { Component, OnInit, Injector } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFieldRouteData, flatten, FieldValueProviderViewModel, LocalObject } from '@skysmack/framework';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';
import { map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'ss-validators-field',
  templateUrl: './validators-field.component.html',
  styleUrls: ['./validators-field.component.scss']
})
export class ValidatorsFieldComponent extends FieldBaseComponent implements OnInit {

  public store: NgDocumentRecordReduxStore<any, any, any>;
  public packagePath: string;
  public selectedType: string;

  public validators: any[] = [];

  public validatorOptions = [];

  constructor(
    public injector: Injector,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { super(); }

  ngOnInit() {
    super.ngOnInit();

    this.packagePath = this.router.url.split('/')[1];

    this.subscriptions.push(this.fh.form.valueChanges.pipe(
      map(changes => {
        if (changes['type'] && this.selectedType !== changes['type']) {
          this.selectedType = changes['type'];
          return true;
        }
      }),
      filter(x => x),
      switchMap(() => this.activatedRoute.data),
      map((data: DynamicFieldRouteData) => {
        this.store = this.injector.get(data.storeToken);
      }),
      switchMap(() => this.store.getAvailableFields(this.packagePath).pipe(
        flatten(),
        filter((availableField: LocalObject<FieldValueProviderViewModel, string>) => availableField.object.name === this.selectedType),
        map(selectedAvailableField => {
          this.validatorOptions = Object.keys(selectedAvailableField.object.validators).map(key => {
            return {
              value: selectedAvailableField.object.validators[key],
              displayName: key
            };
          });
        })
      ))
    ).subscribe());
  }

  public addValidator() {
    this.validators.push('string');
  }

  public removeValidator() {
    this.validators.pop();
  }
}
