import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';

import {ProductSandbox} from '../../product.sandbox';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.page.html',
    styleUrls: ['./product-create.page.scss'],
})
export class ProductCreatePage implements OnInit, OnDestroy {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.productSandbox.isLoadingProduct$;

    public isLoadingImageProduct$ = this.productSandbox.isLoadingImageProduct$;

    public imageProduct$ = this.productSandbox.imageProduct$;

    public productCategoriesCollection$ = this.productSandbox.productCategoriesCollection$;

    public productProvidersCollection$ = this.productSandbox.productProvidersCollection$;

    public formGroup: FormGroup;

    public tab = 'general';

    private subscriptions = new Subscription();

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição Completa do Produto.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 150 caracteres.'}
        ],
        sku: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 50 caracteres.'}
        ],
        origin: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 50 caracteres.'}
        ],
        ncm: [
            {type: 'minlength', message: 'Mínimo 10 caracteres.'},
            {type: 'maxlength', message: 'Máximo 10 caracteres.'}
        ],
        cfop: [
            {type: 'required', message: 'Informe o CFOP.'},
            {type: 'minlength', message: 'Mínimo 4 caracteres.'},
            {type: 'maxlength', message: 'Máximo 4 caracteres.'}
        ],
        cest: [
            {type: 'minlength', message: 'Mínimo 9 caracteres.'},
            {type: 'maxlength', message: 'Máximo 9 caracteres.'}
        ],
        price_sale: [
            {type: 'required', message: 'Informe o Preço de Venda.'}
        ],
        unity: [
            {type: 'required', message: 'Informe a Unidade.'}
        ],
        quantity_stock: [
            {type: 'required', message: 'Informe a Quantidade em Estoque.'},
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 5 caracteres.'}
        ],
        net_weight: [
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 4 caracteres.'}
        ],
        gross_weight: [
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 4 caracteres.'}
        ],
        width: [
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 4 caracteres.'}
        ],
        heigth: [
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 4 caracteres.'}
        ],
        length: [
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 4 caracteres.'}
        ],
        description_comp: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 500 caracteres.'}
        ],
        cod_product: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 50 caracteres.'}
        ],
        unit_per_box: [
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 2 caracteres.'}
        ],
        guarantee: [
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 4 caracteres.'}
        ],
        gtin: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 50 caracteres.'}
        ],
        unit_tributary: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 50 caracteres.'}
        ],
        conversion: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 50 caracteres.'}
        ],
        ipi: [
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 50 caracteres.'}
        ]
    };

    compareWithFn = (o1, o2) => {
      return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    constructor(private formBuilder: FormBuilder,
                private productSandbox: ProductSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
            sku: ['', [Validators.minLength(2), Validators.maxLength(50)]],
            origin: ['', [Validators.minLength(2), Validators.maxLength(50)]],
            type: [''],
            ncm: ['', [Validators.minLength(10), Validators.maxLength(10)]],
            cfop: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
            cest: ['', [Validators.minLength(9), Validators.maxLength(9)]],
            price_sale: ['', [Validators.required]],
            unity: ['', [Validators.required]],
            quantity_stock: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
            net_weight: ['', [Validators.minLength(1), Validators.maxLength(4)]],
            gross_weight: ['', [Validators.minLength(1), Validators.maxLength(4)]],
            type_pack: [''],
            width: ['', [Validators.minLength(1), Validators.maxLength(4)]],
            heigth: ['', [Validators.minLength(1), Validators.maxLength(4)]],
            length: ['', [Validators.minLength(1), Validators.maxLength(4)]],
            description_comp: ['', [Validators.minLength(2), Validators.maxLength(500)]],
            image: [null],
            category: [null],
            brand: [''],
            manufacturer: [''],
            provider: [null],
            cod_product: ['', [Validators.minLength(2), Validators.maxLength(50)]],
            unit_per_box: ['', [Validators.minLength(1), Validators.maxLength(4)]],
            price_cost: [''],
            line_product: [''],
            guarantee: ['', [Validators.minLength(1), Validators.maxLength(4)]],
            situation: [''],
            gtin: ['', [Validators.minLength(2), Validators.maxLength(50)]],
            unit_tributary: ['', [Validators.minLength(2), Validators.maxLength(50)]],
            conversion: ['', [Validators.minLength(2), Validators.maxLength(50)]],
            ipi: ['', [Validators.minLength(2), Validators.maxLength(50)]],
            value_ipi: ['']
        });
    }

    ngOnInit() {
        this.subscriptions.add(
            this.imageProduct$.subscribe(image => {
                if (image) {
                    this.formGroup.get('image').patchValue(image);
                }
            })
        );

        if (this.form) {
            this.formGroup.patchValue(this.form);
        }
    }

    public onTab(tab) {
        this.tab = tab;
    }

    public onFileUpload(event) {
        const formData = new FormData();
        const file = (event.target as HTMLInputElement).files[0];
        formData.append('image', file);
        this.productSandbox.uploadImageProduct(formData);
    }

    public onClickCancel() {
        this.productSandbox.closeModal();
    }

    public onClickConfirm() {
        this.getNextTab(this.tab);
    }

    private getNextTab(index) {
        const page = {
            general: () => this.tab = 'complementary',
            complementary: () => this.tab = 'others',
            others: () => this.sendForm()
        };
        return page[index]();
    }

    public sendForm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
            this.tab = 'general';
        } else {
            this.isEditing ?
                this.productSandbox.updateProduct(this.formGroup.value) : this.productSandbox.createProduct(this.formGroup.value);
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

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
