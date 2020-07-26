import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {TypeFurCreatePage} from '../containers/type-fur-create/type-fur-create.page';

@Injectable()
export class TypeFurModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: TypeFurCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-type-fur'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
