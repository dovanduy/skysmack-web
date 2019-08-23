/**
 * Please install nps to run below scripts: npm install -g nps
 * Executing a script : nps start.portal
 * Note: Default is the script run if no specific property is defined.
 */

module.exports = {
  scripts: {
    ng: 'node --max_old_space_size=8000 ./node_modules/@angular/cli/bin/ng',
    default: 'echo Running nps alone does nothing. Try nps start.portal or nps start.commercial',
    start: {
      default: 'echo Please run: nps start.portal or nps start.commercial',
      portal: {
        default: 'ng serve web-portal --host client1.skysmack.test --port 4000 --disableHostCheck',
        prod: 'ng build --prod --sourceMap=true && http-server ./dist/apps/web/web-portal -a www.skysmack.test -p 4000 -o'
      },
      commercial: {
        default: 'ng serve web-commercial',
        analyze: 'ng build web-commercial --stats-json && webpack-bundle-analyzer ./dist/apps/web/web-commercial/stats.json'
      }
    },
    build: {
      default: 'gulp webLocalization && ng build --prod --deploy-url //cdn.skysmack.net/',
      commercial: 'gulp webCommercialLocalization && ng build web-commercial --prod --deploy-url //skysmack.com/',
      dev: 'ng build --stats-json && npm run local-dev-server-insecure',
      prod: {
        default: 'ng build --prod --stats-json && npm run local-dev-server-insecure',
        analyze: 'ng build --prod --stats-json && webpack-bundle-analyzer ./dist/apps/web/web-portal/stats.json'
      },
      analyze: ' webpack-bundle-analyzer ./dist/apps/web/web-portal/stats.json',
      libs: {
        default: 'yarn build:libs:shared && yarn build:libs:packages',
        shared: 'yarn libs:shared:framework:build && yarn libs:shared:framework:build && yarn libs:shared:redux:build && yarn libs:shared:signal-r:build && yarn libs:shared:pricings:build',
        packages: 'yarn libs:packages:skysmack-core:build && yarn libs:packages:oauth2:build && yarn libs:packages:identities:build && yarn libs:packages:persons:build && yarn libs:packages:lodgings:build && yarn libs:packages:products:build && yarn libs:packages:invoices:build && yarn libs:packages:invoices-cash-payments:build && yarn libs:packages:invoices-products:build && yarn libs:packages:maintenance:build && yarn libs:packages:products-pricings:build && yarn libs:packages:lodging-reservations:build && yarn libs:packages:reservations-pricings:build && yarn libs:packages:persons-lodging-reservations:build && yarn libs:packages:terminal-payments:build && yarn libs:packages:emails:build && yarn libs:packages:emails-smtp:build'
      }
    },
    localDevServer: 'cd ./tools/certificates && http-server ./../../dist/apps/web/web-portal -a www.skysmack.test -p 4000 -o -S -C skysmack-test-cert.pem',
    localDevServerInsecure: 'cd ./tools/certificates && http-server ./../../dist/apps/web/web-portal -a www.skysmack.test -p 4000 -o',
    test: 'ng test',
    lint: './node_modules/.bin/nx lint && ng lint',
    e2E: 'ng e2e',
    affected: {
      apps: './node_modules/.bin/nx affected:apps',
      libs: './node_modules/.bin/nx affected:libs',
      build: './node_modules/.bin/nx affected:build',
      e2E: './node_modules/.bin/nx affected:e2e',
      test: './node_modules/.bin/nx affected:test',
      lint: './node_modules/.bin/nx affected:lint',
      depGraph: './node_modules/.bin/nx affected:dep-graph',
      default: './node_modules/.bin/nx affected'
    },
    format: {
      default: './node_modules/.bin/nx format:write',
      write: './node_modules/.bin/nx format:write',
      check: './node_modules/.bin/nx format:check'
    },
    libs: {
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
    },
    gulp: {
      localization: 'gulp webLocalization'
    },
    update: {
      check: 'ng update'
    },
    workspaceSchematic: './node_modules/.bin/nx workspace-schematic',
    depGraph: './node_modules/.bin/nx dep-graph',
    help: './node_modules/.bin/nx help'
  }
};
