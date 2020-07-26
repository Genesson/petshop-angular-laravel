import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SettingSandbox} from '../../setting.sandbox';

import {ExceptionDateModel} from '../../../shared/models/exception-date.model';

@Component({
    selector: 'app-exception-date-create',
    templateUrl: './exception-date-create.page.html',
    styleUrls: ['./exception-date-create.page.scss'],
})
export class ExceptionDateCreatePage implements OnInit {

    @Input() form: ExceptionDateModel;

    @Input() isEditing;

    public isLoading$ = this.settingSandbox.isLoadingExceptionDate$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        date: [
            {type: 'required', message: 'Informe a Data.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private settingSandbox: SettingSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            date: ['', [Validators.required]],
            status: ['ACTIVE']
        });
    }

    ngOnInit() {
        if (this.form) {
            this.formGroup.patchValue(this.form);
            this.formGroup.get('date').patchValue([new Date(this.form.date_start), new Date(this.form.date_end)]);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.isEditing ?
                this.settingSandbox.updateExceptionDate(this.formGroup.value) :
                this.settingSandbox.createExceptionDate(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.settingSandbox.closeModalExceptionDate();
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
