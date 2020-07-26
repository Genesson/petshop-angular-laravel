import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {DayCareCreatePage} from '../components/day-care-create/day-care-create.page';

@Injectable()
export class DayCareModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: DayCareCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-day-care'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
