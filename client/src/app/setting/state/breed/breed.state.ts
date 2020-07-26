import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectBreed,
    LoadBreeds,
    LoadBreedsSuccess,
    LoadBreedsFail,
    LoadBreedsPerType,
    LoadBreedsPerTypeSuccess,
    LoadBreedsPerTypeFail,
    CreateBreed,
    CreateBreedSuccess,
    CreateBreedFail,
    UpdateBreed,
    UpdateBreedSuccess,
    UpdateBreedFail,
    DeleteBreed,
    DeleteBreedSuccess,
    DeleteBreedFail
} from './breed.actions';
import {CloseBreedModal} from '../breed-modal/breed-modal.actions';

import {BreedModel} from '../../../shared/models/breed.model';

import {BreedResource} from '../../../shared/resources/breed.resource';

export class BreedStateModel extends NgxsEntityStateStateModel<BreedModel> {
    isLoading: boolean;
}

@State<BreedStateModel>({
    name: 'breed',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class BreedState {

    @Selector()
    static selected(state: BreedStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: BreedStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: BreedStateModel) {
        return state.entities;
    }

    constructor(private breedResource: BreedResource,
                private toastController: ToastController) {
    }

    @Action(SelectBreed)
    selectBreed(ctx: StateContext<BreedStateModel>, {payload}: SelectBreed) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadBreeds)
    loadBreeds(ctx: StateContext<BreedStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.breedResource.find().pipe(
            map((Breed: BreedModel[]) => ctx.dispatch(new LoadBreedsSuccess(Breed))),
            catchError((error) => ctx.dispatch(new LoadBreedsFail(error)))
        );
    }

    @Action(LoadBreedsSuccess)
    loadBreedsSuccess(ctx: StateContext<BreedStateModel>, {payload}: LoadBreedsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadBreedsFail)
    loadBreedsFail(ctx: StateContext<BreedStateModel>, {payload}: LoadBreedsFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadBreedsPerType)
    loadBreedsPerType(ctx: StateContext<BreedStateModel>, {payload}: LoadBreedsPerType) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.breedResource.findOne(payload).pipe(
            map((Breed: BreedModel[]) => ctx.dispatch(new LoadBreedsPerTypeSuccess(Breed))),
            catchError((error) => ctx.dispatch(new LoadBreedsPerTypeFail(error)))
        );
    }

    @Action(LoadBreedsPerTypeSuccess)
    loadBreedsPerTypeSuccess(ctx: StateContext<BreedStateModel>, {payload}: LoadBreedsPerTypeSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadBreedsPerTypeFail)
    loadBreedsPerTypeFail(ctx: StateContext<BreedStateModel>, {payload}: LoadBreedsPerTypeFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateBreed)
    createBreed(ctx: StateContext<BreedStateModel>, action: CreateBreed) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.breedResource.create(action.payload).pipe(
            map((Breed: BreedModel) => ctx.dispatch(new CreateBreedSuccess(Breed))),
            catchError((error) => ctx.dispatch(new CreateBreedFail(error)))
        );
    }

    @Action(CreateBreedSuccess)
    createBreedSuccess(ctx: StateContext<BreedStateModel>, {payload}: CreateBreedSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Raça cadastrada com sucesso!');
        ctx.dispatch(new SelectBreed(payload));
        ctx.dispatch(new CloseBreedModal());
    }

    @Action(CreateBreedFail)
    createBreedFail(ctx: StateContext<BreedStateModel>, {payload}: CreateBreedFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateBreed)
    updateBreed(ctx: StateContext<BreedStateModel>, action: UpdateBreed) {
        ctx.patchState({isLoading: true});
        return this.breedResource.update(action.payload).pipe(
            map((Breed: BreedModel) => ctx.dispatch(new UpdateBreedSuccess(Breed))),
            catchError((error) => ctx.dispatch(new UpdateBreedFail(error)))
        );
    }

    @Action(UpdateBreedSuccess)
    updateBreedSuccess(ctx: StateContext<BreedStateModel>, {payload}: UpdateBreedSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Raça atualizada com sucesso!');
        ctx.dispatch(new CloseBreedModal());
    }

    @Action(UpdateBreedFail)
    updateBreedFail(ctx: StateContext<BreedStateModel>, {payload}: UpdateBreedFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteBreed)
    deleteBreed(ctx: StateContext<BreedStateModel>, action: DeleteBreed) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.breedResource.destroy(action.payload).pipe(
            map((Breed: BreedModel) => ctx.dispatch(new DeleteBreedSuccess(Breed))),
            catchError((error) => ctx.dispatch(new DeleteBreedFail(error)))
        );
    }

    @Action(DeleteBreedSuccess)
    deleteBreedSuccess(ctx: StateContext<BreedStateModel>, {payload}: DeleteBreedSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Raça excluída com sucesso!');
    }

    @Action(DeleteBreedFail)
    deleteBreedFail(ctx: StateContext<BreedStateModel>, {payload}: DeleteBreedFail) {
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
