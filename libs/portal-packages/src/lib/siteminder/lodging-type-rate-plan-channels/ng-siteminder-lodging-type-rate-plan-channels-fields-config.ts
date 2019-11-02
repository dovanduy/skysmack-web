import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery } from '@skysmack/framework';
import { LodgingTypeRatePlanChannel, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_AREA_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS, LodgingTypeRatePlanChannelKey } from '@skysmack/packages-siteminder';

import { NgSiteMinderLodgingTypeRatePlanChannelsValidation, NgSiteMinderRatePlansActions, NgSiteMinderRatePlansStore, NgSiteMinderChannelsActions, NgSiteMinderChannelsStore } from '@skysmack/ng-siteminder';
import { LoadedPackage, getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField } from '@skysmack/ng-dynamic-forms';
import { HiddenFieldComponent, SelectFieldComponent } from '@skysmack/portal-fields';
import { FieldProviders, FieldsConfig } from '@skysmack/ng-fields';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap, take, map } from 'rxjs/operators';
import { NgLodgingTypesActions, NgLodgingTypesStore } from '@skysmack/ng-lodgings';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderLodgingTypeRatePlanChannelsFieldsConfig extends FieldsConfig<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey> {
    public validation = new NgSiteMinderLodgingTypeRatePlanChannelsValidation();
    public area = SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_AREA_KEY;
    public formRules: FormRule[] = [];

    constructor(
        public fieldProviders: FieldProviders,
        private skysmackStore: NgSkysmackStore,
        protected lodgingTypeActions: NgLodgingTypesActions,
        protected lodgingTypeStore: NgLodgingTypesStore,
        protected ratePlanActions: NgSiteMinderRatePlansActions,
        protected ratePlanStore: NgSiteMinderRatePlansStore,
        protected channelActions: NgSiteMinderChannelsActions,
        protected channelStore: NgSiteMinderChannelsStore,
    ) {
        super(fieldProviders, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>): Field[] {
        const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0, 1, 0]);

        const fields: Field[] = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.lodgingTypeId : undefined,
                key: 'lodgingTypeId',
                displayKey: 'lodgingType',
                displaySubKey: 'object.name',
                optionsData$: lodgingPackage$.pipe(switchMap(lodgingsPackage => this.lodgingTypeStore.get(lodgingsPackage.object.path))),
                getDependencies: () => {
                    lodgingPackage$.pipe(
                        map(lodgingsPackage => {
                            this.lodgingTypeActions.getPaged(lodgingsPackage.object.path, new PagedQuery());
                        }),
                        take(1)
                    ).subscribe();
                },
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.ratePlanId : undefined,
                key: 'ratePlanId',
                displayKey: 'ratePlan',
                displaySubKey: 'object.name',
                optionsData$: this.ratePlanStore.get(loadedPackage._package.path),
                getDependencies: () => { this.ratePlanActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),

            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.channelId : undefined,
                key: 'channelId',
                displayKey: 'channel',
                displaySubKey: 'object.name',
                optionsData$: this.channelStore.get(loadedPackage._package.path),
                getDependencies: () => { this.channelActions.getPaged(loadedPackage._package.path, new PagedQuery()); },
                validators: [Validators.required],
                order: 1,
                showColumn: true
            }),
        ];

        // Id field must only be added for edit forms.
        // If added to a create form, it won't be able to bind in the backend.
        if (entity && entity.object.id && entity.status !== LocalObjectStatus.CREATING) {
            fields.push(new Field({
                component: HiddenFieldComponent,
                value: entity ? entity.object.id : undefined,
                key: 'id',
                order: 0,
            }));
        }

        return fields;
    }
}
