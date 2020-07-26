import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ExceptionDateCreatePage} from '../containers/exception-date-create/exception-date-create.page';

@Injectable()
export class ExceptionDateModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: ExceptionDateCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-exception-date'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
