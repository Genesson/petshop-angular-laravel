import {Component, Input, OnInit} from '@angular/core';

import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {PetModel} from '../../../shared/models/pet.model';

import {VeterinarySandbox} from '../../veterinary.sandbox';

@Component({
    selector: 'app-veterinary-create',
    templateUrl: './veterinary-create.page.html',
    styleUrls: ['./veterinary-create.page.scss'],
})
export class VeterinaryCreatePage implements OnInit {

    @Input() pet: PetModel;

    public consultationsCollection$ = this.veterinarySandbox.consultationsCollection$;

    public isLoading$ = this.veterinarySandbox.isLoadingConsultation$;

    public formGroup: FormGroup;

    public treatments: FormArray;

    public validationMessages = {
        current_weight: [
            {type: 'required', message: 'Informe o Peso atual.'},
            {type: 'min', message: 'Mínimo 1.'},
            {type: 'max', message: 'Máximo 100.'}
        ],
        temperature: [
            {type: 'required', message: 'Informe a Temperatura.'},
            {type: 'min', message: 'Mínimo 20.'},
            {type: 'max', message: 'Máximo 40.'}
        ],
        anamnesis: [
            {type: 'required', message: 'Informe o Anamnese.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 500 caracteres.'}
        ],
        diagnosis: [
            {type: 'required', message: 'Informe o Diagnóstico.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 500 caracteres.'}
        ],
        exams: [
            {type: 'required', message: 'Informe os Exames.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 500 caracteres.'}
        ],
        remedy_name: [
            {type: 'required', message: 'Informe o Nome do Remédio.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private veterinarySandbox: VeterinarySandbox) {
        this.formGroup = this.formBuilder.group({
            pet: [null],
            current_weight: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
            temperature: ['', [Validators.required, Validators.min(20), Validators.max(40)]],
            anamnesis: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
            diagnosis: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
            exams: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
            status: [true],
            treatments: this.formBuilder.array([this.createItem()])
        });
    }

    ngOnInit() {
        this.veterinarySandbox.loadConsultationsPet(this.pet);
        if (this.pet) {
            this.formGroup.get('pet').patchValue(this.pet.id);
        }
    }

    openModalVeterinaryView(consultation) {
        this.veterinarySandbox.openModalVeterinaryView(consultation.detail.value);
    }

    get formData() {
        return this.formGroup.get('treatments') as FormArray;
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            remedy_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            number_of_days: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
            times_day: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
            amount: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
            unity_type: ['', [Validators.required]],
            observations: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
            status: [true]
        });
    }

    public addItem(): void {
        this.treatments = this.formGroup.get('treatments') as FormArray;
        this.treatments.push(this.createItem());
    }

    public onClickCancel() {
        this.veterinarySandbox.closeModalVeterinaryCreate();
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.veterinarySandbox.createConsultation(this.formGroup.value);
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
}
