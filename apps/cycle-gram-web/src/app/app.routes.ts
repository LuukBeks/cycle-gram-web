import { Route, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { UserListComponent } from '@cycle-gram-web-main/cycle-gram/features';
import { AboutComponent } from '@cycle-gram-web-main/cycle-gram/features';
import { UserDetailComponent } from '@cycle-gram-web-main/cycle-gram/features';
// import { UserEditComponent } from '@cycle-gram-web-main/cycle-gram/features';
// import { UserCreateComponent } from '@cycle-gram-web-main/cycle-gram/features';

export const appRoutes: Route[] = [
    {
        path: 'users',
        pathMatch: 'full',
        component: UserListComponent
    },
    {
        path: 'about',
        pathMatch: 'full',
        component: AboutComponent
    },
    {
        path: 'users/:id',
        pathMatch: 'full',
        component: UserDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
