import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetProfilePage} from '../containers/pet-profile/pet-profile.page';

@Injectable()
export class PetProfileModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: PetProfilePage,
            componentProps: {pet: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
