import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AuthSandbox} from '../../auth.sandbox';

@Component({
    selector: 'app-auth',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public loading$ = this.authSandbox.loadingSignin$;

    public formGroup: FormGroup;

    get email() {
        return this.formGroup.get('email');
    }

    get password() {
        return this.formGroup.get('password');
    }

    public validationMessages = {
        email: [
            {type: 'required', message: 'Informe o E-mail.'},
            {type: 'email', message: 'Informe um E-mail Válido.'}
        ],
        password: [
            {type: 'required', message: 'Informe a Senha.'}
        ]
    };

    constructor(private formBuild: FormBuilder,
                private authSandbox: AuthSandbox) {
    }

    ngOnInit() {
        this.formGroup = this.formBuild.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        });
    }

    onSubmit() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.authSandbox.signin(this.formGroup.value);
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
