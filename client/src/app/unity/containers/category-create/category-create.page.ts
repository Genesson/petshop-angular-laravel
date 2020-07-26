import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UnitySandbox} from '../../unity.sandbox';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.page.html',
    styleUrls: ['./category-create.page.scss'],
})
export class CategoryCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.unitySandbox.isLoadingCategory$;

    public servicesCollection$ = this.unitySandbox.servicesCollection$;

    public unity = this.unitySandbox.unitySnapshot();

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2.'},
            {type: 'maxlength', message: 'Máximo 100.'}
        ],
        order: [
            {type: 'required', message: 'Informe a Ordem.'},
            {type: 'min', message: 'Mínimo 1.'},
            {type: 'max', message: 'Máximo 100.'}
        ],
        module: [
            {type: 'required', message: 'Selecione o módulo.'}
        ],
        services: [
            {type: 'required', message: 'Informe pelo menos um serviço.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private unitySandbox: UnitySandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null, [Validators.required]],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            order: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
            module: [null, [Validators.required]],
            package: [null],
            /*services: [null, [Validators.required]],*/
            status: [true]
        });
    }

    ngOnInit() {
        if (this.form) {
            this.formGroup.patchValue(this.form);
        }

        if (this.unity) {
            this.formGroup.get('unity').patchValue(this.unity.id);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.isEditing ?
                this.unitySandbox.updateCategory(this.formGroup.value) : this.unitySandbox.createCategory(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.unitySandbox.closeModalCategory();
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
