import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';

import {AlertController} from '@ionic/angular';

import {Subscription} from 'rxjs';

import {UnitySandbox} from '../../unity.sandbox';
import {ProvinceSandbox} from '../../../shared/mokups/province/province.sandbox';
import {CitySandbox} from '../../../shared/mokups/city/city.sandbox';
import {ViaCepSandbox} from '../../../shared/components/via-cep/via-cep.sandbox';

import {GenericValidator} from '../../../shared/validators/generic-validator';

@Component({
    selector: 'app-unity-create',
    templateUrl: './unity-create.page.html',
    styleUrls: ['./unity-create.page.scss'],
    animations: [
        trigger('enterAnimation', [
            transition(':enter', [
                style({transform: 'translateX(100%)', opacity: 0}),
                animate(
                    '500ms',
                    style({transform: 'translateX(0)', opacity: 1})
                ),
            ]),
            transition(':leave', [
                style({transform: 'translateX(0)', opacity: 1}),
                animate(
                    '500ms',
                    style({transform: 'translateX(100%)', opacity: 0})
                ),
            ]),
        ]),
    ],
})
export class UnityCreatePage implements OnInit, OnDestroy {
    @Input() form;

    @Input() isEditing;

    public isLoading$ = this.unitySandbox.isLoading$;

    public provincesCollection$ = this.provinceSandbox.provincesCollection$;

    public citiesCollection$ = this.citySandbox.citiesCollection$;

    public isLoadingCities$ = this.citySandbox.isLoading$;

    public categoriesCollection$ = this.unitySandbox.categoriesCollection$;

    public servicesCollection$ = this.unitySandbox.servicesCollection$;

    public subServicesCollection$ = this.unitySandbox.subServicesCollection$;

    public showersCollection$ = this.unitySandbox.showersCollection$;

    public subShowersCollection$ = this.unitySandbox.subShowersCollection$;

    public transportsCollection$ = this.unitySandbox.transportsCollection$;

    public petSittersCollection$ = this.unitySandbox.petSittersCollection$;

    public dayCaresCollection$ = this.unitySandbox.dayCaresCollection$;

    public hotelsCollection$ = this.unitySandbox.hotelsCollection$;

    public othersCollection$ = this.unitySandbox.othersCollection$;

    public isLoadingImageUnity$ = this.unitySandbox.isLoadingImageUnity$;

    public imageUnity$ = this.unitySandbox.imageUnity$;

    public viaCepSelected$ = this.viaCepSandbox.viaCepSelected$;

    public formGroup: FormGroup;

    public color = '#f4f4f4';

    public showHours = false;

    private subscriptions = new Subscription();

    private citySubscription = new Subscription();

    public validationMessages = {
        razao_social: [
            {type: 'required', message: 'Informe a Razão Social.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 200 caracteres.'},
        ],
        fantasy: [
            {type: 'required', message: 'Informe o Nome Fantasia.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 150 caracteres.'},
        ],
        email: [
            {type: 'required', message: 'Informe o E-mail.'},
            {type: 'email', message: 'Informe um E-mail válido.'},
        ],
        cnpj: [
            {type: 'minlength', message: 'Mínimo 18 caracteres.'},
            {type: 'maxlength', message: 'Máximo 18 caracteres.'},
            {type: 'cnpjNotValid', message: 'O cnpj não é válido.'},
        ],
        ie: [
            {type: 'required', message: 'Informe a Inscrição Estadual.'},
            {type: 'minlength', message: 'Mínimo 5 caracteres.'},
            {type: 'maxlength', message: 'Máximo 20 caracteres.'},
        ],
        color: [{type: 'required', message: 'Selecione a Cor.'}],
        nfe: [{type: 'required', message: 'Selecione o Ambiente da NFe.'}],
        zipcode: [
            {type: 'required', message: 'Informe o CEP.'},
            {type: 'minlength', message: 'Mínimo 9 caracteres.'},
            {type: 'maxlength', message: 'Máximo 9 caracteres.'},
        ],
        street: [
            {type: 'required', message: 'Informe o Rua.'},
            {type: 'minlength', message: 'Mínimo 4 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'},
        ],
        number: [
            {type: 'required', message: 'Informe o Número.'},
            {type: 'minlength', message: 'Mínimo 1 caracteres.'},
            {type: 'maxlength', message: 'Máximo 10 caracteres.'},
        ],
        district: [
            {type: 'required', message: 'Informe o Bairro.'},
            {type: 'minlength', message: 'Mínimo 2 caracteres.'},
            {type: 'maxlength', message: 'Máximo 100 caracteres.'},
        ],
        country: [{type: 'required', message: 'Informe o País.'}],
        province: [{type: 'required', message: 'Informe o Estado.'}],
        city: [{type: 'required', message: 'Informe a Cidade.'}],
    };

