import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../../shared/guards/auth.guard';

import {MainPage} from '../containers/main/main.page';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                loadChildren: '../../home/home.module#HomeModule',
            },
            {
                path: 'pets',
                loadChildren: '../../pet/pet.module#PetModule',
            },
            {
                path: 'cashier',
                loadChildren: '../../cashier/cashier.module#CashierModule',
            },
            {
                path: 'cart',
                loadChildren: '../../cart/cart.module#CartPageModule',
            },
            {
                path: 'products',
                loadChildren: '../../product/product.module#ProductModule',
            },
            {
                path: 'schedule',
                loadChildren: '../../schedule/schedule.module#ScheduleModule',
            },
            {
                path: 'daycare',
                loadChildren: '../../daycare/daycare.module#DaycareModule',
            },
            {
                path: 'units',
                loadChildren: '../../unity/unity.module#UnityModule',
            },
            {
                path: 'veterinary',
                loadChildren:
                    '../../veterinary/veterinary.module#VeterinaryModule',
            },
            {
                path: 'tutors',
                loadChildren: '../../tutor/tutor.module#TutorModule',
            },
            {
                path: 'users',
                loadChildren: '../../user/user.module#UserModule',
            },
            {
                path: 'reports',
                loadChildren: '../../report/report.module#ReportModule',
            },
            {
                path: 'settings',
                loadChildren: '../../setting/setting.module#SettingModule',
            },
            {
                path: 'invoice',
                loadChildren: '../../invoice/invoice.module#InvoiceModule',
            },
            {
                path: 'package',
                loadChildren: '../../package/package.module#PackageModule',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
