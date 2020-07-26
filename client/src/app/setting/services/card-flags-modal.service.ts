import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {CardFlagsCreatePage} from '../containers/card-flags-create/card-flags-create.page';

@Injectable()
export class CardFlagsModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: CardFlagsCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-card-flags'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
