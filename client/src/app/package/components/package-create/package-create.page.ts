import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {PackageSandbox} from '../../package.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';

@Component({
    selector: 'app-daycare-create',
    templateUrl: './package-create.page.html',
    styleUrls: ['./package-create.page.scss'],
})
export class PackageCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.packageSandbox.isLoadingPackage$;

    public servicesCollection$ = this.unitySandbox.servicesCollection$;

    public formGroup: FormGroup;

    public validationMessages = {
        name: [
            {type: 'required', message: 'Informe o Nome do pacote.'}
        ],
        days: [
            {type: 'required', message: 'Informe a Qtd dias.'}
        ],
        price: [
            {type: 'required', message: 'Informe o Valor un. do pacote.'}
        ],
        service: [
            {type: 'required', message: 'Selecione o serviço.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private unitySandbox: UnitySandbox,
                private packageSandbox: PackageSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required]],
            days: [null, [Validators.required]],
            price: [null, [Validators.required]],
            service: [null, [Validators.required]],
            promotional_days: [null],
            promotional_price: [null],
            promotional_percent: [null],
            toast_before: [null],
            toast_name: [null],
            package_until: [null]
        });
    }

    ngOnInit() {
        this.unitySandbox.loadServicesUnity();

        if (this.form) {
            this.formGroup.patchValue(this.form);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.isEditing ?
                this.packageSandbox.updatePackage(this.formGroup.value) : this.packageSandbox.createPackage(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.packageSandbox.closeModalPackageCreate();
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
