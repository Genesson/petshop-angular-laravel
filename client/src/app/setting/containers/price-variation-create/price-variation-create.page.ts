import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SettingSandbox} from '../../setting.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';

@Component({
    selector: 'app-price-variation-create',
    templateUrl: './price-variation-create.page.html',
    styleUrls: ['./price-variation-create.page.scss'],
})
export class PriceVariationCreatePage implements OnInit {
    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.settingSandbox.isLoadingPriceVariation$;

    public servicesCollection$ = this.unitySandbox.servicesCollection$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'},
        ],
        start: [{type: 'required', message: 'Informe a Data Inicial.'}],
        end: [{type: 'required', message: 'Informe a Data Final.'}],
        percent: [
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 5 caracteres.'},
        ],
        module: [{type: 'required', message: 'Informe o Módulo.'}],
    };

    constructor(
        private formBuilder: FormBuilder,
        private settingSandbox: SettingSandbox,
        private unitySandbox: UnitySandbox
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null],
            description: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(100),
                ],
            ],
            start: ['', [Validators.required]],
            end: ['', [Validators.required]],
            value: [null],
            percent: [null, [Validators.minLength(1), Validators.maxLength(5)]],
            module: [null, [Validators.required]],
            status: [true],
        });
    }

    ngOnInit() {
        this.unitySandbox.loadServicesUnity();

        if (this.form) {
            this.formGroup.patchValue(this.form);
            this.formGroup.get('start').patchValue(new Date(this.form.start));
            this.formGroup.get('end').patchValue(new Date(this.form.end));
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.isEditing
                ? this.settingSandbox.updatePriceVariation(this.formGroup.value)
                : this.settingSandbox.createPriceVariation(
                      this.formGroup.value
                  );
        }
    }

    public onClickCancel() {
        this.settingSandbox.closeModalPriceVariation();
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
}
