import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetSpaPage} from '../containers/pet-spa/pet-spa.page';

@Injectable()
export class PetSpaModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data, category) {
        this.modal = await this.modalController.create({
            component: PetSpaPage,
            componentProps: {pet: data, category},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
