import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {CartSandbox} from '../../cart.sandbox';
import {SettingSandbox} from '../../../setting/setting.sandbox';

import {OrderModel} from '../../../shared/models/order.model';
import {ReceivableModel} from '../../../shared/models/receivable.model';

import {GenericValidator} from '../../../shared/validators/generic-validator';

@Component({
    selector: 'app-card-payment',
    templateUrl: './card-payment.page.html',
    styleUrls: ['./card-payment.page.scss'],
})
export class CardPaymentPage implements OnInit {

    @Input() data: OrderModel;

    public isLoading$ = this.cartSandbox.isLoading$;

    public cardFlagsCollection$ = this.settingSandbox.cardFlagsCollection$;

    public formGroup: FormGroup;

    public arrayReceivables: ReceivableModel[] = [];

    public validationMessages = {
        value: [
            {type: 'required', message: 'Informe o Valor.'}
        ],
        payment_form: [
            {type: 'required', message: 'Informe a Forma de Pagamento.'}
        ],
        quotas: [
            {type: 'min', message: 'Mínimo 1 vez.'},
            {type: 'min', message: 'Máximo 6 vezes.'}
        ],
        payment_with: [
            {type: 'required', message: 'Informe o Pagamento em.'}
        ],
        cpf_number: [
            {type: 'minlength', message: 'Mínimo 14 caracteres.'},
            {type: 'maxlength', message: 'Máximo 14 caracteres.'},
            {type: 'cpfNotValid', message: 'O cpf não é válido.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private cartSandbox: CartSandbox,
                private settingSandbox: SettingSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            order: [null, [Validators.required]],
            value: [null, [Validators.required]],
            payment_form: [null, [Validators.required]],
            quotas: [null, [Validators.min(1), Validators.max(6)]],
            payment_with: [null, [Validators.required]],
            flag: [null],
            voucher_number: [null],
            cpf: ['SIM'],
            cpf_number: [null, [Validators.minLength(14), Validators.maxLength(14), GenericValidator.isValidCpf()]],
            receivables: new FormArray([])
        });
    }

    ngOnInit() {
        this.settingSandbox.loadCardFlags();

        if (this.data) {
            this.formGroup.get('order').patchValue(this.data.id);
            this.formGroup.get('value').patchValue(this.data.amount);
        }
    }

    get receivables(): FormArray {
        return this.formGroup.get('receivables') as FormArray;
    }

    public changePaymentForm(event) {
        if (event.detail.value === 'VISTA') {
            this.changeQuota(1);
            this.formGroup.get('quotas').patchValue('1');
        }
    }

    public changeQuota(event) {
        this.arrayReceivables = [];
        this.receivables.clear();

        if (event > 0 && event <= 6) {
            const quotas = Number(event);
            for (let i = 1; i <= quotas; i++) {
                const receivable = {
                  quota: i + ' de ' + event,
                  expiration: this.currentDate(i),
                  value: this.formatValue(this.data.amount, quotas),
                };
                this.arrayReceivables.push(receivable as ReceivableModel);
                this.receivables.push(this.formBuilder.control(receivable as ReceivableModel));
            }
        }
    }

    private formatValue(amount, quotas) {
      return (Math.round((amount / quotas) * 100) / 100).toFixed(2);
    }

    public changePaymentWith(event) {
        if (event.detail.value === 'DINHEIRO') {
            this.changeQuota(1);
            this.formGroup.get('payment_form').patchValue('VISTA');
            this.formGroup.get('quotas').patchValue('1');
        }
    }

    private currentDate(quantity) {
        const data = new Date(),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + quantity).toString().padStart(2, '0'),
            ano = data.getFullYear();
        return dia + '/' + mes + '/' + ano;
    }

    public onClickCancel() {
        this.cartSandbox.closeCardPaymentModal();
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.cartSandbox.createReceivables(this.formGroup.value);
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
