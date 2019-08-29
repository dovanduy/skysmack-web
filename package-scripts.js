/**
 * Docs: https://www.npmjs.com/package/nps
 * Please install nps globally to run below scripts: npm install -g nps
 * Executing a script : nps portal
 * Note: Default is the script getting run if no other specific property is defined. E.g. "nps portal" runs "nps portal.default"
 */

module.exports = {
  scripts: {
    portal: {
      // Run local dev server
      default: 'ng serve web-portal --host client1.skysmack.test --port 4000 --disableHostCheck',

      // Runs a production build on a local http-server
      prod: 'ng build --prod --sourceMap=true && http-server ./dist/apps/web/web-portal -a www.skysmack.test -p 4000 -o',

      // Shows a visual analysis of compiled production code.
      analyze: 'ng build --prod --stats-json && webpack-bundle-analyzer ./dist/apps/web/web-portal/stats.json',

      // Builds a deployable version.
      build: 'gulp webLocalization && ng build --prod --deploy-url //cdn.skysmack.net/ && nps portal.support.ngswConfig && nps portal.support.webcompressPortal',

      support: {
        ngswConfig: "ngsw-config dist/apps/web/web-portal apps/web/web-portal/src/ngsw-config.json https://cdn.skysmack.net && gulp update-ngsw-portal",
        webcompressPortal: "gulp brotli-portal && gulp zip-portal"
      }
    },
    commercial: {
      // Run local dev server
      default: 'ng serve web-commercial',

      // Runs a production build on a local http-server
      prod: 'ng build web-commercial  --prod --sourceMap=true && http-server ./dist/apps/web/web-commercial -a www.skysmack.com -p 4000 -o',

      // Shows a visual analysis of compiled production code.
      analyze: 'ng build --prod web-commercial --stats-json && webpack-bundle-analyzer ./dist/apps/web/web-commercial/stats.json',

      // Builds a deployable version.
      build: 'gulp webCommercialLocalization && ng build web-commercial --prod --deploy-url //skysmack.com/ && nps commercial.support.webcompressCommercial',

      support: {
        webcompressCommercial: "gulp brotli-commercial && gulp zip-commercial"
      }
    },
    nrwl: {
      update: 'ng update @nrwl/workspace'
    },
    libs: {
      default: 'yarn build:libs:shared && yarn build:libs:packages',
      shared: 'yarn libs:shared:framework:build && yarn libs:shared:framework:build && yarn libs:shared:redux:build && yarn libs:shared:signal-r:build && yarn libs:shared:pricings:build',
      packages: 'yarn libs:packages:skysmack-core:build && yarn libs:packages:oauth2:build && yarn libs:packages:identities:build && yarn libs:packages:persons:build && yarn libs:packages:lodgings:build && yarn libs:packages:products:build && yarn libs:packages:invoices:build && yarn libs:packages:invoices-cash-payments:build && yarn libs:packages:invoices-products:build && yarn libs:packages:maintenance:build && yarn libs:packages:products-pricings:build && yarn libs:packages:lodging-reservations:build && yarn libs:packages:reservations-pricings:build && yarn libs:packages:persons-lodging-reservations:build && yarn libs:packages:terminal-payments:build && yarn libs:packages:emails:build && yarn libs:packages:emails-smtp:build',
      shared: {
        redux: {
          build: 'node libs/shared/redux/ng-packagr-api.js'
        },
        pricings: {
          build: 'node libs/shared/pricings/ng-packagr-api.js'
        },
        signalR: {
          build: 'node libs/shared/signal-r/ng-packagr-api.js'
        },
        framework: {
          build: 'ng-packagr -p libs/shared/framework/package.json'
        },
        packageTypes: {
          build: 'ng-packagr -p libs/shared/package-types/package.json'
        }
      },
      packages: {
        skysmackCore: {
          build: 'node libs/packages/skysmack-core/ng-packagr-api.js'
        },
        identities: {
          build: 'node libs/packages/identities/ng-packagr-api.js'
        },
        invoices: {
          build: 'node libs/packages/invoices/ng-packagr-api.js'
        },
        invoicesProducts: {
          build: 'node libs/packages/invoices-products/ng-packagr-api.js'
        },
        invoicesCashPayments: {
          build: 'node libs/packages/invoices-cash-payments/ng-packagr-api.js'
        },
        lodgingReservations: {
          build: 'node libs/packages/lodging-reservations/ng-packagr-api.js'
        },
        lodgings: {
          build: 'node libs/packages/lodgings/ng-packagr-api.js'
        },
        maintenance: {
          build: 'node libs/packages/maintenance/ng-packagr-api.js'
        },
        oauth2: {
          build: 'node libs/packages/oauth2/ng-packagr-api.js'
        },
        persons: {
          build: 'node libs/packages/persons/ng-packagr-api.js'
        },
        personsLodgingReservations: {
          build: 'node libs/packages/persons-lodging-reservations/ng-packagr-api.js'
        },
        products: {
          build: 'node libs/packages/products/ng-packagr-api.js'
        },
        productsPricings: {
          build: 'node libs/packages/products-pricings/ng-packagr-api.js'
        },
        reservationsPricings: {
          build: 'node libs/packages/reservations-pricings/ng-packagr-api.js'
        },
        terminalPayments: {
          build: 'node libs/packages/terminal-payments/ng-packagr-api.js'
        },
        emails: {
          build: 'node libs/packages/emails/ng-packagr-api.js'
        },
        emailsSmtp: {
          build: 'node libs/packages/emails-smtp/ng-packagr-api.js'
        }
      }
    }
  }
};
