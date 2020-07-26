import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SettingSandbox} from '../../setting.sandbox';

@Component({
    selector: 'app-room-create',
    templateUrl: './room-create.page.html',
    styleUrls: ['./room-create.page.scss'],
})
export class RoomCreatePage implements OnInit {

    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.settingSandbox.isLoadingRoom$;

    public formGroup: FormGroup;

    public validationMessages = {
        description: [
            {type: 'required', message: 'Informe a Descrição.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'}
        ],
        number: [
            {type: 'required', message: 'Informe o Número do Quarto.'},
            {type: 'minlength', message: 'Mínimo 1.'},
            {type: 'maxlength', message: 'Máximo 100.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private settingSandbox: SettingSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            unity: [null],
            description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            number: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
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
            this.isEditing ?
                this.settingSandbox.updateRoom(this.formGroup.value) : this.settingSandbox.createRoom(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.settingSandbox.closeModalRoom();
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
