import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {RoomCreatePage} from '../containers/room-create/room-create.page';

@Injectable()
export class RoomModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: RoomCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-room'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
