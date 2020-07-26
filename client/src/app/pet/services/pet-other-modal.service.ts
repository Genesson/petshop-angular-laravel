import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetOthersPage} from '../containers/pet-others/pet-others.page';

@Injectable()
export class PetOtherModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data, category) {
        this.modal = await this.modalController.create({
            component: PetOthersPage,
            componentProps: {pet: data, category},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
