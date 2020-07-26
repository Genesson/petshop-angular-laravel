import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {TutorViewPage} from '../containers/tutor-view/tutor-view.page';

@Injectable()
export class TutorViewModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: TutorViewPage,
            componentProps: {tutor: data.payload},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
