import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {VeterinaryViewPage} from '../containers/veterinary-view/veterinary-view.page';

@Injectable()
export class VeterinaryViewModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: VeterinaryViewPage,
            componentProps: {consultation: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
