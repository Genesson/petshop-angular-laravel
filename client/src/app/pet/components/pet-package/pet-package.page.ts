import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';

import {SessionSandbox} from '../../../session/session.sandbox';
import {PetSandbox} from '../../pet.sandbox';
import {UserSandbox} from '../../../user/user.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';

import {ServiceModel} from '../../../shared/models/service.model';

@Component({
    selector: 'app-pet-package',
    templateUrl: './pet-package.page.html',
    styleUrls: ['./pet-package.page.scss'],
})
export class PetPackagePage implements OnInit, OnDestroy {
    @Input() pet;

    @Input() service: ServiceModel;

    @Output() emitPackage = new EventEmitter();

    public formGroup: FormGroup;

    public isPackage = false;

    public weekDays = {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    };

    public user = this.sessionSandbox.userData;

    public usersCollection$ = this.userSandbox.usersCollection$;

    public expectedTime$ = this.unitySandbox.expectedTime$;

    public transportsCollection$ = this.unitySandbox.transportsCollection$;

    public intervals$ = this.petSandbox.intervals$;

    public isLoadingPetPackage$ = this.petSandbox.isLoadingPetPackage$;

    private subscriptions = new Subscription();

    public month = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    public validationMessages = {
      interval_days: [
        {type: 'required', message: 'Informe a Quantidade.'},
        {type: 'min', message: 'Mínimo 1 dia.'},
        {type: 'max', message: 'Máximo 7 dias.'}
      ],
      start_date: [{type: 'required', message: 'Informe a Data de Início.'}],
      hour: [{type: 'required', message: 'Informe o Horário.'}],
      time: [{type: 'required', message: 'Informe o Tempo Estimado.'}],
      user: [{type: 'required', message: 'Informe o Responsável.'}],
      transport_id: [{ type: 'required', message: 'Informe a Região.'}]
    };

    constructor(
        private formBuilder: FormBuilder,
        public sessionSandbox: SessionSandbox,
        private userSandbox: UserSandbox,
        private unitySandbox: UnitySandbox,
        private petSandbox: PetSandbox
    ) {
      this.formGroup = this.formBuilder.group({
        pet: [null],
        service: [null],
        quantity_days: ['', [Validators.min(1), Validators.max(7)]],
        interval_days: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
        weekdays: [false],
        with_month: [false],
        start_date: [new Date(), [Validators.required]],
        week_days: [''],
        intervals: [null],
        hour: [null, [Validators.required]],
        time: ['', [Validators.required]],
        user: [null, [Validators.required]],
        transport: [false],
        transport_id: [null]
      });
    }

    get date() {
        return this.month[
            new Date(this.formGroup.get('start_date').value).getMonth()
        ];
    }

    ngOnInit() {
        this.unitySandbox.loadTransportsUnity();

        if (this.pet) {
            this.formGroup.get('pet').patchValue(this.pet);
        }

        if (this.service) {
            this.formGroup.get('service').patchValue(this.service);
        }

        this.subscriptions.add(
            this.expectedTime$.subscribe((value) => {
                this.formGroup.get('time').patchValue(value);
            })
        );

        this.subscriptions.add(
            this.intervals$.subscribe((value) => {
                this.formGroup.get('intervals').patchValue(value);
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

    public changeWeekDays() {
        if (this.returnInterval() === 'weeks') {
          this.formGroup.get('with_month').setValue(true);

          this.formGroup.get('interval_days').clearValidators();
          this.formGroup.get('interval_days').setValue('');
          this.formGroup.updateValueAndValidity();
        } else {
          this.formGroup.get('with_month').setValue(false);

          this.formGroup
              .get('interval_days')
              .setValidators([
                  Validators.required,
                  Validators.min(1),
                  Validators.max(7),
              ]);
          this.formGroup.get('interval_days').setValue('');
          this.formGroup.updateValueAndValidity();
        }
    }

    public getDateIntervals() {
        const payload = {
            interval: this.returnInterval(),
            amount: this.formGroup.get('quantity_days').value,
            days_interval: this.formGroup.get('interval_days').value,
            start_date: this.formGroup.get('start_date').value,
            closed_mouth: this.returnClosedMouth(),
            week_days: this.returnWeekDay(),
        };
        this.petSandbox.getDateIntervals(payload);
    }

    private returnClosedMouth() {
        return this.formGroup.get('with_month').value;
    }

    private returnInterval() {
        return this.formGroup.get('weekdays').value ? 'weeks' : 'days';
    }

    private returnWeekDay() {
        const weekDays = [];
        if (this.weekDays.sunday) {
            weekDays.push('Mon');
        }
        if (this.weekDays.monday) {
            weekDays.push('Tue');
        }
        if (this.weekDays.tuesday) {
            weekDays.push('Wed');
        }
        if (this.weekDays.wednesday) {
            weekDays.push('Thu');
        }
        if (this.weekDays.thursday) {
            weekDays.push('Fri');
        }
        if (this.weekDays.friday) {
            weekDays.push('Sat');
        }
        if (this.weekDays.saturday) {
            weekDays.push('Sun');
        }
        this.formGroup.get('week_days').patchValue(weekDays);
        return weekDays;
    }

    public changePackage() {
        this.isPackage = !this.isPackage;
        this.emitPackage.emit(this.isPackage);
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.petSandbox.createPetPackage(this.formGroup.value);
        }
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

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
