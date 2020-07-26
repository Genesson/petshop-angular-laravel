import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetCreatePage} from '../containers/pet-create/pet-create.page';

@Injectable()
export class PetModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PetCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
