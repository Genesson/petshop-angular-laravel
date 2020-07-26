import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetEvaluationPage} from '../containers/pet-evaluation/pet-evaluation.page';

@Injectable()
export class PetEvaluationModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: PetEvaluationPage,
            componentProps: {pet: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
