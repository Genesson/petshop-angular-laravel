import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {CashierReceivePage} from '../containers/cashier-receive/cashier-receive.page';
import {CashierReceiveViewPage} from '../containers/cashier-receive-view/cashier-receive-view.page';

@Injectable()
export class ReceiveModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data?) {
        this.modal = await this.modalController.create({
            component: CashierReceivePage,
            componentProps: {data},
            cssClass: 'modal-receive'
        });
        await this.modal.present();
    }

    async openView(data?) {
        this.modal = await this.modalController.create({
            component: CashierReceiveViewPage,
            componentProps: {data},
            cssClass: 'modal-receive-view'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }
}
