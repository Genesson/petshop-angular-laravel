import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {AlertController} from '@ionic/angular';

import {PetSandbox} from '../../pet.sandbox';
import {ScheduleSandbox} from '../../../schedule/schedule.sandbox';
import {UserSandbox} from '../../../user/user.sandbox';

import {PetModel} from '../../../shared/models/pet.model';
import {SettingSandbox} from '../../../setting/setting.sandbox';

@Component({
    selector: 'app-pet-sitter',
    templateUrl: './pet-sitter.page.html',
    styleUrls: ['./pet-sitter.page.scss'],
})
export class PetSitterPage implements OnInit {

    @Input() pet: PetModel;

    public usersCollection$ = this.userSandbox.usersCollection$;

    public serviceSitter = this.settingSandbox.serviceSitter;

    public formGroup: FormGroup;

    public validationMessages = {
        user: [
            {type: 'required', message: 'Informe o Responsável.'}
        ],
        date: [
            {type: 'required', message: 'Informe a Data.'}
        ]
    };

    constructor(private formBuilder: FormBuilder,
                private petSandbox: PetSandbox,
                private userSandbox: UserSandbox,
                private scheduleSandbox: ScheduleSandbox,
                private settingSandbox: SettingSandbox,
                private alertController: AlertController) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            service: [null],
            user: [null, [Validators.required]],
            taxi: ['NAO', [Validators.required]],
            date: ['', [Validators.required]],
            pet: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.userSandbox.loadUsers();

        if (this.pet) {
            this.formGroup.get('service').patchValue(this.serviceSitter.id);
            this.formGroup.get('pet').patchValue(this.pet);
        }
    }

    async confirmPet(pet) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o pet: <strong>${pet.name}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.pet = null;
                    }
                }
            ]
        });
        await alert.present();
    }

    public onClickCancel() {
        this.petSandbox.closeModalPetSitter();
    }

    public onClickConfirm() {
        if (!this.formGroup.valid) {
            this.validateAllFormFields(this.formGroup);
        } else {
            this.scheduleSandbox.createSchedule(this.formGroup.value);
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
