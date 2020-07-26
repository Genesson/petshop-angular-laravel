import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ReportSandbox} from '../../report.sandbox';

@Component({
    selector: 'app-dre-create',
    templateUrl: './dre-create.page.html',
    styleUrls: ['./dre-create.page.scss'],
})
export class DreCreatePage implements OnInit {
    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.reportSandbox.isLoadingDre$;

    public formGroup: FormGroup;

    public validationMessages = {
        value: [{type: 'required', message: 'Informe o Valor.'}],
    };

    constructor(
        private formBuilder: FormBuilder,
        private reportSandbox: ReportSandbox
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            module: [null, [Validators.required]],
            value: ['', [Validators.required]],
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
            this.isEditing
                ? this.reportSandbox.updateDre(this.formGroup.value)
                : this.reportSandbox.createDre(this.formGroup.value);
        }
    }

    public onClickCancel() {
        this.reportSandbox.closeModal();
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
