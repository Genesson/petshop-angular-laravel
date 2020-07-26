import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import {Subscription} from 'rxjs';

import {UserModel} from '../../../shared/models/user.model';

import {UserSandbox} from '../../../user/user.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.page.html',
    styleUrls: ['./user-create.page.scss'],
})
export class UserCreatePage implements OnInit, OnDestroy {

  @Input() form: UserModel;

  @Input() isEditing;

  public isLoadingUser$ = this.userSandbox.isLoadingUser$;

  public isLoadingImageUser$ = this.userSandbox.isLoadingImageUser$;

  public imageUser$ = this.userSandbox.imageUser$;

  public unitsCollection$ = this.unitySandbox.unitsCollection$;

  public permissionsCollection$ = this.userSandbox.permissionsCollection$;

  public formGroup: FormGroup;

  public units: FormArray;

  private subscriptions = new Subscription();

  public validationMessages = {
    name: [
      {type: 'required', message: 'Informe o Nome.'},
      {type: 'minlength', message: 'Mínimo 4 caracteres.'},
      {type: 'maxlength', message: 'Máximo 100 caracteres.'}
    ],
    password: [
      {type: 'required', message: 'Informe a Senha.'},
      {type: 'minlength', message: 'Mínimo 4 caracteres.'},
      {type: 'maxlength', message: 'Máximo 14 caracteres.'}
    ],
    re_password: [
      {type: 'required', message: 'Informe a Confirmação da Senha.'},
      {type: 'minlength', message: 'Mínimo 4 caracteres.'},
      {type: 'maxlength', message: 'Máximo 14 caracteres.'}
    ],
    email: [
      {type: 'required', message: 'Informe o E-mail.'},
      {type: 'email', message: 'Informe um E-mail válido.'}
    ],
    units: [{type: 'required', message: 'Informe pelo menos uma Loja.'}],
    role: [{type: 'required', message: 'Informe o Setor.'}]
  };

  constructor(
    private formBuilder: FormBuilder,
    private userSandbox: UserSandbox,
    private unitySandbox: UnitySandbox
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      avatar: [null],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(14)]],
      re_password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(14)]],
      email: ['', [Validators.required, Validators.email]],
      units: this.formBuilder.array([this.createItem()]),
      role: [null, [Validators.required]],
      status: ['ACTIVE']
    });
  }

  ngOnInit() {
    this.unitySandbox.loadUnits();

    this.subscriptions.add(
      this.imageUser$.subscribe((image) => {
        if (image) {
          this.formGroup.get('avatar').patchValue(image);
        }
      })
    );

    if (this.isEditing) {
      this.formGroup.get('password').clearValidators();
      this.formGroup.get('re_password').clearValidators();
      this.formGroup.get('password').setValidators([Validators.minLength(4), Validators.maxLength(14)]);
      this.formGroup.get('re_password').setValidators([Validators.minLength(4), Validators.maxLength(14)]);
    }

    if (this.form) {
      setTimeout(() => {
        this.formGroup.patchValue(this.form);
      }, 500);

      const formArray = this.formGroup.get('units') as FormArray;
      this.form.units.forEach((unity, index) => {
        if (index > 0) {
          const formGroup = this.createItem();
          formGroup.patchValue(unity);
          formArray.push(formGroup);
        }
      });
    }
  }

  get formData() {
    return this.formGroup.get('units') as FormArray;
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      unity: ['', [Validators.required]],
      permission: ['', [Validators.required]]
    });
  }

  public addItem(): void {
    this.units = this.formGroup.get('units') as FormArray;
    this.units.push(this.createItem());
  }

  public removeItem(index) {
    this.units = this.formGroup.get('units') as FormArray;
    this.units.removeAt(index);
  }

  public onFileUpload(event) {
    const formData = new FormData();
    const file = (event.target as HTMLInputElement).files[0];
    formData.append('image', file);
    this.userSandbox.uploadImageUser(formData);
  }

  public onClickCancel() {
    this.userSandbox.closeModal();
  }

  public onClickConfirm() {
    if (!this.formGroup.valid) {
      this.validateAllFormFields(this.formGroup);
    } else {
      this.isEditing
        ? this.userSandbox.updateUser(this.formGroup.value)
        : this.userSandbox.createUser(this.formGroup.value);
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
