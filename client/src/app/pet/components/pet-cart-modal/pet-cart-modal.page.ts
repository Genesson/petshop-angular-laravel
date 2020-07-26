import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController} from '@ionic/angular';

import {PetSandbox} from '../../pet.sandbox';
import {PackageSandbox} from '../../../package/package.sandbox';

@Component({
    selector: 'app-cart-modal',
    templateUrl: './pet-cart-modal.page.html',
    styleUrls: ['./pet-cart-modal.page.scss'],
})
export class PetCartModalPage implements OnInit {

    constructor(private modalController: ModalController,
                private router: Router,
                private petSandbox: PetSandbox,
                private packageSandbox: PackageSandbox) {
    }

    ngOnInit() {
    }

    public onClickAdd() {
        this.petSandbox.closePetCartModal();
    }

    public onClickCart() {
        this.petSandbox.closePetCartModal();
        this.petSandbox.closeModalSpa();
        this.petSandbox.closeModalService();
        this.packageSandbox.closeModalPackagePetCreate();
        this.packageSandbox.closeModalPackagePet();

        this.closeModals().then(() => {
            this.router.navigate(['main/cart']);
        });
    }

    async closeModals() {
        await this.modalController.dismiss().catch(reason => console.log('reason: ', reason));
    }
}
