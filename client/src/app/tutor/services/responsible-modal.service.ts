import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ResponsibleCreatePage} from '../containers/responsible-create/responsible-create.page';

@Injectable()
export class ResponsibleModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: ResponsibleCreatePage,
            componentProps: {form: data.payload},
            cssClass: 'modal-responsible'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
