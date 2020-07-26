import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {PetModel} from '../../../shared/models/pet.model';

@Component({
    selector: 'app-pet-cart',
    templateUrl: './pet-cart.page.html',
    styleUrls: ['./pet-cart.page.scss'],
})
export class PetCartPage implements OnInit {

    @Input() pet: PetModel;

    @Output() clickCard = new EventEmitter();

    constructor() {
    }

    ngOnInit() {

    }

}
