import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { LocalObject, EnumHelpers, toLocalObject } from '@skysmack/framework';
import { ExtendedReservation, Reservation, LodgingReservationsAppState, LodgingReservationsState, LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { EntityAction } from '@skysmack/ng-ui';
import { NgLodgingReservationsStore, NgLodgingsStore, NgLodgingTypesStore, NgLodgingReservationsFieldsConfig } from '@skysmack/ng-packages';
import { RecordIndexComponent, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { Lodging, LodgingType } from '@skysmack/packages-lodgings';
import { NgLodgingsReservationsMenu } from '../../ng-lodgings-reservations-menu';
import { CheckIn } from '@skysmack/packages-lodging-reservations';
import { LodgingsArrivalsComponent } from '../lodgings-arrivals/lodgings-arrivals.component';

@Component({
  selector: 'ss-lodgings-reservations-index',
  templateUrl: './lodgings-reservations-index.component.html',
  styleUrls: ['./lodgings-reservations-index.component.scss']
})
export class LodgingsReservationsIndexComponent extends RecordIndexComponent<LodgingReservationsAppState, LodgingReservationsState, number> implements OnInit {
  public displayedColumns = ['checkIn', 'checkOut', 'persons', 'lodgingName', 'lodgingTypeName'];
  public entityActions: EntityAction[] = [
    // Checkin
    new EntityAction().asEventAction('Checkin', this.checkIn, 'label', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo Checkin', this.undoCheckin, 'label', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.InStay;
    }),

    // Checkout
    new EntityAction().asEventAction('Checkout', this.checkOut, 'label_off', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.InStay;
    }),
    new EntityAction().asEventAction('Undo Checkout', this.undoCheckout, 'label_off', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.CheckedOut;
    }),

    // Cancel
    new EntityAction().asEventAction('Cancel', this.cancel, 'cancel', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo Cancel', this.undoCancel, 'cancel', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.Cancelled;
    }),

    // Move
    new EntityAction().asEventAction('Move', this.move, 'compare_arrows', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.InStay;
    }),
    new EntityAction().asEventAction('Undo move', this.undoMove, 'compare_arrows', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      // TODO: This is likely NOT correct...
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.InStay;
    }),

    // No show
    new EntityAction().asEventAction('No show', this.noShow, 'highlight_off', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo no show', this.undoNoShow, 'highlight_off', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(Reservation.StatusEnum)[entity.object.reservation.object.status] === Reservation.StatusEnum.NoShow;
    }),

    // Misc
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete'),
  ];

  public extendedReservations$: Observable<LocalObject<ExtendedReservation, number>[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: NgLodgingReservationsStore,
    public lodgingsStore: NgLodgingsStore,
    public lodgingTypes: NgLodgingTypesStore,
    public fieldsConfig: NgLodgingReservationsFieldsConfig,
    public menuSidebar: NgLodgingsReservationsMenu,
    public pageTitle: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, store, store);
  }

  ngOnInit() {
    super.ngOnInit();
    // TODO: FIX THIS
    this.extendedReservations$ = this.store.getFeatureDependencyPackage(this.packagePath).pipe(
      switchMap(_package => combineLatest(
        this.entities$,
        this.lodgingsStore.get<LocalObject<Lodging, number>[]>(_package.url),
        this.lodgingTypes.get<LocalObject<LodgingType, number>[]>(_package.url),
      ).pipe(
        map(values => {
          const reservations: LocalObject<LodgingReservation, number>[] = values[0];
          const lodgings = values[1];
          const lodgingTypes = values[2];
          if (!reservations || reservations.length === 0) {
            return [] as LocalObject<ExtendedReservation, number>[];
          } else {
            return reservations.map(reservation => {

              let reservationLodging;
              if (reservation && reservation.object) {
                reservationLodging = lodgings.find(lodging => lodging.object.id === reservation.object.allocatedLodgingId);
              }

              let reservationLodgingType;
              if (reservation && reservation.object) {
                reservationLodgingType = lodgingTypes.find(lodgingType => lodgingType.object.id === reservation.object.lodgingTypeId);
              }
              return toLocalObject(new ExtendedReservation(reservation, reservationLodging, reservationLodgingType), reservation.localId, reservation.status, reservation.foreignKey, reservation.isNew);
            });
          }
        }))
      )
    );
  }

  public checkIn(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.checkIn(_this.packagePath, [new CheckIn(entity.object.id, entity.object.lodging.object.id)]);
  }
  public undoCheckin(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.undoCheckIn(_this.packagePath, [entity.object.id]);
  }

  public checkOut(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.checkOut(_this.packagePath, [entity.object.id]);
  }
  public undoCheckout(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.undoCheckOut(_this.packagePath, [entity.object.id]);
  }

  public cancel(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.cancel(_this.packagePath, [entity.object.id]);
  }
  public undoCancel(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.undoCancel(_this.packagePath, [entity.object.id]);
  }

  public move(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.move(_this.packagePath, [new CheckIn(entity.object.id)]);
  }
  public undoMove(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.undoMove(_this.packagePath, [entity.object.id]);
  }

  public noShow(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.noShow(_this.packagePath, [entity.object.id]);
  }
  public undoNoShow(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.redux.undoNoShow(_this.packagePath, [entity.object.id]);
  }
}
