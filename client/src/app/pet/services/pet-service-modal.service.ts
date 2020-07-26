import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetServicePage} from '../containers/pet-service/pet-service.page';

@Injectable()
export class PetServiceModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: PetServicePage,
            componentProps: {pet: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
