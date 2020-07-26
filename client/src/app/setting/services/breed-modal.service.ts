import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {BreedCreatePage} from '../containers/breed-create/breed-create.page';

@Injectable()
export class BreedModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: BreedCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-breed'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