    constructor(
        private formBuilder: FormBuilder,
        private unitySandbox: UnitySandbox,
        private provinceSandbox: ProvinceSandbox,
        private citySandbox: CitySandbox,
        private alertController: AlertController,
        private viaCepSandbox: ViaCepSandbox
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            razao_social: [
                '',
                [Validators.minLength(2), Validators.maxLength(200)],
            ],
            fantasy: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(150),
                ],
            ],
            email: ['', [Validators.required, Validators.email]],
            cnpj: [
                '',
                [
                    Validators.minLength(18),
                    Validators.maxLength(18),
                    GenericValidator.isValidCnpj(),
                ],
            ],
            ie: ['', [Validators.minLength(5), Validators.maxLength(20)]],
            color: ['', [Validators.required]],
            nfe: [null, [Validators.required]],
            logo: [null],
            zipcode: [
                '',
                [
                    Validators.required,
                    Validators.minLength(9),
                    Validators.maxLength(9),
                ],
            ],
            street: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(100),
                ],
            ],
            number: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(10),
                ],
            ],
            district: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(100),
                ],
            ],
            country: [null, [Validators.required]],
            province: [null, [Validators.required]],
            city: [null, [Validators.required]],
            sunday: [false],
            monday: [true],
            tuesday: [true],
            wednesday: [true],
            thursday: [true],
            friday: [true],
            saturday: [false],
            hour_sunday_in: [''],
            hour_sunday_interval_in: [''],
            hour_sunday_interval_out: [''],
            hour_sunday_out: [''],
            hour_monday_in: [''],
            hour_monday_interval_in: [''],
            hour_monday_interval_out: [''],
            hour_monday_out: [''],
            hour_tuesday_in: [''],
            hour_tuesday_interval_in: [''],
            hour_tuesday_interval_out: [''],
            hour_tuesday_out: [''],
            hour_wednesday_in: [''],
            hour_wednesday_interval_in: [''],
            hour_wednesday_interval_out: [''],
            hour_wednesday_out: [''],
            hour_thursday_in: [''],
            hour_thursday_interval_in: [''],
            hour_thursday_interval_out: [''],
            hour_thursday_out: [''],
            hour_friday_in: [''],
            hour_friday_interval_in: [''],
            hour_friday_interval_out: [''],
            hour_friday_out: [''],
            hour_saturday_in: [''],
            hour_saturday_interval_in: [''],
            hour_saturday_interval_out: [''],
            hour_saturday_out: [''],
            status: ['ACTIVE'],
            categories: [null],
            services: [null],
        });
    }

    ngOnInit() {
        this.subscriptions.add(
            this.imageUnity$.subscribe((image) => {
                if (image) {
                    this.formGroup.get('logo').patchValue(image);
                }
            })
        );

        this.subscriptions.add(
            this.categoriesCollection$.subscribe((category) => {
                this.formGroup.get('categories').patchValue(category);
            })
        );

        this.subscriptions.add(
            this.servicesCollection$.subscribe((service) => {
                this.formGroup.get('services').patchValue(service);
            })
        );

        this.subscriptions.add(
            this.viaCepSelected$.subscribe((cep) => {
                if (cep) {
                    this.citySandbox.loadCities(cep.province);
                    this.formGroup.get('street').patchValue(cep.logradouro);
                    this.formGroup.get('district').patchValue(cep.bairro);
                    this.formGroup.get('country').patchValue(1);
                    this.formGroup.get('province').patchValue(cep.province);
                    setTimeout(() => {
                        this.formGroup.get('city').patchValue(cep.city);
                    }, 1000);
                }
            })
        );

        this.provinceSandbox.loadProvinces().finally(() => this.loadCities());
        if (this.isEditing) {
            this.unitySandbox.loadCategoriesUnity();
            this.unitySandbox.loadServicesUnity();
            this.unitySandbox.loadSubServicesUnity();
            this.unitySandbox.loadShowersUnity();
            this.unitySandbox.loadSubShowersUnity();
            this.unitySandbox.loadTransportsUnity();
            this.unitySandbox.loadPetSittersUnity();
            this.unitySandbox.loadDayCaresUnity();
            this.unitySandbox.loadHotelsUnity();
            this.unitySandbox.loadOthersUnity();
        }
    }

    private loadCities() {
        if (this.isProvince()) {
            this.citySandbox
                .loadCities(this.form.province)
                .finally(() => this.isLoadedCities());
        }
    }

    private isLoadedCities() {
        this.citySubscription.add(
            this.isLoadingCities$.subscribe((value) => {
                if (!value) {
                    this.pathForm();
                    this.citySubscription.unsubscribe();
                }
            })
        );
    }

    private pathForm() {
        if (this.form) {
            this.formGroup.patchValue(this.form);
        }
    }

    private isProvince() {
        return this.form && this.form.province;
    }

    public changeProvince($event) {
        if ($event.detail.value !== '') {
            this.citySandbox.loadCities($event.detail.value);
        }
    }

    public changeCep() {
        const cep = this.formGroup.get('zipcode').value;
        if (cep !== '') {
            this.viaCepSandbox.loadViaCep(cep);
        }
    }

    public onFileUpload(event) {
        const formData = new FormData();
        const file = (event.target as HTMLInputElement).files[0];
        formData.append('image', file);
        this.unitySandbox.uploadImageUnity(formData);
    }

    public onClickCancel() {
        this.unitySandbox.closeModal();
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.isEditing
                ? this.unitySandbox.updateUnity(this.formGroup.value)
                : this.unitySandbox.createUnity(this.formGroup.value);
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

    async presentModalCategory() {
        this.unitySandbox.openModalCategory(false);
    }

    public selectCategory(category) {
        this.unitySandbox.selectCategory(category);
        this.unitySandbox.openModalCategory(true, category);
    }

    async confirmCategory(category) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir a categoria: <strong>${category.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    },
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deleteCategory(category);
                    },
                },
            ],
        });
        await alert.present();
    }

    public statusCategory(category) {
        this.unitySandbox.updateCategory({
            ...category,
            status: category.status == 1 ? 0 : 1,
        });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
