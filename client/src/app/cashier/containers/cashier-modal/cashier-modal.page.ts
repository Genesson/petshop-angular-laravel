import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {CashierSandbox} from '../../cashier.sandbox';

import {CashierModel} from '../../../shared/models/cashier.model';
import {CashierType} from '../../../shared/enums/cashier.enum';

@Component({
    selector: 'app-cashier-modal',
    templateUrl: './cashier-modal.page.html',
    styleUrls: ['./cashier-modal.page.scss'],
})
export class CashierModalPage implements OnInit {

    @Input() data: CashierModel;

    @Input() operation: string;

    @Input() action: string;

    public isLoading$ = this.cashierSandbox.isLoadingCashier$;

    public formGroup: FormGroup;

    public cashierType = CashierType;

    public validationMessages = {
        value: [
            {type: 'required', message: 'Informe o Valor.'}
        ],
        note: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ]
    };

    constructor(private formBuilder: FormBuilder, private cashierSandbox: CashierSandbox) {
        this.formGroup = this.formBuilder.group({
            value: [null, [Validators.required]],
            note: ['', [Validators.minLength(2), Validators.maxLength(100)]],
            operation: [null, [Validators.required]],
            action: [null, [Validators.required]]
        });
    }

    ngOnInit() {
        if (this.data) {
            this.formGroup.get('value').patchValue(this.data.amount);
        }

        if (this.operation) {
            this.formGroup.get('operation').patchValue(this.operation);
        }

        if (this.action) {
            this.formGroup.get('action').patchValue(this.action);
        }
    }

    public onClickCancel() {
        this.cashierSandbox.closeCashierModal();
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.cashierSandbox.createCashier(this.formGroup.value);
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
