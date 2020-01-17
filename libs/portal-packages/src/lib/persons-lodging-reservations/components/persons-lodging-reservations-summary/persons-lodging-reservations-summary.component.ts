import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Summary, SubscriptionHandler, RSQLFilterBuilder, PagedQuery, LocalObject } from '@skysmack/framework';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { tap, take, map, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgPersonsActions, NgPersonsStore } from '@skysmack/ng-persons';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { Person } from '@skysmack/packages-persons';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-persons-lodging-reservations-summary',
  templateUrl: './persons-lodging-reservations-summary.component.html'
})
export class PersonsLodgingReservationsSummaryComponent implements OnInit, OnDestroy {
  @Input() public providerPackagePath: string;
  @Input() public summary: Summary<number>;

  private subscriptionHandler = new SubscriptionHandler();
  public packagePath: string;
  public personsPackagePath$: Observable<string>;
  public records$: Observable<LocalObject<Person, number>[]>;

  constructor(
    private router: Router,
    private actions: NgLodgingReservationsActions,
    private store: NgLodgingReservationsStore,
    private personsActions: NgPersonsActions,
    private personsStore: NgPersonsStore,
    private skysmackStore: NgSkysmackStore
  ) {
  }

  ngOnInit() {
    console.log(this.providerPackagePath);
    this.packagePath = this.router.url.split('/')[1];
    const personIds$ = this.store.getSingle(this.packagePath, this.summary.entityId).pipe(
      take(1),
      map(reservation => {
        const extendedData = reservation.object['extendedData'];
        return extendedData && extendedData[`${this.providerPackagePath}.ids`] as number[];
      }),
      filter(x => x !== undefined && x !== null)
    );

    this.personsPackagePath$ = getPackageDendencyAsStream(this.skysmackStore, this.providerPackagePath, [0]).pipe(
      map(_package => _package.object.path)
    );

    // Request persons from API
    this.subscriptionHandler.register(personIds$.pipe(
      take(1),
      switchMap(personIds => this.personsPackagePath$.pipe(
        take(1),
        tap(packagePath => {
          const rsqlFilter = new RSQLFilterBuilder();
          rsqlFilter.column('id').in(personIds);
          const query = new PagedQuery({ rsqlFilter });
          this.personsActions.getPaged(packagePath, query);
        })
      ))
    ).subscribe());

    // Get persons from store.
    this.records$ = this.personsPackagePath$.pipe(
      switchMap(packagePath => this.personsStore.get(packagePath).pipe(
        switchMap(persons => personIds$.pipe(
          map(personIds => persons.filter(person => personIds.includes(person.object.id)))
        ))
      ))
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}


