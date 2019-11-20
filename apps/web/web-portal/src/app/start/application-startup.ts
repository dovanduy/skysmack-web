import { APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { SkysmackApiDomain } from '../../requests/skysmack-api-domain';
import { NgSkysmackActions } from '@skysmack/ng-skysmack';
import { PackageLoader } from '@skysmack/ng-framework';
import { loadInvoicePackage } from '../packages/invoices-package-manifest';
import { loadPersonPackage } from '../packages/persons-package-manifest';
import { loadProductPackage } from '../packages/products-package-manifest';
import { loadProductsPricingsPackage } from '../packages/products-pricings-package-manifest';
import { loadLodgingPackage } from '../packages/lodgings-package-manifest';
import { loadLodgingReservationPackage } from '../packages/lodging-reservations-package-manifest';
import { loadPersonsLodgingReservationsPackage } from '../packages/persons-lodging-reservations-package-manifest';
import { loadOAuth2Package } from '../packages/oauth2-package-manifest';
import { loadMaintenancePackage } from '../packages/maintenance-package-manifest';
import { loadTerminalPaymentsPackage } from '../packages/terminal-payments-manifest';
import { loadIdentitiesPackage } from '../packages/identities-package-manifest';
import { loadReservationsPricingsPackage } from '../packages/reservations-pricings-package-manifest';
import { loadInvoicesCashPaymentsPackage } from '../packages/invoices-cash-payments-package-manifest';
import { loadPackagesPackage } from '../packages/packages-package-manifest';
import { loadAccessPoliciesPackage } from '../packages/access-policies-package-manifest';
import { loadEmailsPackage } from '../packages/emails-package-manifest';
import { loadEmailsSmtpPackage } from '../packages/emails-smtp-package-manifest';
import { loadInvoicesProductsPackage } from '../packages/invoices-products-package-manifest';
import { loadOpenApiPackage } from '../packages/open-api-package-manifest';
import { RefreshTokenInterceptor } from '@skysmack/ng-oauth2';
import { LanguageService, configureLanguage } from '@skysmack/ng-translation';
import { loadFileStoragePackage } from '../packages/file-storage-package-manifest';
import { loadLodgingReservationsSignaturesPackage } from '../packages/lodging-reservations-signatures-package-manifest';
import { loadPhonePackage } from '../packages/phones-package-manifest';
import { load3CXPackage } from '../packages/3cx-package-manifest';
import { loadSiteMinderPackage } from '../packages/siteminder-package-manifest';
import { loadWebhooksPackage } from '../packages/webhooks-package-manifest';
import { loadTemplatePackage } from '../packages/templates-package-manifest';


export function configureSkysmack(actions: NgSkysmackActions) {
    return () => actions.getSkysmack();
}

export const configurations = [
    { provide: APP_INITIALIZER, useFactory: configureSkysmack, deps: [NgSkysmackActions], multi: true },
    { provide: APP_INITIALIZER, useFactory: configureLanguage, deps: [LanguageService], multi: true }
];

export const httpInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
];

export const packageLoaders = [
    { provide: APP_INITIALIZER, useFactory: loadPackagesPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadAccessPoliciesPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadIdentitiesPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadInvoicePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadInvoicesProductsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadInvoicesCashPaymentsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadPersonPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadWebhooksPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadPhonePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: load3CXPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadSiteMinderPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadFileStoragePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadProductPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadProductsPricingsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingReservationPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingReservationsSignaturesPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadReservationsPricingsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadPersonsLodgingReservationsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadOAuth2Package, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadMaintenancePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadTerminalPaymentsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadEmailsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadEmailsSmtpPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadOpenApiPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadTemplatePackage, deps: [PackageLoader], multi: true }
];

export const injectionTokens = [
    { provide: API_DOMAIN_INJECTOR_TOKEN, useClass: SkysmackApiDomain }
];

export const applicationStartup = [
    ...httpInterceptors,
    ...configurations,
    ...packageLoaders,
    ...injectionTokens
];

