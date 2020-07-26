import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PackagePage} from '../containers/package/package.page';

const routes: Routes = [
    {
        path: '',
        component: PackagePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PackageRoutingModule {
}
