import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ShowerCreatePage} from '../components/shower-create/shower-create.page';

@Injectable()
export class ShowerModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: ShowerCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-shower'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
