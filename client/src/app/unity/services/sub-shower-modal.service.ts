import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {SubShowerCreatePage} from '../components/sub-shower-create/sub-shower-create.page';

@Injectable()
export class SubShowerModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: SubShowerCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-shy'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
