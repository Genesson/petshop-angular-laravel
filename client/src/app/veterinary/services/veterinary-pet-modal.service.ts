import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {VeterinaryPetPage} from '../containers/veterinary-pet/veterinary-pet.page';

@Injectable()
export class VeterinaryPetModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open() {
        this.modal = await this.modalController.create({
            component: VeterinaryPetPage,
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
