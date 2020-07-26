import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PriceVariationCreatePage} from '../containers/price-variation-create/price-variation-create.page';

@Injectable()
export class PriceVariationModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PriceVariationCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-price-variation'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
