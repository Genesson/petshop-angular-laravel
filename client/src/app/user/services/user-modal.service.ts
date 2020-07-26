import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {UserCreatePage} from '../containers/user-create/user-create.page';

@Injectable()
export class UserModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: UserCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
