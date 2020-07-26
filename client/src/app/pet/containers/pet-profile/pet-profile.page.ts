import {Component, Input, OnInit} from '@angular/core';

import {PetSandbox} from '../../pet.sandbox';

import {PetModel} from '../../../shared/models/pet.model';
import {TutorSandbox} from '../../../tutor/tutor.sandbox';

@Component({
    selector: 'app-pet-profile',
    templateUrl: './pet-profile.page.html',
    styleUrls: ['./pet-profile.page.scss'],
})
export class PetProfilePage implements OnInit {

    @Input() pet: PetModel;

    public evaluationsCollection$ = this.petSandbox.evaluationsCollection$;

    constructor(private petSandbox: PetSandbox,
                private tutorSandbox: TutorSandbox) {
    }

    ngOnInit() {
    }

    openPetEvaluation(pet) {
        this.petSandbox.openModalEvaluation(pet);
    }

    openPetEvaluationInfo(evaluation) {
        this.petSandbox.openModalEvaluationInfo(evaluation);
    }

    openViewTutor(tutor) {
        this.tutorSandbox.openTutorViewModal(tutor);
    }
}
