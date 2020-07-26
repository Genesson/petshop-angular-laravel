import {NgModule} from '@angular/core';

import {LeftPadPipe} from './leftpad.pipe';
import {AgePipe} from './age.pipe';

@NgModule({
    declarations: [
        LeftPadPipe,
        AgePipe
    ],
    exports: [
        LeftPadPipe,
        AgePipe
    ],
    providers: [
        LeftPadPipe,
        AgePipe
    ]
})
export class PipesModule {
}
