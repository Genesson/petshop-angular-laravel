import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PackagePetCreatePage} from '../components/package-pet-create/package-pet-create.page';

@Injectable()
export class PackagePetCreateModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PackagePetCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
