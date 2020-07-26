import {Component, OnInit} from '@angular/core';

import {PackageSandbox} from '../../package.sandbox';
import {PetSandbox} from '../../../pet/pet.sandbox';

@Component({
    selector: 'app-package-pet',
    templateUrl: './package-pet.page.html',
    styleUrls: ['./package-pet.page.scss'],
})
export class PackagePetPage implements OnInit {

    public petsCollection$ = this.petSandbox.petsCollection$;

    constructor(private packageSandbox: PackageSandbox,
                private petSandbox: PetSandbox) {
    }

    ngOnInit() {
        this.petSandbox.loadPets();
    }

    openModalPackagePetCreate(pet) {
        this.packageSandbox.openModalPackagePetCreate(false, pet);
    }

}
