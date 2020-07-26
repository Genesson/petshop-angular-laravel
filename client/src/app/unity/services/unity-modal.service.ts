import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {UnityCreatePage} from '../containers/unity-create/unity-create.page';

@Injectable()
export class UnityModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: UnityCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
