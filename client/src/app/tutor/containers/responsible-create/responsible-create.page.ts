import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {TutorSandbox} from '../../tutor.sandbox';

@Component({
    selector: 'app-responsible-create',
    templateUrl: './responsible-create.page.html',
    styleUrls: ['./responsible-create.page.scss'],
})
export class ResponsibleCreatePage implements OnInit {

    @Input() form;

    public isLoading$ = this.tutorSandbox.isLoadingTutor$;

    public formGroup: FormGroup;

    public validationMessages = {
        second_name: [
            {type: 'required', message: 'Informe o Nome.'},
            {type: 'minlength', message: 'Mínimo 4 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        second_cpf: [
            {type: 'required', message: 'Informe o CPF.'},
            {type: 'minlength', message: 'Mínimo 14 caracteres.'},
            {type: 'maxlength', message: 'Máximo 14 caracteres.'}
        ],
        second_phone: [
            {type: 'required', message: 'Informe o Telefone.'},
            {type: 'minlength', message: 'Mínimo 14 caracteres.'},
            {type: 'maxlength', message: 'Máximo 15 caracteres.'}
        ]
    };

    constructor(private formBuilder: FormBuilder, private tutorSandbox: TutorSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            second_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
            second_cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
            second_phone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(15)]]
        });
    }

    ngOnInit() {
        if (this.form) {
            this.formGroup.patchValue(this.form);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.tutorSandbox.updateTutor(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.tutorSandbox.closeResponsibleModal();
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
