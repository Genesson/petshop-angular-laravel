import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {DreCreatePage} from '../components/dre-create/dre-create.page';

@Injectable()
export class DreModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: DreCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-dre'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
