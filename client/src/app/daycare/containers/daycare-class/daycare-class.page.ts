import {Component, OnInit} from '@angular/core';

import {PetSandbox} from '../../../pet/pet.sandbox';
import {ScheduleSandbox} from '../../../schedule/schedule.sandbox';

@Component({
    selector: 'app-daycare-class',
    templateUrl: './daycare-class.page.html',
    styleUrls: ['./daycare-class.page.scss'],
})
export class DaycareClassPage implements OnInit {

    public petsCollection$ = this.petSandbox.petsCollection$;

    public schedulesCollection$ = this.scheduleSandbox.schedulesCollection$;

    constructor(private petSandbox: PetSandbox, private scheduleSandbox: ScheduleSandbox) {
    }

    ngOnInit() {
        this.petSandbox.loadPets();
        this.scheduleSandbox.loadDaycare();
    }
}
