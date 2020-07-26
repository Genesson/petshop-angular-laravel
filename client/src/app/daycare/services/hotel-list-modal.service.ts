import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {HotelListPage} from '../containers/hotel-list/hotel-list.page';

@Injectable()
export class HotelListModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open() {
        this.modal = await this.modalController.create({
            component: HotelListPage,
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
