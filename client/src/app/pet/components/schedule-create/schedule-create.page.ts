import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';

import {ScheduleSandbox} from '../../../schedule/schedule.sandbox';
import {PetSandbox} from '../../pet.sandbox';
import {UserSandbox} from '../../../user/user.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';

import {ServiceModel} from '../../../shared/models/service.model';

@Component({
    selector: 'app-schedule-create',
    templateUrl: './schedule-create.page.html',
    styleUrls: ['./schedule-create.page.scss'],
})
export class ScheduleCreatePage implements OnInit, OnDestroy {
    @Input() form;

    @Input() service: ServiceModel;

    @ViewChild('petPackage', {static: false}) petPackage;

    public isLoading$ = this.scheduleSandbox.isLoadingSchedule$;

    public usersCollection$ = this.userSandbox.usersScheduleCollection$;

    public expectedTime$ = this.unitySandbox.expectedTime$;

    public transportsCollection$ = this.unitySandbox.transportsCollection$;

    public isLoadingPetPackage$ = this.petSandbox.isLoadingPetPackage$;

    public isPackage = false;

    public formGroup: FormGroup;

    private subscriptions = new Subscription();

    public validationMessages = {
        service: [{type: 'required', message: 'Informe o Serviço.'}],
        date: [{type: 'required', message: 'Informe a Data.'}],
        hour: [{type: 'required', message: 'Informe o Horário.'}],
        time: [{type: 'required', message: 'Informe o Tempo Estimado.'}],
        user: [{type: 'required', message: 'Informe o Responsável.'}],
        transport_id: [{type: 'required', message: 'Informe a Região.'}]
    };

    constructor(
        private formBuilder: FormBuilder,
        private scheduleSandbox: ScheduleSandbox,
        private petSandbox: PetSandbox,
        private userSandbox: UserSandbox,
        private unitySandbox: UnitySandbox
    ) {
      this.formGroup = this.formBuilder.group({
        id: [null],
        pet: [null],
        unity: [null],
        service: [null, [Validators.required]],
        date: [null, [Validators.required]],
        hour: [null, [Validators.required]],
        time: ['', [Validators.required]],
        user: [null, [Validators.required]],
        transport: [false],
        transport_id: [null],
        status: [true]
      });
    }

    ngOnInit() {
        this.userSandbox.loadUsers();
        this.unitySandbox.loadTransportsUnity();

        if (this.form) {
            this.formGroup.get('pet').patchValue(this.form);
        }

        if (this.service) {
            this.formGroup.get('service').patchValue(this.service.id);
        }

        this.subscriptions.add(
            this.expectedTime$.subscribe((value) => {
                this.formGroup.get('time').patchValue(value);
            })
        );
    }

    public changeTransport(event) {
      if (event.detail.checked) {
        this.formGroup.get('transport_id').setValidators([Validators.required]);
        this.formGroup.get('transport_id').setValue(null);
        this.formGroup.updateValueAndValidity();
      } else {
        this.formGroup.get('transport_id').clearValidators();
        this.formGroup.get('transport_id').setValue(null);
        this.formGroup.updateValueAndValidity();
      }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.scheduleSandbox.createSchedule(this.formGroup.value);
        }
    }

    public onClickConfirmPackage() {
        this.petPackage.onClickConfirm();
    }

    public onClickCancel() {
        this.petSandbox.closePetScheduleModal();
    }

    private validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    public changePackage($event) {
        this.isPackage = $event;
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
