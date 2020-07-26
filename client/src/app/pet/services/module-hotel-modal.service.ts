import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ModuleHotelPage} from '../containers/module-hotel/module-hotel.page';

@Injectable()
export class ModuleHotelModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: ModuleHotelPage,
            componentProps: {pet: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
