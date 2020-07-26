import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {DaycareCreatePage} from '../components/daycare-create/daycare-create.page';

@Injectable()
export class DaycareCreateModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(service, data?) {
        this.modal = await this.modalController.create({
            component: DaycareCreatePage,
            componentProps: {service, form: data},
            cssClass: 'modal-daycare-create'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
