import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetMedicineCreatePage} from '../components/pet-medicine-create/pet-medicine-create.page';

@Injectable()
export class PetMedicineModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PetMedicineCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-medicine'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
