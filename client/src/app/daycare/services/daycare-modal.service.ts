import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {DaycarePage} from '../containers/daycare/daycare.page';
import {DaycareCheckPage} from '../containers/daycare-check/daycare-check.page';
import {DaycareClassPage} from '../containers/daycare-class/daycare-class.page';

@Injectable()
export class DaycareModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async openDaycare() {
        this.modal = await this.modalController.create({
            component: DaycarePage,
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    closeDaycare() {
        this.modal.dismiss();
    }

    async openDaycareCheck() {
        this.modal = await this.modalController.create({
            component: DaycareCheckPage,
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    closeDaycareCheck() {
        this.modal.dismiss();
    }

    async openDaycareClass() {
        this.modal = await this.modalController.create({
            component: DaycareClassPage,
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    closeDaycareClass() {
        this.modal.dismiss();
    }

}
