import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ProductCreatePage} from '../containers/product-create/product-create.page';

@Injectable()
export class ProductModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: ProductCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
