import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {BehaviorCreatePage} from '../containers/behavior-create/behavior-create.page';

@Injectable()
export class BehaviorModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: BehaviorCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-behavior'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
