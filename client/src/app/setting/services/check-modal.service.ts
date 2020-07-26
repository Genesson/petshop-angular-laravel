import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {CheckCreatePage} from '../containers/check-create/check-create.page';

@Injectable()
export class CheckModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: CheckCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-check'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
