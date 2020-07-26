import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {CategoryCreatePage} from '../containers/category-create/category-create.page';

@Injectable()
export class CategoryModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: CategoryCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-category-real'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
