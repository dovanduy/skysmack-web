import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { LocalObject, EnumHelpers, toLocalObject } from '@skysmack/framework';
import { ExtendedReservation, LodgingReservationsAppState, LodgingReservation, LODGING_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';
import { EntityAction } from '@skysmack/ng-ui';
import { NgLodgingReservationsStore, NgLodgingsStore, NgLodgingTypesStore, NgLodgingReservationsFieldsConfig, NgLodgingsActions, NgLodgingTypesActions, NgLodgingReservationsActions, NgSkysmackStore } from '@skysmack/ng-packages';
import { RecordIndexComponent, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgLodgingsReservationsMenu } from '../../ng-lodgings-reservations-menu';
import { CheckIn } from '@skysmack/packages-lodging-reservations';
import { LodgingsArrivalsComponent } from '../lodgings-arrivals/lodgings-arrivals.component';

@Component({
  selector: 'ss-lodgings-reservations-index',
  templateUrl: './lodgings-reservations-index.component.html'
})
export class LodgingsReservationsIndexComponent extends RecordIndexComponent<LodgingReservationsAppState, LodgingReservation, number> implements OnInit {
  public entityActions: EntityAction[] = [
    // Checkin
    new EntityAction().asEventAction('Checkin', this.checkIn, 'label', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo Checkin', this.undoCheckin, 'label', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.InStay;
    }),

    // Checkout
    new EntityAction().asEventAction('Checkout', this.checkOut, 'label_off', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.InStay;
    }),
    new EntityAction().asEventAction('Undo Checkout', this.undoCheckout, 'label_off', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.CheckedOut;
    }),

    // Cancel
    new EntityAction().asEventAction('Cancel', this.cancel, 'cancel', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo Cancel', this.undoCancel, 'cancel', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.Cancelled;
    }),

    // Move
    new EntityAction().asEventAction('Move', this.move, 'compare_arrows', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.InStay;
    }),
    new EntityAction().asEventAction('Undo move', this.undoMove, 'compare_arrows', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      // TODO: This is likely NOT correct...
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.InStay;
    }),

    // No show
    new EntityAction().asEventAction('No show', this.noShow, 'highlight_off', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo no show', this.undoNoShow, 'highlight_off', this).setShowLogic((entity: LocalObject<ExtendedReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.reservation.object.status] === LodgingReservation.statusEnum.NoShow;
    }),

    // Misc
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this),
  ];

  public extendedReservations$: Observable<LocalObject<ExtendedReservation, number>[]>;
  public area: string = LODGING_RESERVATIONS_AREA_KEY;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingReservationsStore,
    public lodgingsStore: NgLodgingsStore,
    public lodgingTypesStore: NgLodgingTypesStore,
    public actions: NgLodgingReservationsActions,
    public lodgingsActions: NgLodgingsActions,
    public lodgingTypesActions: NgLodgingTypesActions,
    public fieldsConfig: NgLodgingReservationsFieldsConfig,
    public sidebarMenu: NgLodgingsReservationsMenu,
    public pageTitle: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.extendedReservations$ = this.loadedPackage$.pipe(
      switchMap(loadedPackage => {
        // this.lodgingsActions.getPaged(loadedPackage._package.path, new PagedQuery({ pageNumber: 1, pageSize: 50 }));
        // this.lodgingTypesActions.getPaged(loadedPackage._package.path, new PagedQuery({ pageNumber: 1, pageSize: 50 }));

        return combineLatest(
          this.pagedEntities$,
          this.lodgingsStore.get(loadedPackage._package.dependencies[0]),
          this.lodgingTypesStore.get(loadedPackage._package.dependencies[0])
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
                return toLocalObject<ExtendedReservation, number>(new ExtendedReservation(reservation, reservationLodging, reservationLodgingType), 'id', reservation.localId, reservation.status, reservation.foreignKey, reservation.isNew);
              });
            }
          })
        );
      })
    );
  }

  public checkIn(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    let checkIn;
    if (entity.object.lodging) {
      checkIn = { reservationId: entity.object.id, lodgingId: entity.object.lodging.object.id };
    } else {
      checkIn = { reservationId: entity.object.id };
    }

    _this.actions.checkIn(_this.packagePath, entity.object.reservation, [new CheckIn(checkIn)]);
  }
  public undoCheckin(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoCheckIn(_this.packagePath, entity.object.reservation, [entity.object.id]);
  }

  public checkOut(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.checkOut(_this.packagePath, entity.object.reservation, [entity.object.id]);
  }
  public undoCheckout(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoCheckOut(_this.packagePath, entity.object.reservation, [entity.object.id]);
  }

  public cancel(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.cancel(_this.packagePath, entity.object.reservation, [entity.object.id]);
  }
  public undoCancel(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoCancel(_this.packagePath, entity.object.reservation, [entity.object.id]);
  }

  public move(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.move(_this.packagePath, entity.object.reservation, [new CheckIn({ reservationId: entity.object.id })]);
  }
  public undoMove(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoMove(_this.packagePath, entity.object.reservation, [entity.object.id]);
  }

  public noShow(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.noShow(_this.packagePath, entity.object.reservation, [entity.object.id]);
  }
  public undoNoShow(entity: LocalObject<ExtendedReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoNoShow(_this.packagePath, entity.object.reservation, [entity.object.id]);
  }
}
