import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectConsultation,
    LoadConsultations,
    LoadConsultationsSuccess,
    LoadConsultationsFail,
    CreateConsultation,
    CreateConsultationSuccess,
    CreateConsultationFail,
    UpdateConsultation,
    UpdateConsultationSuccess,
    UpdateConsultationFail,
    DeleteConsultation,
    DeleteConsultationSuccess,
    DeleteConsultationFail, LoadConsultationsPet, LoadConsultationsPetSuccess, LoadConsultationsPetFail
} from './consultation.actions';
import {CloseVeterinaryCreateModal} from '../veterinary-create-modal/veterinary-create-modal.actions';
import {CloseVeterinaryPetModal} from '../veterinary-pet-modal/veterinary-pet-modal.actions';

import {ConsultationModel} from '../../../shared/models/consultation.model';

import {ConsultationResource} from '../../../shared/resources/consultation.resource';

export class ConsultationStateModel extends NgxsEntityStateStateModel<ConsultationModel> {
    isLoading: boolean;
}

@State<ConsultationStateModel>({
    name: 'consultation',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class ConsultationState {

    @Selector()
    static selected(state: ConsultationStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: ConsultationStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: ConsultationStateModel) {
        return state.entities;
    }

    constructor(private consultationResource: ConsultationResource,
                private toastController: ToastController) {
    }

    @Action(SelectConsultation)
    selectPaciente(ctx: StateContext<ConsultationStateModel>, {payload}: SelectConsultation) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadConsultations)
    loadConsultations(ctx: StateContext<ConsultationStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.consultationResource.find().pipe(
            map((Consultation: ConsultationModel[]) => ctx.dispatch(new LoadConsultationsSuccess(Consultation))),
            catchError((error) => ctx.dispatch(new LoadConsultationsFail(error)))
        );
    }

    @Action(LoadConsultationsSuccess)
    loadConsultationsSuccess(ctx: StateContext<ConsultationStateModel>, {payload}: LoadConsultationsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadConsultationsFail)
    loadConsultationsFail(ctx: StateContext<ConsultationStateModel>, {payload}: LoadConsultationsFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadConsultationsPet)
    loadConsultationsPet(ctx: StateContext<ConsultationStateModel>, {payload}: LoadConsultationsPet) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.consultationResource.findPet(payload).pipe(
            map((Consultation: ConsultationModel[]) => ctx.dispatch(new LoadConsultationsPetSuccess(Consultation))),
            catchError((error) => ctx.dispatch(new LoadConsultationsPetFail(error)))
        );
    }

    @Action(LoadConsultationsPetSuccess)
    loadConsultationsPetSuccess(ctx: StateContext<ConsultationStateModel>, {payload}: LoadConsultationsPetSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadConsultationsPetFail)
    loadConsultationsPetFail(ctx: StateContext<ConsultationStateModel>, {payload}: LoadConsultationsPetFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateConsultation)
    createConsultation(ctx: StateContext<ConsultationStateModel>, action: CreateConsultation) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.consultationResource.create(action.payload).pipe(
            map((Consultation: ConsultationModel) => ctx.dispatch(new CreateConsultationSuccess(Consultation))),
            catchError((error) => ctx.dispatch(new CreateConsultationFail(error)))
        );
    }

    @Action(CreateConsultationSuccess)
    createConsultationSuccess(ctx: StateContext<ConsultationStateModel>, {payload}: CreateConsultationSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Consulta cadastrada com sucesso!');
        ctx.dispatch(new CloseVeterinaryCreateModal());
        ctx.dispatch(new CloseVeterinaryPetModal());
    }

    @Action(CreateConsultationFail)
    createConsultationFail(ctx: StateContext<ConsultationStateModel>, {payload}: CreateConsultationFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateConsultation)
    updateConsultation(ctx: StateContext<ConsultationStateModel>, action: UpdateConsultation) {
        ctx.patchState({isLoading: true});
        return this.consultationResource.update(action.payload).pipe(
            map((Consultation: ConsultationModel) => ctx.dispatch(new UpdateConsultationSuccess(Consultation))),
            catchError((error) => ctx.dispatch(new UpdateConsultationFail(error)))
        );
    }

    @Action(UpdateConsultationSuccess)
    updateConsultationSuccess(ctx: StateContext<ConsultationStateModel>, {payload}: UpdateConsultationSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Consulta atualizada com sucesso!');
        ctx.dispatch(new CloseVeterinaryCreateModal());
        ctx.dispatch(new CloseVeterinaryPetModal());
    }

    @Action(UpdateConsultationFail)
    updateConsultationFail(ctx: StateContext<ConsultationStateModel>, {payload}: UpdateConsultationFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteConsultation)
    deleteConsultation(ctx: StateContext<ConsultationStateModel>, action: DeleteConsultation) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.consultationResource.destroy(action.payload).pipe(
            map((Consultation: ConsultationModel) => ctx.dispatch(new DeleteConsultationSuccess(Consultation))),
            catchError((error) => ctx.dispatch(new DeleteConsultationFail(error)))
        );
    }

    @Action(DeleteConsultationSuccess)
    deleteConsultationSuccess(ctx: StateContext<ConsultationStateModel>, {payload}: DeleteConsultationSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Consulta excluída com sucesso!');
    }

    @Action(DeleteConsultationFail)
    deleteConsultationFail(ctx: StateContext<ConsultationStateModel>, {payload}: DeleteConsultationFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    async presentToast(msg, type: string = 'success') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: type
        });
        toast.present();
    }
}
