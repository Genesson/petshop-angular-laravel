import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-header-modal',
    templateUrl: './header-modal.component.html',
    styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {

    @Input() title = 'Modal';

    @Input() isCart = false;

    constructor(private router: Router, private modalController: ModalController) {
    }

    ngOnInit() {
    }

    public onClickCart() {
        this.closeModals().then(() => {
            this.router.navigate(['main/cart']);
        });
    }

    async closeModals() {
        await this.modalController.dismiss().catch(reason => console.log('reason: ', reason));
    }

}
