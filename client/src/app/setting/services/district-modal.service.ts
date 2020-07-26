import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {DistrictCreatePage} from '../containers/district-create/district-create.page';

@Injectable()
export class DistrictModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: DistrictCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-district'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
