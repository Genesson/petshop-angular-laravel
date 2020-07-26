import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import { ProductCategoryCreatePage } from './../containers/product-category-create/product-category-create.page';

@Injectable()
export class ProductCategoryModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
      this.modal = await this.modalController.create({
        component: ProductCategoryCreatePage,
        componentProps: {isEditing: editing, form: data},
        cssClass: 'modal-product-category'
      });
      await this.modal.present();
    }

    close() {
      this.modal.dismiss();
    }

}
