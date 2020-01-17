import { Component, OnInit } from '@angular/core';
import { EditorNavService, EntityComponentPageTitle, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { LocalObject, MenuItem, EnumHelpers } from '@skysmack/framework';
import { NgLodgingReservationsFieldsConfig } from '../../ng-lodging-reservations-fields-config';
import { LodgingsReservationsIndexComponent } from '../lodgings-reservations-index/lodgings-reservations-index.component';
import { NgLodgingReservationsActions, NgLodgingReservationsStore } from '@skysmack/ng-lodging-reservations';
import { toDateString } from '@skysmack/ng-framework';
import { LodgingReservationsAppState, LodgingReservation, ReservationsPermissions } from '@skysmack/packages-lodging-reservations';
import { ConfirmReservationDialogComponent } from '../confirm-reservation-dialog/confirm-reservation-dialog.component';
import { take } from 'rxjs/operators';
import { CheckinFormComponent } from '../checkin-form/checkin-form.component';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { MoveFormComponent } from '../move-form/move-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ss-lodgings-reservations-details',
  templateUrl: './lodgings-reservations-details.component.html',
  styleUrls: ['./lodgings-reservations-details.component.scss']
})
export class LodgingsReservationsDetailsComponent extends DetailsBaseComponent<LodgingReservationsAppState, number> implements OnInit {

  public componentKey = LodgingsReservationsIndexComponent.COMPONENT_KEY;
  public translationPrefix = 'LODGING_RESERVATIONS.ENTITY_ACTIONS.';
  /**
    * KEEP ALL METHODS IN BELOW REGION IN SYNC WITH SAME METHODS IN LodgingsReservationsIndexComponent.
    */
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
    // Note: Both move and undo move always shows as the same time, since their show logic is the same.
    new MenuItem().asEventAction(`${this.translationPrefix}MOVE`, this.move, 'compare_arrows', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
      return EnumHelpers.toIndexEnum(LodgingReservation.statusEnum)[entity.object.status] === LodgingReservation.statusEnum.InStay;
    }),
    new MenuItem().asEventAction(`${this.translationPrefix}UNDOMOVE`, this.undoMove, 'undo', this).setShowLogic((entity: LocalObject<LodgingReservation, number>) => {
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
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgLodgingReservationsActions,
    public store: NgLodgingReservationsStore,
    public fieldsConfig: NgLodgingReservationsFieldsConfig,
    public editorNavService: EditorNavService,
    public title: EntityComponentPageTitle,
    protected dialog: MatDialog
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getTitle(record: LocalObject<LodgingReservation, number>): string {
    const checkIn = toDateString(record.object.checkIn);
    const checkOut = toDateString(record.object.checkOut);
    return `${checkIn} - ${checkOut}`;
  }

  public actionEvent(event: { action: Function, _this: any, value?: LocalObject<LodgingReservation, number> }) {
    event.action(event._this, event.value);
  }

  /**
   * KEEP ALL METHODS IN BELOW REGION IN SYNC WITH SAME METHODS IN LodgingsReservationsIndexComponent.
   */
  //#region MenuItem events
  public confirm(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.subscriptionHandler.register(_this.dialog.open(ConfirmReservationDialogComponent, { data: { packagePath: _this.packagePath, reservation: entity } }).afterClosed().pipe(
      take(1)
    ).subscribe());
  }
  public undoConfirm(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoConfirm(_this.packagePath, entity, [entity.object.id]);
  }

  public checkIn(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.subscriptionHandler.register(_this.dialog.open(CheckinFormComponent, { data: { packagePath: _this.packagePath, reservation: entity } }).afterClosed().pipe(
      take(1)
    ).subscribe());
  }
  public undoCheckin(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoCheckIn(_this.packagePath, entity, [entity.object.id]);
  }

  public checkOut(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.subscriptionHandler.register(_this.dialog.open(CheckoutFormComponent, { data: { packagePath: _this.packagePath, reservation: entity } }).afterClosed().pipe(
      take(1)
    ).subscribe());

    // _this.actions.checkOut(_this.packagePath, entity, [entity.object.id]);
  }
  public undoCheckout(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoCheckOut(_this.packagePath, entity, [entity.object.id]);
  }

  public cancel(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.cancel(_this.packagePath, entity, [entity.object.id]);
  }
  public undoCancel(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoCancel(_this.packagePath, entity, [entity.object.id]);
  }

  public move(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.subscriptionHandler.register(_this.dialog.open(MoveFormComponent, { data: { packagePath: _this.packagePath, reservation: entity } }).afterClosed().pipe(
      take(1)
    ).subscribe());
  }
  public undoMove(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoMove(_this.packagePath, entity, [entity.object.id]);
  }

  public noShow(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.noShow(_this.packagePath, entity, [entity.object.id]);
  }
  public undoNoShow(_this: LodgingsReservationsDetailsComponent, entity: LocalObject<LodgingReservation, number>) {
    _this.actions.undoNoShow(_this.packagePath, entity, [entity.object.id]);
  }
  //#endregion
}
