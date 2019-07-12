import { APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { SkysmackApiDomain } from '../../requests/skysmack-api-domain';
import { NgSkysmackActions } from '@skysmack/ng-skysmack';
import { AuthorizationInterceptor, configureLanguage, LanguageService } from '@skysmack/portal-ui';
import { PackageLoader } from '@skysmack/ng-framework';
import { loadInvoicePackage } from '../packages/invoices-package-manifest';
import { loadPersonPackage } from '../packages/persons-package-manifest';
import { loadProductPackage } from '../packages/products-package-manifest';
import { loadProductsPricingsPackage } from '../packages/products-pricings-package-manifest';
import { loadLodgingPackage } from '../packages/lodgings-package-manifest';
import { loadLodgingReservationPackage } from '../packages/lodging-reservations-package-manifest';
import { loadPersonsLodgingReservationsPackage } from '../packages/persons-lodging-reservations-package-manifest';
import { loadOauth2Package } from '../packages/oauth2-package-manifest';
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


export function configureSkysmack(actions: NgSkysmackActions) {
    return () => actions.getSkysmack();
}

export const configurations = [
    { provide: APP_INITIALIZER, useFactory: configureSkysmack, deps: [NgSkysmackActions], multi: true },
    { provide: APP_INITIALIZER, useFactory: configureLanguage, deps: [LanguageService], multi: true }
];

export const httpInterceptors = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
];

export const packageLoaders = [
    { provide: APP_INITIALIZER, useFactory: loadPackagesPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadAccessPoliciesPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadIdentitiesPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadInvoicePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadInvoicesProductsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadInvoicesCashPaymentsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadPersonPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadProductPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadProductsPricingsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadLodgingReservationPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadReservationsPricingsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadPersonsLodgingReservationsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadOauth2Package, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadMaintenancePackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadTerminalPaymentsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadEmailsPackage, deps: [PackageLoader], multi: true },
    { provide: APP_INITIALIZER, useFactory: loadEmailsSmtpPackage, deps: [PackageLoader], multi: true }
];

export const injectionTokens = [
    { provide: API_DOMAIN_INJECTOR_TOKEN, useClass: SkysmackApiDomain }
];

export const applicationStartup = [
    ...configurations,
    ...httpInterceptors,
    ...packageLoaders,
    ...injectionTokens
];

