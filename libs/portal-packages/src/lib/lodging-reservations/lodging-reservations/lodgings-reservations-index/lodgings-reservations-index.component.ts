import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalObject, EnumHelpers } from '@skysmack/framework';
import { LodgingReservationsAppState, LodgingReservation, LODGING_RESERVATIONS_AREA_KEY } from '@skysmack/packages-lodging-reservations';
import { EntityAction } from '@skysmack/ng-ui';
import { NgLodgingReservationsStore, NgLodgingsStore, NgLodgingTypesStore, NgLodgingsActions, NgLodgingTypesActions, NgLodgingReservationsActions } from '@skysmack/ng-packages';
import { RecordIndexComponent, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgLodgingsReservationsMenu } from '../../ng-lodgings-reservations-menu';
import { CheckIn } from '@skysmack/packages-lodging-reservations';
import { LodgingsArrivalsComponent } from '../../components/lodgings-arrivals/lodgings-arrivals.component';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-lodgings-reservations-index',
  templateUrl: './lodgings-reservations-index.component.html'
})
export class LodgingsReservationsIndexComponent extends RecordIndexComponent<LodgingReservationsAppState, LodgingReservation, number> implements OnInit {
  public entityActions: EntityAction[] = [
    // Checkin
    new EntityAction().asEventAction('Checkin', this.checkIn, 'label', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo Checkin', this.undoCheckin, 'label', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),

    // Checkout
    new EntityAction().asEventAction('Checkout', this.checkOut, 'label_off', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),
    new EntityAction().asEventAction('Undo Checkout', this.undoCheckout, 'label_off', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.CheckedOut;
    }),

    // Cancel
    new EntityAction().asEventAction('Cancel', this.cancel, 'cancel', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo Cancel', this.undoCancel, 'cancel', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Cancelled;
    }),

    // Move
    new EntityAction().asEventAction('Move', this.move, 'compare_arrows', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),
    new EntityAction().asEventAction('Undo move', this.undoMove, 'compare_arrows', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      // TODO: This is likely NOT correct...
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),

    // No show
    new EntityAction().asEventAction('No show', this.noShow, 'highlight_off', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new EntityAction().asEventAction('Undo no show', this.undoNoShow, 'highlight_off', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.NoShow;
    }),

    // Misc
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this),
  ];

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
  }

  public checkIn(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    let checkIn;
    if (entity.object.allocatedLodging) {
      checkIn = { reservationId: entity.object.id, lodgingId: entity.object.allocatedLodging.object.id };
    } else {
      checkIn = { reservationId: entity.object.id };
    }

    _this.actions.checkIn(_this.packagePath, entity, [new CheckIn(checkIn)]);
  }
  public undoCheckin(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoCheckIn(_this.packagePath, entity, [entity.object.id]);
  }

  public checkOut(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.checkOut(_this.packagePath, entity, [entity.object.id]);
  }
  public undoCheckout(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoCheckOut(_this.packagePath, entity, [entity.object.id]);
  }

  public cancel(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.cancel(_this.packagePath, entity, [entity.object.id]);
  }
  public undoCancel(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoCancel(_this.packagePath, entity, [entity.object.id]);
  }

  public move(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.move(_this.packagePath, entity, [new CheckIn({ reservationId: entity.object.id })]);
  }
  public undoMove(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoMove(_this.packagePath, entity, [entity.object.id]);
  }

  public noShow(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.noShow(_this.packagePath, entity, [entity.object.id]);
  }
  public undoNoShow(entity: LocalObject<LodgingReservation, number>, _this: LodgingsArrivalsComponent) {
    _this.actions.undoNoShow(_this.packagePath, entity, [entity.object.id]);
  }
}

