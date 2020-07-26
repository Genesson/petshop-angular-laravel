import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetVaccineCreatePage} from '../components/pet-vaccine-create/pet-vaccine-create.page';

@Injectable()
export class PetVaccineModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PetVaccineCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-vaccine'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
