import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {CashierModalPage} from '../containers/cashier-modal/cashier-modal.page';

@Injectable()
export class CashierModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(action, operation, data) {
        this.modal = await this.modalController.create({
            component: CashierModalPage,
            componentProps: {action, operation, data},
            cssClass: 'modal-cashier'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
