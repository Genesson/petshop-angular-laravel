import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {PetSandbox} from '../../pet.sandbox';

import {PetModel} from '../../../shared/models/pet.model';

@Component({
    selector: 'app-pet-evaluation',
    templateUrl: './pet-evaluation.page.html',
    styleUrls: ['./pet-evaluation.page.scss'],
})
export class PetEvaluationPage implements OnInit {

    @Input() pet: PetModel;

    public isLoading$ = this.petSandbox.isLoadingEvaluation$;

    public formGroup: FormGroup;

    public validationMessages = {
        first_date: [
            {type: 'required', message: 'Informe a Data.'}
        ],
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 500 caracteres.'}
        ],
        liked_pool: [
            {type: 'required', message: 'Informe se Gostou da Piscina?.'}
        ],
        pool_obs: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        hydration: [
            {type: 'required', message: 'Informe a Hidratação.'}
        ],
        hydration_obs: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        pee_poop: [
            {type: 'required', message: 'Informe o Xixi e Cocô.'}
        ],
        behavior: [
            {type: 'required', message: 'Informe o Comportamento.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 500 caracteres.'}
        ],
        frequency: [
            {type: 'required', message: 'Informe a Frequência.'},
            {type: 'min', message: 'Mínimo 1 vezes.'},
            {type: 'max', message: 'Máximo 10 vezes.'}
        ],
        reason: [
            {type: 'required', message: 'Informe o Motivo.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 500 caracteres.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private petSandbox: PetSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            pet: [null],
            first_date: ['', [Validators.required]],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
            liked_pool: ['SIM', [Validators.required]],
            pool_obs: ['', [Validators.minLength(2), Validators.maxLength(100)]],
            hydration: ['SIM', [Validators.required]],
            hydration_obs: ['', [Validators.minLength(2), Validators.maxLength(100)]],
            pee_poop: ['NORMAL', [Validators.required]],
            behavior: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
            frequency: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
            reason: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
            test: [true]
        });
    }

    ngOnInit() {
        if (this.pet) {
            this.formGroup.get('pet').patchValue(this.pet);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.petSandbox.createEvaluation(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.petSandbox.closeModalEvaluation();
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
}
