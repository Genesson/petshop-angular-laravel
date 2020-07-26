import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ScheduleCreatePage} from '../components/schedule-create/schedule-create.page';

@Injectable()
export class PetScheduleModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(service, data?) {
        this.modal = await this.modalController.create({
            component: ScheduleCreatePage,
            componentProps: {service, form: data},
            cssClass: 'modal-schedule'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
