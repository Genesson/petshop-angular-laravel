import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PermissionCreatePage} from '../containers/permission-create/permission-create.page';

@Injectable()
export class PermissionModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PermissionCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
