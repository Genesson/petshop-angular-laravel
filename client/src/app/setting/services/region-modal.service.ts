import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {RegionCreatePage} from '../containers/region-create/region-create.page';

@Injectable()
export class RegionModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: RegionCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-region'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
