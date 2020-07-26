import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CashierPage} from '../containers/cashier/cashier.page';

const routes: Routes = [
    {
        path: '',
        component: CashierPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CashierRoutingModule {
}
