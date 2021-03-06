import { packagesRoute } from './packages-package-manifest';
import { accessPoliciesRoute } from './access-policies-package-manifest';
import { identitiesRoute } from './identities-package-manifest';
import { personsRoute } from './persons-package-manifest';
import { fileStorageRoute } from './file-storage-package-manifest';
import { invoicesRoute } from './invoices-package-manifest';
import { invoicesProductsRoute } from './invoices-products-package-manifest';
import { invoicesCashPaymentsRoute } from './invoices-cash-payments-package-manifest';
import { productsRoute } from './products-package-manifest';
import { productsPricingsRoute } from './products-pricings-package-manifest';
import { lodgingsRoute } from './lodgings-package-manifest';
import { lodgingReservationsRoute } from './lodging-reservations-package-manifest';
import { reservationsPricingsRoute } from './reservations-pricings-package-manifest';
import { personsLodgingReservationsRoute } from './persons-lodging-reservations-package-manifest';
import { OAuth2Route } from './oauth2-package-manifest';
import { maintenanceRoute } from './maintenance-package-manifest';
import { terminalPaymentsRoute } from './terminal-payments-manifest';
import { emailsRoute } from './emails-package-manifest';
import { emailsSmtpRoute } from './emails-smtp-package-manifest';
import { openApiRoute } from './open-api-package-manifest';
import { phonesRoute } from './phones-package-manifest';
import { PBX_3CXRoute } from './3cx-package-manifest';
import { siteminderRoute } from './siteminder-package-manifest';
import { webhooksRoute } from './webhooks-package-manifest';
import { templatesRoute } from './templates-package-manifest';
import { corsRoute } from './cors-package-manifest';
import { passCodesRoute } from './pass-codes-package-manifest';
import { doorwaysRoute } from './doorways-package-manifest';
import { doorwaysPassCodesRoute } from './doorways-pass-codes-package-manifest';
import { lodgingsDoorwaysRoute } from './lodgings-doorways-package-manifest';
import { lodgingsReservationsPassCodeRoute } from './lodgings-reservations-pass-codes-package-manifest';
import { axisPhysicalAccessControlRoute } from './axis-physical-access-control-package-manifest';
import { invoicesPersonsRoute } from './invoices-persons-package-manifest';
import { invoicesLodgingReservationsRoute } from './invoices-lodging-reservations-package-manifest';

export const packagesRoutes = [
    packagesRoute,
    accessPoliciesRoute,
    identitiesRoute,
    personsRoute,
    siteminderRoute,
    fileStorageRoute,
    invoicesRoute,
    invoicesProductsRoute,
    invoicesCashPaymentsRoute,
    productsRoute,
    productsPricingsRoute,
    lodgingsRoute,
    lodgingReservationsRoute,
    reservationsPricingsRoute,
    personsLodgingReservationsRoute,
    OAuth2Route,
    maintenanceRoute,
    terminalPaymentsRoute,
    emailsRoute,
    emailsSmtpRoute,
    openApiRoute,
    phonesRoute,
    PBX_3CXRoute,
    webhooksRoute,
    templatesRoute,
    corsRoute,
    passCodesRoute,
    doorwaysRoute,
    doorwaysPassCodesRoute,
    lodgingsDoorwaysRoute,
    lodgingsReservationsPassCodeRoute,
    axisPhysicalAccessControlRoute,
    invoicesPersonsRoute,
    invoicesLodgingReservationsRoute
];