import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetCartModalPage} from '../components/pet-cart-modal/pet-cart-modal.page';

@Injectable()
export class PetCartModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open() {
        this.modal = await this.modalController.create({
            component: PetCartModalPage,
            cssClass: 'modal-pet-cart'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
