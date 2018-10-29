import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonsIndexComponent } from './persons/components/persons-index/persons-index.component';


const routes: Routes = [
    {
        path: 'persons', component: PersonsIndexComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PersonRoutingModule { }

// children: [
//     { path: 'create', component: UsersCreateComponent, pathMatch: 'full' },
//     { path: 'edit/:id', component: UsersEditComponent, pathMatch: 'full' },
//     { path: 'edit/set-password/:id', component: UsersSetPasswordComponent, pathMatch: 'full' },
//     { path: 'edit/roles/:id', component: UsersRolesComponent, pathMatch: 'full' },
// ]