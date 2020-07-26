import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PackageCreatePage} from '../components/package-create/package-create.page';

@Injectable()
export class PackageCreateModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(editing, data?) {
        this.modal = await this.modalController.create({
            component: PackageCreatePage,
            componentProps: {isEditing: editing, form: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
