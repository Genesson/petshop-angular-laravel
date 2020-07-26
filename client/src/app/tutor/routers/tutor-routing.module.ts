import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TutorPage} from '../containers/tutor/tutor.page';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: TutorPage
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TutorRoutingModule {
}
