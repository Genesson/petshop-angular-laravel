import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetSitterCreatePage} from '../components/pet-sitter-create/pet-sitter-create.page';

@Injectable()
export class PetSitterModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PetSitterCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-pet-sitter'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
