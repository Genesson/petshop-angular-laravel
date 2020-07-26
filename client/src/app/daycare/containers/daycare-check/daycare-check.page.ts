import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';

import {PetSandbox} from '../../../pet/pet.sandbox';
import {ScheduleSandbox} from '../../../schedule/schedule.sandbox';

@Component({
    selector: 'app-daycare-check',
    templateUrl: './daycare-check.page.html',
    styleUrls: ['./daycare-check.page.scss'],
})
export class DaycareCheckPage implements OnInit {

    public petsCollection$ = this.petSandbox.petsCollection$;

    public schedulesCollection$ = this.scheduleSandbox.schedulesCollection$;

    public schedulesCheckCollection$ = this.scheduleSandbox.schedulesCheckCollection$;

    public formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private petSandbox: PetSandbox,
                private scheduleSandbox: ScheduleSandbox) {
        this.formGroup = this.formBuilder.group({
            schedule: [null],
            action: [''],
            presence: [null],
            first_meat: [null],
            second_meat: [null],
            peed: [null],
            pooped: [null],
            observation: [null],
            status: [true]
        });
    }

    ngOnInit() {
        this.petSandbox.loadPets();
        this.scheduleSandbox.loadDaycare();
    }

    public selectAllSchedule() {
        this.scheduleSandbox.selectAllSchedule();
    }

    public selectSchedule(schedule) {
        this.scheduleSandbox.selectSchedule(schedule);
    }

    public changeAllSchedule($event) {
        this.scheduleSandbox.updateScheduleAll($event.schedule, $event.action);
    }

    public changePresence(event, schedule) {
        this.formGroup.patchValue(schedule.daycare);
        this.formGroup.get('action').patchValue('PRESENCE');
        this.formGroup.get('schedule').patchValue(schedule.id);
        this.formGroup.get('presence').patchValue(event.detail.checked);
        this.onClickConfirm();
    }

    public changePeed(event, schedule) {
        this.formGroup.patchValue(schedule.daycare);
        this.formGroup.get('action').patchValue('PEED');
        this.formGroup.get('schedule').patchValue(schedule.id);
        this.formGroup.get('peed').patchValue(event.detail.checked);
        this.onClickConfirm();
    }

    public changePooped(event, schedule) {
        this.formGroup.patchValue(schedule.daycare);
        this.formGroup.get('action').patchValue('POOPED');
        this.formGroup.get('schedule').patchValue(schedule.id);
        this.formGroup.get('pooped').patchValue(event.detail.checked);
        this.onClickConfirm();
    }

    public changeFirstMeat(event, schedule) {
        this.formGroup.patchValue(schedule.daycare);
        this.formGroup.get('action').patchValue('FIST_MEAT');
        this.formGroup.get('schedule').patchValue(schedule.id);
        this.formGroup.get('first_meat').patchValue(event.detail.value);
        this.onClickConfirm();
    }

    public changeSecondMeat(event, schedule) {
        this.formGroup.patchValue(schedule.daycare);
        this.formGroup.get('action').patchValue('SECOND_MEAT');
        this.formGroup.get('schedule').patchValue(schedule.id);
        this.formGroup.get('second_meat').patchValue(event.detail.value);
        this.onClickConfirm();
    }

    public changeObservation(event, schedule) {
        this.formGroup.patchValue(schedule.daycare);
        this.formGroup.get('action').patchValue('OBSERVATION_MEAT');
        this.formGroup.get('schedule').patchValue(schedule.id);
        this.formGroup.get('observation').patchValue(event);
        this.onClickConfirm();
    }

    public onClickConfirm() {
        this.scheduleSandbox.updateScheduleDaycare(this.formGroup.value);
    }
}
