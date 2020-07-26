import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ScheduleModel} from '../../../shared/models/schedule.model';

@Component({
    selector: 'app-daycare-buttons',
    templateUrl: './daycare-buttons.page.html',
    styleUrls: ['./daycare-buttons.page.scss'],
})
export class DaycareButtonsPage implements OnInit {

    @Input() schedule: ScheduleModel[];

    @Output() selectAllSchedule = new EventEmitter();

    @Output() clickChangeAll = new EventEmitter();

    public check = {
        PRESENCE: false,
        PEED: false,
        POOPED: false,
        FIST_MEAT: false,
        SECOND_MEAT: false,
        OUT: false
    };

    constructor() {
    }

    ngOnInit() {
    }

    public changeAll(schedule: ScheduleModel[], action: string) {
        switch (action) {
            case 'PRESENCE':
                this.clickChangeAll.emit({schedule, action});
                this.check.PRESENCE = !this.check.PRESENCE;
                break;
            case 'PEED':
                this.clickChangeAll.emit({schedule, action});
                this.check.PEED = !this.check.PEED;
                break;
            case 'POOPED':
                this.clickChangeAll.emit({schedule, action});
                this.check.POOPED = !this.check.POOPED;
                break;
            case 'FIST_MEAT':
                this.clickChangeAll.emit({schedule, action});
                this.check.FIST_MEAT = !this.check.FIST_MEAT;
                break;
            case 'SECOND_MEAT':
                this.clickChangeAll.emit({schedule, action});
                this.check.SECOND_MEAT = !this.check.SECOND_MEAT;
                break;
            case 'OUT':
                this.clickChangeAll.emit({schedule, action});
                this.check.OUT = !this.check.OUT;
                break;
        }
    }
}
