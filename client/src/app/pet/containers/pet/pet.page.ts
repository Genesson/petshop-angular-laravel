import {Component, OnInit} from '@angular/core';

import {TutorSandbox} from '../../../tutor/tutor.sandbox';
import {PetSandbox} from '../../pet.sandbox';
import { ViaCepSandbox } from '../../../shared/components/via-cep/via-cep.sandbox';

@Component({
    selector: 'app-pet',
    templateUrl: './pet.page.html',
    styleUrls: ['./pet.page.scss'],
})
export class PetPage implements OnInit {

    public petsCollection$ = this.petSandbox.petsCollection$;

    public isLoading$ = this.petSandbox.isLoadingPet$;

    constructor(private tutorSandbox: TutorSandbox,
                private viaCepSandbox: ViaCepSandbox,
                private petSandbox: PetSandbox) {
    }

    ngOnInit() {
        this.petSandbox.loadPets();
    }

    openModalTutor() {
        this.viaCepSandbox.resetViaCep();
        this.petSandbox.resetPets();
        this.tutorSandbox.openModal(false);
    }

    openModalService(pet) {
        this.petSandbox.selectPet(pet);
        this.petSandbox.openModalService(pet);
    }

}
