import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { CalendarEvent, EventColor, EventAction } from 'calendar-utils';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import * as _moment from 'moment';
import { PagedQuery, defined } from '@skysmack/framework';
import { SelectFieldOption } from '@skysmack/ng-dynamic-forms';
import { CalendarMonthViewDay } from 'angular-calendar';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
const moment = _moment;

@Component({
  selector: 'ss-lodgings-availability',
  templateUrl: './lodgings-availability.component.html',
  styleUrls: ['./lodgings-availability.component.scss']
})
export class LodgingsAvailabilityComponent implements OnInit, OnDestroy {
  public static COMPONENT_KEY = 'lodgings-availability-index';
  public componentKey = LodgingsAvailabilityComponent.COMPONENT_KEY;
  public packagePath = this.router.url.split('/')[1];
  public events$: Observable<CalendarEvent[]>;
  public lodgingOptions$: Observable<SelectFieldOption[]>;
  public currentSelectedDate: Date = new Date();
  public startOfMonth: string;
  public endOfMonth: string;

  // Chip list
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public lodgingCtrl = new FormControl();
  public selectedLodgingOptions: SelectFieldOption[] = [];
  public filteredLodgings$: Observable<SelectFieldOption[]>;
  @ViewChild('lodgingInput', { static: false }) lodgingInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  // Calendar
  public view = 'month';
  private _viewDate: Date = new Date();
  public get viewDate(): Date {
    return this._viewDate;
  }
  public set viewDate(date: Date) {
    this.requestPeriod(date);
    this._viewDate = date;
  }

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingsStore,
    public actions: NgLodgingsActions,
    public pageTitle: EntityComponentPageTitle,
  ) { }

  ngOnInit() {
    this.pageTitle.setTitle('LODGINGS_AVAILABILITY.TITLE');
    this.setCurrentDate(new Date());
    this.getLodgings();
    this.requestPeriod(this.currentSelectedDate);
    this.setAvailableLodgings();

    this.filteredLodgings$ = combineLatest([
      this.lodgingCtrl.valueChanges.pipe(startWith(null)),
      this.lodgingOptions$
    ]).pipe(
      map(([searchInput, lodgingOptions]) => searchInput ? this._filter(searchInput, lodgingOptions) : lodgingOptions.slice())
    );
  }

  ngOnDestroy() { }

  public requestPeriod(date: Date) {
    this.setCurrentDate(date);
    this.getAvailableLodgingsDaily();
  }

  public getAvailableLodgingsDaily() {
    this.actions.getAvailableLodgingsDaily(this.packagePath, this.startOfMonth, this.endOfMonth, this.selectedLodgingOptions.map(x => x.value));
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      cell.events.forEach((event: CalendarEvent<any>) => {
        cell['freeLodgings'] = event.meta.freeLodgings;
      });
    });
  }

  public trackById(_index: any, item: any) {
    return item.id;
  }

  private getLodgings() {
    this.actions.getPaged(this.packagePath, new PagedQuery());
    this.lodgingOptions$ = this.store.get(this.packagePath).pipe(
      map(lodgings => {
        return lodgings.map(x => ({ value: x.object.id, displayName: x.object.name } as SelectFieldOption));
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
      this.store.getAvailableLodgingsDaily(this.packagePath)
    ]).pipe(
      map(values => {
        const lodgings = values[0];
        const dates = values[1];

        return Object.keys(dates).map(dateKey => {
          const date = dateKey;
          let freeLodgings: {
            id: string,
            name: string,
            available: boolean
          }[];


          freeLodgings = this.selectedLodgingOptions.map(x => x.value).map(selectedLodgingId => {
            const lodging = lodgings.find(lodging => lodging.object.id === selectedLodgingId);
            return {
              id: date.split('T')[0] + lodging.object.name,
              name: lodging.object.name,
              available: dates[dateKey][lodging.object.id]
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
              freeLodgings
            }
          } as CalendarEvent;
        });
      })
    );
  }

  private _filter(searchInput: string | SelectFieldOption | null, lodgingOptions: SelectFieldOption[]): SelectFieldOption[] {
    if (searchInput && (searchInput as string).toLowerCase) {
      const filterValue = (searchInput as string).toLowerCase();
      return lodgingOptions.map(lodgingOption => ({ lodgingOption, hit: lodgingOption.displayName.toLowerCase().indexOf(filterValue.toLowerCase()) })).filter(lodgingTypeHit => lodgingTypeHit.hit >= 0).sort((a, b) => a.hit - b.hit).map(lodgingTypeHit => lodgingTypeHit.lodgingOption);
      // return lodgingOptions.filter(lodgingOption => lodgingOption.displayName.toLowerCase().indexOf(filterValue) === 0);
    }
    return lodgingOptions;
  }

  public add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value as unknown as SelectFieldOption;

      // Add lodging
      if (value) {
        this.selectedLodgingOptions.push(value);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.lodgingCtrl.setValue(null);
    }
  }

  public remove(lodging: SelectFieldOption): void {
    const found = this.selectedLodgingOptions.find(sl => sl.displayName === lodging.displayName);

    if (found) {
      this.selectedLodgingOptions = this.selectedLodgingOptions.filter(sl => sl.displayName !== lodging.displayName);
      this.getAvailableLodgingsDaily();
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedLodgingOptions.push(event.option.value as SelectFieldOption);
    this.lodgingInput.nativeElement.value = '';
    this.lodgingCtrl.setValue(null);
    this.getAvailableLodgingsDaily();
  }

}
