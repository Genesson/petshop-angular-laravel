import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import { ProductProviderCreatePage } from './../containers/product-provider-create/product-provider-create.page';

@Injectable()
export class ProductProviderModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
      this.modal = await this.modalController.create({
        component: ProductProviderCreatePage,
        componentProps: {isEditing: editing, form: data},
        cssClass: 'modal-product-provider'
      });
      await this.modal.present();
    }

    close() {
      this.modal.dismiss();
    }

}
