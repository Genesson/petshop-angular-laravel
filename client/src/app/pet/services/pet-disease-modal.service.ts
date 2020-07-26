import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetDiseaseCreatePage} from '../components/pet-disease-create/pet-disease-create.page';

@Injectable()
export class PetDiseaseModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PetDiseaseCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-disease'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
