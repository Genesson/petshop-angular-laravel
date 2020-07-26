import {Injectable} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {PetEvaluationInfoPage} from '../containers/pet-evaluation-info/pet-evaluation-info.page';

@Injectable()
export class PetEvaluationInfoModalService {

    private modal;

    constructor(private modalController: ModalController) {
    }

    async open(data) {
        this.modal = await this.modalController.create({
            component: PetEvaluationInfoPage,
            componentProps: {evaluation: data},
            cssClass: 'modal-full'
        });
        await this.modal.present();
    }

    close() {
        this.modal.dismiss();
    }

}
