import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ProductViewPage} from '../containers/product-view/product-view.page';

@Injectable()
export class ProductViewModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: ProductViewPage,
            componentProps: {product: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
