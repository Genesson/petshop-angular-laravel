import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {OtherCreatePage} from '../components/other-create/other-create.page';

@Injectable()
export class OtherModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: OtherCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-other'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
