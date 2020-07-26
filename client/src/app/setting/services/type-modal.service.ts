import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {TypeCreatePage} from '../containers/type-create/type-create.page';

@Injectable()
export class TypeModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: TypeCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-type'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
