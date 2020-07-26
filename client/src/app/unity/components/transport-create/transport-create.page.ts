import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UnitySandbox} from '../../unity.sandbox';
import {SettingSandbox} from '../../../setting/setting.sandbox';

@Component({
    selector: 'app-transport-create',
    templateUrl: './transport-create.page.html',
    styleUrls: ['./transport-create.page.scss'],
})
export class TransportCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.unitySandbox.isLoadingTransport$;

    public regionsCollection$ = this.settingSandbox.regionsCollection$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        region: [
            {type: 'required', message: 'Informe a Região.'}
        ],
        price: [
            {type: 'required', message: 'Informe o Preço.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private unitySandbox: UnitySandbox,
                private settingSandbox: SettingSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null],
            service: [null],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            region: ['', [Validators.required]],
            price: [null, [Validators.required]],
            status: [true]
        });
    }

    ngOnInit() {
        this.settingSandbox.loadRegions();

        if (this.form) {
            this.formGroup.get('service').patchValue(this.form.id);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.unitySandbox.createTransport(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.unitySandbox.closeModalTransport();
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
