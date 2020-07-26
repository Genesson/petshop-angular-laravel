import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {UnitySandbox} from '../../unity.sandbox';
import {SettingSandbox} from '../../../setting/setting.sandbox';
import {UserSandbox} from '../../../user/user.sandbox';

@Component({
    selector: 'app-pet-sitter-create',
    templateUrl: './pet-sitter-create.page.html',
    styleUrls: ['./pet-sitter-create.page.scss'],
})
export class PetSitterCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.unitySandbox.isLoadingPetSitter$;

    public regionsCollection$ = this.settingSandbox.regionsCollection$;

    public usersCollection$ = this.userSandbox.usersCollection$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        region: [
            {type: 'required', message: 'Informe a Região.'}
        ],
        time: [
            {type: 'required', message: 'Informe o Tempo Estimado.'}
        ],
        price: [
            {type: 'required', message: 'Informe o Preço.'}
        ],
        user: [
            {type: 'required', message: 'Informe o Responsável.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private unitySandbox: UnitySandbox,
                private settingSandbox: SettingSandbox,
                private userSandbox: UserSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null],
            user: [null, [Validators.required]],
            service: [null],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            region: ['', [Validators.required]],
            time: ['', [Validators.required]],
            price: [null, [Validators.required]],
            status: [true]
        });
    }

    ngOnInit() {
        this.settingSandbox.loadRegions();
        this.userSandbox.loadUsers();

        if (this.form) {
            this.formGroup.get('service').patchValue(this.form.id);
        }
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.unitySandbox.createPetSitter(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.unitySandbox.closeModalPetSitter();
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
