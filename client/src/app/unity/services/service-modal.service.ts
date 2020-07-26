import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {ServiceCreatePage} from '../containers/service-create/service-create.page';

@Injectable()
export class ServiceModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: ServiceCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: (editing) ? 'modal-service-editing' : 'modal-service'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
