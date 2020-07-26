import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {PetSandbox} from '../../pet.sandbox';

@Component({
    selector: 'app-pet-medicine-create',
    templateUrl: './pet-medicine-create.page.html',
    styleUrls: ['./pet-medicine-create.page.scss'],
})
export class PetMedicineCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.petSandbox.isLoadingMedicine$;

    public pet = this.petSandbox.petSnapshot();

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2.'},
            {type: 'maxlength', message: 'Máximo 100.'}
        ],
        date: [
            {type: 'required', message: 'Informe a Data.'}
        ],
        validity: [
            {type: 'required', message: 'Informe a Validade.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private petSandbox: PetSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            pet: [null, [Validators.required]],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            date: ['', [Validators.required]],
            validity: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        if (this.form) {
            this.formGroup.patchValue(this.form);
        }

        if (this.pet) {
            this.formGroup.get('pet').patchValue(this.pet.id);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.isEditing ?
                this.petSandbox.updatePetMedicine(this.formGroup.value) : this.petSandbox.createPetMedicine(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.petSandbox.closePetMedicineModal();
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
