import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {CardPaymentPage} from '../containers/card-payment/card-payment.page';

@Injectable()
export class CardPaymentModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: CardPaymentPage,
            componentProps: {data},
            cssClass: 'modal-card-receive'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
