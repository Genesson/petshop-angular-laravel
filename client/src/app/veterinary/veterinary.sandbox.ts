import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {ConsultationSelectors} from './state/consultation/consultation.selectors';

import {
    CreateConsultation,
    DeleteConsultation,
    LoadConsultations,
    LoadConsultationsPet,
    SelectConsultation,
    UpdateConsultation
} from './state/consultation/consultation.actions';
import {
    OpenVeterinaryCreateModal,
    CloseVeterinaryCreateModal
} from './state/veterinary-create-modal/veterinary-create-modal.actions';
import {
    OpenVeterinaryViewModal,
    CloseVeterinaryViewModal
} from './state/veterinary-view-modal/veterinary-view-modal.actions';
import {
    OpenVeterinaryPetModal,
    CloseVeterinaryPetModal
} from './state/veterinary-pet-modal/veterinary-pet-modal.actions';

import {ConsultationModel} from '../shared/models/consultation.model';
import {PetModel} from '../shared/models/pet.model';

@Injectable({
    providedIn: 'root'
})
export class VeterinarySandbox {

    @Select(ConsultationSelectors.entities) consultationsCollection$: Observable<ConsultationModel[]>;

    @Select(ConsultationSelectors.selected) consultationSelected$: Observable<ConsultationModel>;

    @Select(ConsultationSelectors.isLoading) isLoadingConsultation$: Observable<boolean>;

    constructor(private store: Store) {
    }

    public selectConsultation(consultation: ConsultationModel) {
        this.store.dispatch(new SelectConsultation(consultation));
    }

    public loadConsultations() {
        this.store.dispatch(new LoadConsultations());
    }

    public loadConsultationsPet(pet: PetModel) {
        this.store.dispatch(new LoadConsultationsPet(pet));
    }

    public createConsultation(consultation: ConsultationModel) {
        this.store.dispatch(new CreateConsultation(consultation));
    }

    public updateConsultation(consultation: ConsultationModel) {
        this.store.dispatch(new UpdateConsultation(consultation));
    }

    public deleteConsultation(consultation: ConsultationModel) {
        this.store.dispatch(new DeleteConsultation(consultation));
    }

    public openModalVeterinaryCreate(pet) {
        this.store.dispatch(new OpenVeterinaryCreateModal(pet));
    }

    public closeModalVeterinaryCreate() {
        this.store.dispatch(new CloseVeterinaryCreateModal());
    }

    public openModalVeterinaryView(consultation: ConsultationModel) {
        this.store.dispatch(new OpenVeterinaryViewModal(consultation));
    }

    public closeModalVeterinaryView() {
        this.store.dispatch(new CloseVeterinaryViewModal());
    }

    public openModalVeterinaryPet() {
        this.store.dispatch(new OpenVeterinaryPetModal());
    }

    public closeModalVeterinaryPet() {
        this.store.dispatch(new CloseVeterinaryPetModal());
    }
}
