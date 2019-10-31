import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalObject, EnumHelpers } from '@skysmack/framework';
import { LodgingReservationsAppState, LodgingReservation, LODGING_RESERVATIONS_AREA_KEY, CheckIn } from '@skysmack/packages-lodging-reservations';
import { MenuItem } from '@skysmack/framework';
import { NgLodgingsStore, NgLodgingTypesStore, NgLodgingsActions, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';
import { NgLodgingReservationsStore, NgLodgingReservationsActions } from '@skysmack/ng-lodging-reservations';
import { NgFieldActions } from '@skysmack/ng-framework';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import { CheckinFormComponent } from '../checkin-form/checkin-form.component';
import { MoveFormComponent } from '../move-form/move-form.component';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';

@Component({
  selector: 'ss-lodgings-reservations-index',
  templateUrl: './lodgings-reservations-index.component.html'
})
export class LodgingsReservationsIndexComponent extends DocumentRecordIndexComponent<LodgingReservationsAppState, LodgingReservation, number> implements OnInit {
  public static COMPONENT_KEY = 'lodgings-reservations-index';
  public componentKey = LodgingsReservationsIndexComponent.COMPONENT_KEY;

  public translationPrefix = 'LODGING_RESERVATIONS.ENTITY_ACTIONS.';

  public menuItemActions: MenuItem[] = [
    // Checkin
    new MenuItem().asEventAction(`${this.translationPrefix}CHECKIN`, this.checkIn, 'label', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}UNDOCHECKIN`, this.undoCheckin, 'undo', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),

    // Checkout
    new MenuItem().asEventAction(`${this.translationPrefix}CHECKOUT`, this.checkOut, 'label_off', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}UNDOCHECKOUT`, this.undoCheckout, 'undo', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.CheckedOut;
    }),

    // Cancel
    new MenuItem().asEventAction(`${this.translationPrefix}CANCEL`, this.cancel, 'cancel', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}UNDOCANCEL`, this.undoCancel, 'undo', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Cancelled;
    }),

    // Move
    new MenuItem().asEventAction(`${this.translationPrefix}MOVE`, this.move, 'compare_arrows', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}UNDOMOVE`, this.undoMove, 'undo', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      // TODO: This is likely NOT correct...
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),

    // No show
    new MenuItem().asEventAction(`${this.translationPrefix}NOSHOW`, this.noShow, 'highlight_off', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Reserved;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}UNDONOSHOW`, this.undoNoShow, 'undo', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.NoShow;
    }),

    // Confirm
    new MenuItem().asEventAction(`${this.translationPrefix}CONFIRM`, this.confirm, 'check', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Processing;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}NOTCONFIRMED`, this.undoConfirm, 'close', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.Reserved;
    }),

    // Misc
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this),
  ];

  public areaKey: string = LODGING_RESERVATIONS_AREA_KEY;

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
    public fieldActions: NgFieldActions,
    public pageTitle: EntityComponentPageTitle,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders,
    public dialog: MatDialog
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public confirm(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    // let checkIn;
    // if (entity.object.lodgingId && entity.object.lodgingId > 0) {
    //   checkIn = { reservationId: entity.object.id, lodgingId: entity.object.lodgingId };
    // } else {
    //   checkIn = { reservationId: entity.object.id };
    // }

    // _this.actions.confirm(_this.packagePath, entity, [new CheckIn(checkIn)]);
  }
  public undoConfirm(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    // _this.actions.undoConfirm(_this.packagePath, entity, [entity.object.id]);
  }

  public checkIn(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.subscriptionHandler.register(_this.dialog.open(CheckinFormComponent, { data: { packagePath: _this.packagePath, reservation: entity } }).afterClosed().pipe(
      take(1)
    ).subscribe());
  }
  public undoCheckin(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoCheckIn(_this.packagePath, entity, [entity.object.id]);
  }

  public checkOut(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.subscriptionHandler.register(_this.dialog.open(CheckoutFormComponent, { data: { packagePath: _this.packagePath, reservation: entity } }).afterClosed().pipe(
      take(1)
    ).subscribe());

    // _this.actions.checkOut(_this.packagePath, entity, [entity.object.id]);
  }
  public undoCheckout(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoCheckOut(_this.packagePath, entity, [entity.object.id]);
  }

  public cancel(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.cancel(_this.packagePath, entity, [entity.object.id]);
  }
  public undoCancel(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoCancel(_this.packagePath, entity, [entity.object.id]);
  }

  public move(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.subscriptionHandler.register(_this.dialog.open(MoveFormComponent, { data: { packagePath: _this.packagePath, reservation: entity } }).afterClosed().pipe(
      take(1)
    ).subscribe());
  }
  public undoMove(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoMove(_this.packagePath, entity, [entity.object.id]);
  }

  public noShow(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.noShow(_this.packagePath, entity, [entity.object.id]);
  }
  public undoNoShow(_this: LodgingsReservationsIndexComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoNoShow(_this.packagePath, entity, [entity.object.id]);
  }
}

