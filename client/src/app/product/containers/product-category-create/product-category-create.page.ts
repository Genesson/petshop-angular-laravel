import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ProductSandbox} from '../../product.sandbox';

@Component({
    selector: 'app-product-category-create',
    templateUrl: './product-category-create.page.html',
    styleUrls: ['./product-category-create.page.scss'],
})
export class ProductCategoryCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.productSandbox.isLoadingProductCategory$;

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
                this.productSandbox.updateProductCategory(this.formGroup.value) :
                this.productSandbox.createProductCategory(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.productSandbox.closeModalProductCategory();
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
