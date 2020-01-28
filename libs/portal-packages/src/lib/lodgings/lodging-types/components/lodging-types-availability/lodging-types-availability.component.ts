import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, take, filter, startWith } from 'rxjs/operators';
import { CalendarEvent, EventColor, EventAction } from 'calendar-utils';
import * as _moment from 'moment';
import { PagedQuery, defined, SubscriptionHandler } from '@skysmack/framework';
import { SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { CalendarMonthViewDay } from 'angular-calendar';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MatSelectChange } from '@angular/material/select';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
const moment = _moment;

@Component({
  selector: 'ss-lodging-types-availability',
  templateUrl: './lodging-types-availability.component.html',
  styleUrls: ['./lodging-types-availability.component.scss']
})
export class LodgingTypesAvailabilityComponent implements OnInit, OnDestroy {
  private subscriptionHandler = new SubscriptionHandler();
  public static COMPONENT_KEY = 'lodging-types-availability-index';
  public componentKey = LodgingTypesAvailabilityComponent.COMPONENT_KEY;
  public packagePath = this.router.url.split('/')[1];
  public events$: Observable<CalendarEvent[]>;
  public currentSelectedDate: Date = new Date();
  public startOfMonth: string;
  public endOfMonth: string;

  // Chip list
  public lodgingTypeOptions$: Observable<SelectFieldOption[]>;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public lodgingTypeCtrl = new FormControl();
  public selectedLodgingTypeOptions: SelectFieldOption[] = [];
  public filteredLodgingTypes$: Observable<SelectFieldOption[]>;
  @ViewChild('lodgingTypeInput', { static: false }) lodgingTypeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  // Calendar
  public view = 'month';
  private _viewDate: Date = new Date();
  public get viewDate(): Date {
    return this._viewDate;
  }
  public set viewDate(date: Date) {
    // Update the request period to the calendars date.
    this.requestPeriod(date);

    // Request the daily count again.
    this.getAvailableLodgingTypesDailyCount();

    this._viewDate = date;
  }

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingTypesStore,
    public actions: NgLodgingTypesActions,
    public pageTitle: EntityComponentPageTitle
  ) { }

  ngOnInit() {
    this.pageTitle.setTitle('LODGING_TYPES.AVAILABILITY.TITLE');
    this.setCurrentDate(new Date());
    this.getLodgings();
    this.requestPeriod(this.currentSelectedDate);
    this.setAvailableLodgings();

    this.filteredLodgingTypes$ = combineLatest([
      this.lodgingTypeCtrl.valueChanges.pipe(startWith(null)),
      this.lodgingTypeOptions$
    ]).pipe(
      map(([searchInput, lodgingTypeOptions]) => searchInput ? this._filter(searchInput, lodgingTypeOptions) : lodgingTypeOptions.slice())
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public requestPeriod(date: Date) {
    this.setCurrentDate(date);
  }

  public getAvailableLodgingTypesDailyCount(change?: MatSelectChange) {
    this.actions.getAvailableLodgingTypesDailyCount(this.packagePath, this.startOfMonth, this.endOfMonth, this.selectedLodgingTypeOptions.map(x => x.value));
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      cell.events.forEach((event: CalendarEvent<any>) => {
        cell['freeLodgingTypes'] = event.meta.freeLodgingTypes;
      });
    });
  }

  public trackById(_index: any, item: any) {
    return item.id;
  }

  private getLodgings() {
    this.actions.getPaged(this.packagePath, new PagedQuery());
    const lodgingTypes$ = this.store.get(this.packagePath);

    // Make all checkboxes selected as default.
    this.subscriptionHandler.register(lodgingTypes$.pipe(
      filter(lodgingTypes => lodgingTypes && lodgingTypes.length > 0),
      tap(lodgingTypes => this.selectedLodgingTypeOptions = lodgingTypes.map(x => ({ value: x.object.id, displayName: x.object.name } as SelectFieldOption))),
      take(1),
      tap(() => this.getAvailableLodgingTypesDailyCount()),
    ).subscribe());


    // Get options
    this.lodgingTypeOptions$ = lodgingTypes$.pipe(
      map(lodgingTypes => {
        return lodgingTypes.map(x => ({ value: x.object.id, displayName: x.object.name } as SelectFieldOption));
      }),
      defined()
    );
  }

  private setCurrentDate(date: Date) {
    this.currentSelectedDate = date;
    this.startOfMonth = moment(this.currentSelectedDate).startOf('month').format('YYYY-MM-DD');
    this.endOfMonth = moment(this.currentSelectedDate).endOf('month').format('YYYY-MM-DD');
  }

  private setAvailableLodgings() {
    this.requestPeriod(this.currentSelectedDate);

    this.events$ = combineLatest([
      this.store.get(this.packagePath),
      this.store.getAvailableLodgingTypesDailyCount(this.packagePath)
    ]).pipe(
      map(([lodgingTypes, dictionary]) => {
        const datesArray = Object.keys(dictionary);
        let freeLodgingTypes: {
          id: string,
          name: string,
          count: number
        }[];

        return datesArray.map(date => {
          return Object.keys(dictionary[date]).map(() => {
            freeLodgingTypes = this.selectedLodgingTypeOptions.map(x => x.value).map(selectedLodgingTypeId => {
              const lodgingTypeName = lodgingTypes.find(lodging => lodging.object.id === selectedLodgingTypeId).object.name;
              const lodgingTypeCount = dictionary[date][selectedLodgingTypeId];
              return {
                id: date.split('T')[0] + lodgingTypeName,
                name: lodgingTypeName,
                count: (lodgingTypeCount !== null && lodgingTypeCount !== undefined) ? lodgingTypeCount : 0
              };
            });

            return {
              start: new Date(date),
              title: '',
              color: { primary: '#0033cc', secondary: '#3399ff' } as EventColor,
              actions: [] as EventAction[],
              allDay: true,
              cssClass: 'available-booking',
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
              draggable: false,
              meta: {
                freeLodgingTypes
              }
            } as CalendarEvent;
          });
        }).reduce((acc, current) => acc.concat(current), []);
      })
    );
  }

  private _filter(searchInput: string | SelectFieldOption | null, lodgingTypeOptions: SelectFieldOption[]): SelectFieldOption[] {
    if (searchInput && (searchInput as string).toLowerCase) {
      const filterValue = (searchInput as string).toLowerCase();
      return lodgingTypeOptions.map(lodgingTypeOption => ({ lodgingTypeOption, hit: lodgingTypeOption.displayName.toLowerCase().indexOf(filterValue.toLowerCase()) })).filter(lodgingTypeHit => lodgingTypeHit.hit >= 0).sort((a, b) => a.hit - b.hit).map(lodgingTypeHit => lodgingTypeHit.lodgingTypeOption);
    }
    return lodgingTypeOptions;
  }

  public add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value as unknown as SelectFieldOption;

      // Add lodging
      if (value) {
        this.selectedLodgingTypeOptions.push(value);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.lodgingTypeCtrl.setValue(null);
    }
  }

  public remove(lodgingType: SelectFieldOption): void {
    const found = this.selectedLodgingTypeOptions.find(sl => sl.displayName === lodgingType.displayName);

    if (found) {
      this.selectedLodgingTypeOptions = this.selectedLodgingTypeOptions.filter(sl => sl.displayName !== lodgingType.displayName);
      this.getAvailableLodgingTypesDailyCount();
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedLodgingTypeOptions.push(event.option.value as SelectFieldOption);
    this.lodgingTypeInput.nativeElement.value = '';
    this.lodgingTypeCtrl.setValue(null);
    this.getAvailableLodgingTypesDailyCount();
  }
}
