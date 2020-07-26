import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {HotelCreatePage} from '../components/hotel-create/hotel-create.page';

@Injectable()
export class HotelModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: HotelCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-hotel'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
