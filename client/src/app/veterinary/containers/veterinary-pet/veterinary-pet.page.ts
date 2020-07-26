import {Component, OnInit} from '@angular/core';

import {VeterinarySandbox} from '../../veterinary.sandbox';
import {PetSandbox} from '../../../pet/pet.sandbox';

@Component({
    selector: 'app-veterinary-pet',
    templateUrl: './veterinary-pet.page.html',
    styleUrls: ['./veterinary-pet.page.scss'],
})
export class VeterinaryPetPage implements OnInit {

    public petsCollection$ = this.petSandbox.petsCollection$;

    constructor(private veterinarySandbox: VeterinarySandbox,
                private petSandbox: PetSandbox) {
    }

    ngOnInit() {
        this.petSandbox.loadPets();
    }

    openModalVeterinaryCreate(pet) {
        this.veterinarySandbox.openModalVeterinaryCreate(pet);
    }

}
