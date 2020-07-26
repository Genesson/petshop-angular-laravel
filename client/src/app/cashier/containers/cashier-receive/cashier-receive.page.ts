import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {CashierSandbox} from '../../cashier.sandbox';
import {SettingSandbox} from '../../../setting/setting.sandbox';

import {ReceivableModel} from '../../../shared/models/receivable.model';

@Component({
    selector: 'app-cashier-receive',
    templateUrl: './cashier-receive.page.html',
    styleUrls: ['./cashier-receive.page.scss'],
})
export class CashierReceivePage implements OnInit {

    @Input() data: ReceivableModel;

    public isLoading$ = this.cashierSandbox.isLoadingReceivable$;

    public cardFlagsCollection$ = this.settingSandbox.cardFlagsCollection$;

    public formGroup: FormGroup;

    public validationMessages = {
        value: [
            {type: 'required', message: 'Informe o Valor.'}
        ],
        payment_with: [
            {type: 'required', message: 'Informe o Pagamento em.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private cashierSandbox: CashierSandbox,
                private settingSandbox: SettingSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            value: [null, [Validators.required]],
            payment_with: [null, [Validators.required]],
            flag: [null]
        });
    }

    ngOnInit() {
        this.settingSandbox.loadCardFlags();

        if (this.data) {
            this.formGroup.get('id').patchValue(this.data.id);
        }

        if (this.data) {
            this.formGroup.get('value').patchValue(this.data.value);
        }
    }

    public onClickCancel() {
        this.cashierSandbox.closeReceiveModal();
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.cashierSandbox.updateReceivable(this.formGroup.value);
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
