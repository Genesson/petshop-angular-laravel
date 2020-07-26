import {Component, Input, OnInit} from '@angular/core';

import {PetSandbox} from '../../../pet/pet.sandbox';

import {OrderModel} from '../../../shared/models/order.model';

@Component({
    selector: 'app-cart-pet',
    templateUrl: './cart-pet.page.html',
    styleUrls: ['./cart-pet.page.scss'],
})
export class CartPetPage implements OnInit {

    @Input() order: OrderModel;

    constructor(private petSandbox: PetSandbox) {
    }

    ngOnInit() {
    }

    openModalService() {
        this.petSandbox.selectPet(this.order.pet);
        this.petSandbox.openModalService(this.order.pet);
    }

}
