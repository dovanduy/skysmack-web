import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { LocalObject, LocalObjectStatus, PagedQuery, DisplayColumn } from '@skysmack/framework';
import { LodgingTypeRatePlanChannel, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_AREA_KEY, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS, LodgingTypeRatePlanChannelKey } from '@skysmack/packages-siteminder';

import { NgSiteMinderLodgingTypeRatePlanChannelsValidation, NgSiteMinderRatePlansActions, NgSiteMinderRatePlansStore, NgSiteMinderChannelsActions, NgSiteMinderChannelsStore, NgSiteMinderLodgingTypeRatePlansActions, NgSiteMinderLodgingTypeRatePlansStore } from '@skysmack/ng-siteminder';
import { LoadedPackage, getPackageDendencyAsStream, convertObservableToBehaviorSubject } from '@skysmack/ng-framework';
import { FormRule, Field, SelectField, SelectFieldOption } from '@skysmack/ng-dynamic-forms';
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
        protected channelActions: NgSiteMinderChannelsActions,
        protected channelStore: NgSiteMinderChannelsStore,
        protected ratePlanActions: NgSiteMinderRatePlansActions,
        protected ratePlanStore: NgSiteMinderRatePlansStore,
        protected lodgingTypeRatePlanActions: NgSiteMinderLodgingTypeRatePlansActions,
        protected lodgingTypeRatePlanStore: NgSiteMinderLodgingTypeRatePlansStore
    ) {
        super(fieldProviders, SITE_MINDER_LODGING_TYPE_RATE_PLAN_CHANNELS_ADDITIONAL_PATHS);
    }

    protected getEntityFields(loadedPackage: LoadedPackage, entity?: LocalObject<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>): Field[] {
        const ratePlans$ = convertObservableToBehaviorSubject(this.ratePlanStore.get(loadedPackage._package.path), []);
        const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, loadedPackage._package.path, [0, 1, 0]);
        const lodgingTypes$ = convertObservableToBehaviorSubject(lodgingPackage$.pipe(switchMap(lodgingsPackage => this.lodgingTypeStore.get(lodgingsPackage.object.path))), [])

        const fields: Field[] = [
            new SelectField({
                component: SelectFieldComponent,
                value: entity ? entity.object.lodgingTypeId : undefined,
                key: 'lodgingTypeRatePlanId',
                displayKey: 'lodgingTypeRatePlan',
                displaySubKey: 'object.lodgingTypeId',
                optionsData$: this.lodgingTypeRatePlanStore.get(loadedPackage._package.path),
                modifyDisplayName: (options: SelectFieldOption[], optionsData: any[]) => {
                    const ratePlans = ratePlans$.getValue();
                    const lodgingTypes = lodgingTypes$.getValue();
                    return options.map((option: { displayName: string, value: { ratePlanId: number, lodgingTypeId: number } }) => {
                        const relatedLodgingType = lodgingTypes.find(lt => lt.object.id === option.value.lodgingTypeId);
                        const relatedRatePlan = ratePlans.find(rp => rp.object.id === option.value.ratePlanId);
                        const ltName = relatedLodgingType ? relatedLodgingType.object.name : '';
                        const rpName = relatedRatePlan ? relatedRatePlan.object.name : '';
                        return {
                            displayName: `${ltName} - ${rpName}`,
                            value: option.value
                        };
                    })
                },
                displayModifier: (column: DisplayColumn, providedEntity: LocalObject<LodgingTypeRatePlanChannel, LodgingTypeRatePlanChannelKey>) => {
                    const ratePlans = ratePlans$.getValue();
                    const lodgingTypes = lodgingTypes$.getValue();
                    const relatedLodgingType = lodgingTypes.find(lt => lt.object.id === providedEntity.object.lodgingTypeId);
                    const relatedRatePlan = ratePlans.find(rp => rp.object.id === providedEntity.object.ratePlanId);
                    const ltName = relatedLodgingType ? relatedLodgingType.object.name : '';
                    const rpName = relatedRatePlan ? relatedRatePlan.object.name : '';
                    return `${ltName} - ${rpName}`;
                },
                getDependencies: () => {
                    this.lodgingTypeRatePlanActions.getPaged(loadedPackage._package.path, new PagedQuery());
                    this.ratePlanActions.getPaged(loadedPackage._package.path, new PagedQuery());
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
