import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AlertController} from '@ionic/angular';

import {UserSandbox} from '../../../user/user.sandbox';

@Component({
    selector: 'app-permission-create',
    templateUrl: './permission-create.page.html',
    styleUrls: ['./permission-create.page.scss'],
})
export class PermissionCreatePage implements OnInit {
    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.userSandbox.isLoadingPermission$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'},
        ],
    };

    constructor(
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private userSandbox: UserSandbox
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            description: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(100),
                ],
            ],
            pets: [null],
            daily: [null],
            users: [null],
            settings: [null],
            cashier: [null],
            vet: [null],
            reports: [null],
            products: [null],
            tutors: [null],
            units: [null],
            invoices: [null],
            status: [true],
        });
    }

    ngOnInit() {
        if (this.form) {
            this.formGroup.patchValue(this.form);
        }
    }

    public onClickCancel() {
        this.userSandbox.closePermissionModal();
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.isEditing
                ? this.userSandbox.updatePermission(this.formGroup.value)
                : this.userSandbox.createPermission(this.formGroup.value);
        }
    }

    private validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
