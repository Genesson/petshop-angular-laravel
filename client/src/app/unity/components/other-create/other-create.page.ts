import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UnitySandbox} from '../../unity.sandbox';

@Component({
    selector: 'app-other-create',
    templateUrl: './other-create.page.html',
    styleUrls: ['./other-create.page.scss'],
})
export class OtherCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.unitySandbox.isLoadingOther$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        time: [
            {type: 'required', message: 'Informe o Tempo Estimado.'}
        ],
        price: [
            {type: 'required', message: 'Informe o Preço.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private unitySandbox: UnitySandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null],
            service: [null],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            time: ['', [Validators.required]],
            price: [null, [Validators.required]],
            status: [true]
        });
    }

    ngOnInit() {
        if (this.form) {
            this.formGroup.get('service').patchValue(this.form.id);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.unitySandbox.createOther(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.unitySandbox.closeModalOther();
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
