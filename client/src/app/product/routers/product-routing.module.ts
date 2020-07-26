import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductPage} from '../containers/product/product.page';

const routes: Routes = [
    {
        path: '',
        component: ProductPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {
}
