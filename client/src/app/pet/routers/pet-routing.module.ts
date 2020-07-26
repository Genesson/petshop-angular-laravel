import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PetPage} from '../containers/pet/pet.page';

const routes: Routes = [
    {
        path: '',
        component: PetPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PetRoutingModule {
}
