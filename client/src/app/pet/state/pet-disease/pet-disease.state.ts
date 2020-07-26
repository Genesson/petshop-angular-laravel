import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPetDisease,
    LoadPetDiseases,
    LoadPetDiseasesSuccess,
    LoadPetDiseasesFail,
    CreatePetDisease,
    CreatePetDiseaseSuccess,
    CreatePetDiseaseFail,
    UpdatePetDisease,
    UpdatePetDiseaseSuccess,
    UpdatePetDiseaseFail,
    DeletePetDisease,
    DeletePetDiseaseSuccess,
    DeletePetDiseaseFail
} from './pet-disease.actions';
import {ClosePetDiseaseModal} from '../pet-disease-modal/pet-disease-modal.actions';

import {PetDiseaseResource} from '../../../shared/resources/pet-disease.resource';

import {PetDiseaseModel} from '../../../shared/models/pet-disease.model';

export class PetDiseaseStateModel extends NgxsEntityStateStateModel<PetDiseaseModel> {
    isLoading: boolean;
}

@State<PetDiseaseStateModel>({
    name: 'petDisease',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class PetDiseaseState {

    @Selector()
    static selected(state: PetDiseaseStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PetDiseaseStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PetDiseaseStateModel) {
        return state.entities;
    }

    constructor(private petDiseaseResource: PetDiseaseResource,
                private toastController: ToastController) {
    }

    @Action(SelectPetDisease)
    selectPetDisease(ctx: StateContext<PetDiseaseStateModel>, {payload}: SelectPetDisease) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPetDiseases)
    loadPetDiseases(ctx: StateContext<PetDiseaseStateModel>, {payload}: LoadPetDiseases) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petDiseaseResource.find(payload.id).pipe(
            map((PetDisease: PetDiseaseModel[]) => ctx.dispatch(new LoadPetDiseasesSuccess(PetDisease))),
            catchError((error) => ctx.dispatch(new LoadPetDiseasesFail(error)))
        );
    }

    @Action(LoadPetDiseasesSuccess)
    loadPetDiseasesSuccess(ctx: StateContext<PetDiseaseStateModel>, {payload}: LoadPetDiseasesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetDiseasesFail)
    loadPetDiseasesFail(ctx: StateContext<PetDiseaseStateModel>, {payload}: LoadPetDiseasesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePetDisease)
    createPetDisease(ctx: StateContext<PetDiseaseStateModel>, action: CreatePetDisease) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petDiseaseResource.create(action.payload).pipe(
            map((PetDisease: PetDiseaseModel) => ctx.dispatch(new CreatePetDiseaseSuccess(PetDisease))),
            catchError((error) => ctx.dispatch(new CreatePetDiseaseFail(error)))
        );
    }

    @Action(CreatePetDiseaseSuccess)
    createPetDiseaseSuccess(ctx: StateContext<PetDiseaseStateModel>, {payload}: CreatePetDiseaseSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Doença pré-existente cadastrada com sucesso!');
        ctx.dispatch(new ClosePetDiseaseModal());
        ctx.dispatch(new SelectPetDisease(payload));
    }

    @Action(CreatePetDiseaseFail)
    createPetDiseaseFail(ctx: StateContext<PetDiseaseStateModel>, {payload}: CreatePetDiseaseFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePetDisease)
    updatePetDisease(ctx: StateContext<PetDiseaseStateModel>, action: UpdatePetDisease) {
        ctx.patchState({isLoading: true});
        return this.petDiseaseResource.update(action.payload).pipe(
            map((PetDisease: PetDiseaseModel) => ctx.dispatch(new UpdatePetDiseaseSuccess(PetDisease))),
            catchError((error) => ctx.dispatch(new UpdatePetDiseaseFail(error)))
        );
    }

    @Action(UpdatePetDiseaseSuccess)
    updatePetDiseaseSuccess(ctx: StateContext<PetDiseaseStateModel>, {payload}: UpdatePetDiseaseSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Doença pré-existente atualizada com sucesso!');
        ctx.dispatch(new ClosePetDiseaseModal());
    }

    @Action(UpdatePetDiseaseFail)
    updatePetDiseaseFail(ctx: StateContext<PetDiseaseStateModel>, {payload}: UpdatePetDiseaseFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePetDisease)
    deletePetDisease(ctx: StateContext<PetDiseaseStateModel>, action: DeletePetDisease) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petDiseaseResource.destroy(action.payload).pipe(
            map((PetDisease: PetDiseaseModel) => ctx.dispatch(new DeletePetDiseaseSuccess(PetDisease))),
            catchError((error) => ctx.dispatch(new DeletePetDiseaseFail(error)))
        );
    }

    @Action(DeletePetDiseaseSuccess)
    deletePetDiseaseSuccess(ctx: StateContext<PetDiseaseStateModel>, {payload}: DeletePetDiseaseSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Doença pré-existente excluída com sucesso!');
    }

    @Action(DeletePetDiseaseFail)
    deletePetDiseaseFail(ctx: StateContext<PetDiseaseStateModel>, {payload}: DeletePetDiseaseFail) {
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
