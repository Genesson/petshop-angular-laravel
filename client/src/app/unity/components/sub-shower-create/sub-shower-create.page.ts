import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UnitySandbox} from '../../unity.sandbox';
import {SettingSandbox} from '../../../setting/setting.sandbox';

@Component({
    selector: 'app-sub-shower-create',
    templateUrl: './sub-shower-create.page.html',
    styleUrls: ['./sub-shower-create.page.scss'],
})
export class SubShowerCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.unitySandbox.isLoadingSubShower$;

    public sizesCollection$ = this.settingSandbox.sizesCollection$;

    public breedsCollection$ = this.settingSandbox.breedsCollection$;

    public typeFursCollection$ = this.settingSandbox.typeFursCollection$;

    public typesCollection$ = this.settingSandbox.typesCollection$;

    public formGroup: FormGroup;

    public validationMessages = {
        type_pet: [
            {type: 'required', message: 'Informe o Tipo.'}
        ],
        size: [
            {type: 'required', message: 'Informe o Porte.'}
        ],
        breed: [
            {type: 'required', message: 'Informe a Raça.'}
        ],
        type_fur: [
            {type: 'required', message: 'Informe o Tipo de Pelo.'}
        ],
        time: [
            {type: 'required', message: 'Informe o Tempo Estimado.'}
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
            type_pet: [null, [Validators.required]],
            size: [null, [Validators.required]],
            breed: [null, [Validators.required]],
            type_fur: [null, [Validators.required]],
            time: ['', [Validators.required]],
            price: [null, [Validators.required]],
            status: [true]
        });
    }

    ngOnInit() {
        this.settingSandbox.loadSizes();
        this.settingSandbox.loadBreeds();
        this.settingSandbox.loadTypeFurs();
        this.settingSandbox.loadTypes();

        if (this.form) {
            this.formGroup.get('service').patchValue(this.form.id);
        }
    }

    public changeType($event) {
        if ($event.detail.value !== '') {
            this.settingSandbox.loadBreedsPerType($event.detail.value);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.formGroup.removeControl('type_pet');
            this.unitySandbox.createSubShower(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.unitySandbox.closeModalSubShower();
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
