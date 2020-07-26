import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {TransportCreatePage} from '../components/transport-create/transport-create.page';

@Injectable()
export class TransportModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: TransportCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-transport'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
