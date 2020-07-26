import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {SizeCreatePage} from '../containers/size-create/size-create.page';

@Injectable()
export class SizeModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: SizeCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-size'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
