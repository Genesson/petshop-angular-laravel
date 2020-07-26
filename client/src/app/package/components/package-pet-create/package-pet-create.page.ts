import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';

import {PetModel} from '../../../shared/models/pet.model';

import {PackageSandbox} from '../../package.sandbox';
import {PetSandbox} from '../../../pet/pet.sandbox';
import {UserSandbox} from '../../../user/user.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';

@Component({
    selector: 'app-package-pet-create',
    templateUrl: './package-pet-create.page.html',
    styleUrls: ['./package-pet-create.page.scss'],
})
export class PackagePetCreatePage implements OnInit, OnDestroy {

    @Input() form: PetModel;

    public packageSelected$ = this.packageSandbox.packageSelected$;

    public formGroup: FormGroup;

    public intervals$ = this.petSandbox.intervals$;

    public isLoading$ = this.petSandbox.isLoadingPetPackage$;

    public usersCollection$ = this.userSandbox.usersCollection$;

    public expectedTime$ = this.unitySandbox.expectedTime$;

    private subscriptions = new Subscription();

    public validationMessages = {
        quantity_days: [
            {type: 'required', message: 'Informe a Quantidade.'},
            {type: 'min', message: 'Mínimo 1 dia.'},
            {type: 'max', message: 'Máximo 30 dias.'}
        ],
        interval_days: [
            {type: 'required', message: 'Informe o Intervalo de dias.'},
            {type: 'min', message: 'Mínimo 1 dia.'},
            {type: 'max', message: 'Máximo 7 dias.'}
        ],
        start_date: [
            {type: 'required', message: 'Informe a Data de Início.'}
        ],
        hour: [
            {type: 'required', message: 'Informe o Horário de Início.'}
        ],
        time: [
            {type: 'required', message: 'Informe o Tempo Estimado.'}
        ],
        user: [
            {type: 'required', message: 'Informe o Responsável.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private packageSandbox: PackageSandbox,
                private petSandbox: PetSandbox,
                private userSandbox: UserSandbox,
                private unitySandbox: UnitySandbox) {
        this.formGroup = this.formBuilder.group({
            pet: [null],
            package: [null],
            quantity_days: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
            interval_days: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
            start_date: [new Date(), [Validators.required]],
            intervals: [null],
            hour: [null, [Validators.required]],
            time: ['', [Validators.required]],
            user: [null, [Validators.required]]
        });
    }

    ngOnInit() {
        this.userSandbox.loadUsers();

        if (this.form) {
            this.formGroup.get('pet').patchValue(this.form);
        }

        this.subscriptions.add(
            this.packageSelected$.subscribe(value => {
                this.formGroup.get('package').patchValue(value);
                this.formGroup.get('quantity_days').patchValue(value.days);
                this.formGroup.get('interval_days').patchValue('7');
            })
        );

        this.subscriptions.add(
            this.expectedTime$.subscribe(value => {
                this.formGroup.get('time').patchValue(value);
            })
        );

        this.subscriptions.add(
            this.intervals$.subscribe(value => {
                this.formGroup.get('intervals').patchValue(value);
            })
        );
    }

    public getDateIntervals() {
        const payload = {
            interval: 'days',
            amount: this.formGroup.get('quantity_days').value,
            days_interval: this.formGroup.get('interval_days').value,
            start_date: this.formGroup.get('start_date').value
        };
        this.petSandbox.getDateIntervals(payload);
    }

    public onClickCancel() {
        this.packageSandbox.closeModalPackagePetCreate();
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.petSandbox.createPetPackage(this.formGroup.value);
        }
    }

    private validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
