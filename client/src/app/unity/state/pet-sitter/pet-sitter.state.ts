import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPetSitter,
    LoadPetSitters,
    LoadPetSittersSuccess,
    LoadPetSittersFail,
    LoadPetSittersUnity,
    LoadPetSittersUnitySuccess,
    LoadPetSittersUnityFail,
    CreatePetSitter,
    CreatePetSitterSuccess,
    CreatePetSitterFail,
    UpdatePetSitter,
    UpdatePetSitterSuccess,
    UpdatePetSitterFail,
    DeletePetSitter,
    DeletePetSitterSuccess,
    DeletePetSitterFail
} from './pet-sitter.actions';
import {ClosePetSitterModal} from '../pet-sitter-modal/pet-sitter-modal.actions';

import {ServiceModel} from '../../../shared/models/service.model';

import {ServiceResource} from '../../../shared/resources/service.resource';

export class PetSitterStateModel extends NgxsEntityStateStateModel<ServiceModel> {
    isLoading: boolean;
}

@State<PetSitterStateModel>({
    name: 'petSitter',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class PetSitterState {

    @Selector()
    static selected(state: PetSitterStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PetSitterStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PetSitterStateModel) {
        return state.entities;
    }

    constructor(private petSitterResource: ServiceResource,
                private toastController: ToastController) {
    }

    @Action(SelectPetSitter)
    selectPaciente(ctx: StateContext<PetSitterStateModel>, {payload}: SelectPetSitter) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPetSitters)
    loadPetSitters(ctx: StateContext<PetSitterStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petSitterResource.find().pipe(
            map((PetSitter: ServiceModel[]) => ctx.dispatch(new LoadPetSittersSuccess(PetSitter))),
            catchError((error) => ctx.dispatch(new LoadPetSittersFail(error)))
        );
    }

    @Action(LoadPetSittersSuccess)
    loadPetSittersSuccess(ctx: StateContext<PetSitterStateModel>, {payload}: LoadPetSittersSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetSittersFail)
    loadPetSittersFail(ctx: StateContext<PetSitterStateModel>, {payload}: LoadPetSittersFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetSittersUnity)
    loadPetSittersUnity(ctx: StateContext<PetSitterStateModel>, {payload}: LoadPetSittersUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petSitterResource.findPetSittersPerUnity(payload).pipe(
            map((PetSitter: ServiceModel[]) => ctx.dispatch(new LoadPetSittersUnitySuccess(PetSitter))),
            catchError((error) => ctx.dispatch(new LoadPetSittersUnityFail(error)))
        );
    }

    @Action(LoadPetSittersUnitySuccess)
    loadPetSittersUnitySuccess(ctx: StateContext<PetSitterStateModel>, {payload}: LoadPetSittersUnitySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetSittersUnityFail)
    loadPetSittersUnityFail(ctx: StateContext<PetSitterStateModel>, {payload}: LoadPetSittersUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePetSitter)
    createPetSitter(ctx: StateContext<PetSitterStateModel>, action: CreatePetSitter) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petSitterResource.create(action.payload).pipe(
            map((PetSitter: ServiceModel) => ctx.dispatch(new CreatePetSitterSuccess(PetSitter))),
            catchError((error) => ctx.dispatch(new CreatePetSitterFail(error)))
        );
    }

    @Action(CreatePetSitterSuccess)
    createPetSitterSuccess(ctx: StateContext<PetSitterStateModel>, {payload}: CreatePetSitterSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pet Sitter cadastrado com sucesso!');
        ctx.dispatch(new ClosePetSitterModal());
    }

    @Action(CreatePetSitterFail)
    createPetSitterFail(ctx: StateContext<PetSitterStateModel>, {payload}: CreatePetSitterFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePetSitter)
    updatePetSitter(ctx: StateContext<PetSitterStateModel>, action: UpdatePetSitter) {
        ctx.patchState({isLoading: true});
        return this.petSitterResource.update(action.payload).pipe(
            map((PetSitter: ServiceModel) => ctx.dispatch(new UpdatePetSitterSuccess(PetSitter))),
            catchError((error) => ctx.dispatch(new UpdatePetSitterFail(error)))
        );
    }

    @Action(UpdatePetSitterSuccess)
    updatePetSitterSuccess(ctx: StateContext<PetSitterStateModel>, {payload}: UpdatePetSitterSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pet Sitter atualizado com sucesso!');
        ctx.dispatch(new ClosePetSitterModal());
    }

    @Action(UpdatePetSitterFail)
    updatePetSitterFail(ctx: StateContext<PetSitterStateModel>, {payload}: UpdatePetSitterFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePetSitter)
    deletePetSitter(ctx: StateContext<PetSitterStateModel>, action: DeletePetSitter) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petSitterResource.destroy(action.payload).pipe(
            map((PetSitter: ServiceModel) => ctx.dispatch(new DeletePetSitterSuccess(PetSitter))),
            catchError((error) => ctx.dispatch(new DeletePetSitterFail(error)))
        );
    }

    @Action(DeletePetSitterSuccess)
    deletePetSitterSuccess(ctx: StateContext<PetSitterStateModel>, {payload}: DeletePetSitterSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pet Sitter excluído com sucesso!');
    }

    @Action(DeletePetSitterFail)
    deletePetSitterFail(ctx: StateContext<PetSitterStateModel>, {payload}: DeletePetSitterFail) {
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
