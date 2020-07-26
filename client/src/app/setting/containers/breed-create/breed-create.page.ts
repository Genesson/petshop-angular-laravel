import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SettingSandbox} from '../../setting.sandbox';

@Component({
    selector: 'app-breed-create',
    templateUrl: './breed-create.page.html',
    styleUrls: ['./breed-create.page.scss'],
})
export class BreedCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.settingSandbox.isLoadingBreed$;

    public typesCollection$ = this.settingSandbox.typesCollection$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        type: [
            {type: 'required', message: 'Informe o Tipo.'}
        ]
    };

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    constructor(private formBuilder: FormBuilder,
                private settingSandbox: SettingSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            type: [null, [Validators.required]],
            status: ['ACTIVE']
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
            this.isEditing ? this.settingSandbox.updateBreed(this.formGroup.value) : this.settingSandbox.createBreed(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.settingSandbox.closeModalBreed();
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
