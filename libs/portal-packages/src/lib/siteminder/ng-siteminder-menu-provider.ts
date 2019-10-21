import { Injectable } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuArea, MenuProvider, SIDEBAR, SPEEDDIAL } from '@skysmack/framework';
import { MenuItem } from '@skysmack/framework';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { SiteMinderTypeId } from '@skysmack/package-types';
import { getMenuEntries, setBackButton, getCombinedMenuEntries } from '@skysmack/ng-framework';
import { SiteMinderIndexComponent } from './siteminder/components/siteminder-index/siteminder-index.component';
import { SiteMinderChannelsIndexComponent } from './channels/components/siteminder-channels-index/siteminder-channels-index.component';
import { SiteMinderPermissions } from '@skysmack/packages-siteminder';
import { SiteMinderRatePlansIndexComponent } from './rate-plans/components/siteminder-rate-plans-index/siteminder-rate-plans-index.component';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderMenuProvider implements MenuProvider {
    public id = Guid.create().toString();
    private translationPrefix = 'SITE_MINDER.INDEX.';
    private channelsTranslationPrefix = 'SITE_MINDER_CHANNELS.INDEX.';
    private ratePlansTranslationPrefix = 'SITE_MINDER_RATE_PLANS.INDEX.';

    constructor(
        private store: NgSkysmackStore
    ) { }

    public getMenuAreas(packagePath: string, componentKey: string): Observable<MenuArea[]> {
        return getCombinedMenuEntries<MenuArea>(
            getMenuEntries<MenuArea>(packagePath, SiteMinderTypeId, componentKey, SiteMinderIndexComponent.COMPONENT_KEY, this.getSiteMinderMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, SiteMinderTypeId, componentKey, SiteMinderChannelsIndexComponent.COMPONENT_KEY, this.getChannelsMenuAreas, this.store),
            getMenuEntries<MenuArea>(packagePath, SiteMinderTypeId, componentKey, SiteMinderRatePlansIndexComponent.COMPONENT_KEY, this.getRatePlansMenuAreas, this.store)
        );
    };

    public getMenuItems(packagePath: string, componentKey: string): Observable<MenuItem[]> {
        return getCombinedMenuEntries<MenuItem>(
            getMenuEntries<MenuItem>(packagePath, SiteMinderTypeId, componentKey, SiteMinderIndexComponent.COMPONENT_KEY, this.getSiteMinderMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, SiteMinderTypeId, componentKey, SiteMinderChannelsIndexComponent.COMPONENT_KEY, this.getChannelsMenuItems, this.store),
            getMenuEntries<MenuItem>(packagePath, SiteMinderTypeId, componentKey, SiteMinderRatePlansIndexComponent.COMPONENT_KEY, this.getRatePlansMenuItems, this.store),
        );
    };

    private getSiteMinderMenuAreas = () => {
        return [
            new MenuArea({
                area: 'manage',
                translationPrefix: this.translationPrefix,
                order: 2
            })
        ];
    }

    private getChannelsMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.channelsTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.channelsTranslationPrefix,
                order: 2
            })
        ];
    };

    private getRatePlansMenuAreas = () => {
        return [
            new MenuArea({
                area: 'actions',
                translationPrefix: this.ratePlansTranslationPrefix,
                order: 1
            }),
            new MenuArea({
                area: 'manage',
                translationPrefix: this.ratePlansTranslationPrefix,
                order: 2
            })
        ];
    };

    private getSiteMinderMenuItems = () => {
        return [
            new MenuItem({
                url: 'channels',
                displayName: this.translationPrefix + 'CHANNELS',
                area: 'manage',
                order: 1,
                icon: 'description',
                permissions: [
                    SiteMinderPermissions.findChannels
                ],
                providedIn: [SIDEBAR]
            }),
            new MenuItem({
                url: 'rate-plans',
                displayName: this.translationPrefix + 'RATE_PLANS',
                area: 'manage',
                order: 1,
                icon: 'description',
                permissions: [
                    SiteMinderPermissions.findChannels
                ],
                providedIn: [SIDEBAR]
            }),
        ];
    }

    private getChannelsMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.channelsTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    SiteMinderPermissions.addChannels
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    }

    private getRatePlansMenuItems = (packagePath: string): MenuItem[] => {
        return [
            new MenuItem({
                url: 'create',
                displayName: this.ratePlansTranslationPrefix + 'CREATE',
                area: 'actions',
                order: 1,
                icon: 'add',
                permissions: [
                    SiteMinderPermissions.addRatePlans
                ],
                providedIn: [SIDEBAR, SPEEDDIAL]
            }),
            setBackButton(packagePath)
        ];
    }
}