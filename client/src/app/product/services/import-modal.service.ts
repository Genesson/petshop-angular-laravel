import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ImportNfePage} from '../containers/import-nfe/import-nfe.page';

@Injectable()
export class ImportModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open() {
        this.modal = await this.modalController.create({
            component: ImportNfePage,
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
