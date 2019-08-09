import { NgModule } from '@angular/core';
import { CommercialUsersModule } from './../../../../../../libs/commercial-packages/commercial-users/src/lib/commercial-users.module';
import { Route } from '@angular/router';

@NgModule({
  imports: [
    CommercialUsersModule
  ]
})
export class CommercialUsersWrapperModule { }

export const commercialUsersRoute = { path: 'users', loadChildren: './packages/commercial_users_wrapper.module#CommercialUsersWrapperModule' } as Route;