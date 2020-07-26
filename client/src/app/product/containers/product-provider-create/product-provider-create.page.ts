import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ProductSandbox} from '../../product.sandbox';

@Component({
    selector: 'app-product-provider-create',
    templateUrl: './product-provider-create.page.html',
    styleUrls: ['./product-provider-create.page.scss'],
})
export class ProductProviderCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.productSandbox.isLoadingProductProvider$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2.'},
            {type: 'maxlength', message: 'Máximo 100.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private productSandbox: ProductSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            status: [true]
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
            this.isEditing ?
                this.productSandbox.updateProductProvider(this.formGroup.value) :
                this.productSandbox.createProductProvider(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.productSandbox.closeModalProductProvider();
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
