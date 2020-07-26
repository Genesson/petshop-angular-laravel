import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ScheduleListPage} from '../containers/schedule-list/schedule-list.page';

@Injectable()
export class ScheduleListModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open() {
        this.modal = await this.modalController.create({
            component: ScheduleListPage,
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
