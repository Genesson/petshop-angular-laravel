import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PackagePetPage} from '../components/package-pet/package-pet.page';

@Injectable()
export class PackagePetModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open() {
        this.modal = await this.modalController.create({
            component: PackagePetPage,
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
