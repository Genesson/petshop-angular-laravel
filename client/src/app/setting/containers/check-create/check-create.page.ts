import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SettingSandbox} from '../../setting.sandbox';

@Component({
    selector: 'app-check-create',
    templateUrl: './check-create.page.html',
    styleUrls: ['./check-create.page.scss'],
})
export class CheckCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.settingSandbox.isLoadingCheck$;

    public formGroup: FormGroup;

    public validationMessages = {
        type: [
            {type: 'required', message: 'Informe o Tipo.'}
        ],
        hour: [
            {type: 'required', message: 'Informe o Horário.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private settingSandbox: SettingSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null],
            type: [null, [Validators.required]],
            hour: ['', [Validators.required]],
            sunday: [false],
            monday: [false],
            tuesday: [false],
            wednesday: [false],
            thursday: [false],
            friday: [false],
            saturday: [false],
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
            this.isEditing ? this.settingSandbox.updateCheck(this.formGroup.value) : this.settingSandbox.createCheck(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.settingSandbox.closeModalCheck();
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
