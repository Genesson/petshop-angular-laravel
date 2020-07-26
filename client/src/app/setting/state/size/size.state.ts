import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectSize,
    CreateSize,
    CreateSizeFail,
    CreateSizeSuccess,
    LoadSizes,
    LoadSizesFail,
    LoadSizesSuccess,
    UpdateSize,
    UpdateSizeFail,
    UpdateSizeSuccess,
    DeleteSize,
    DeleteSizeFail,
    DeleteSizeSuccess
} from './size.actions';
import {CloseSizeModal} from '../size-modal/size-modal.actions';

import {SizeModel} from '../../../shared/models/size.model';

import {SizeResource} from '../../../shared/resources/size.resource';

export class SizeStateModel extends NgxsEntityStateStateModel<SizeModel> {
    isLoading: boolean;
}

@State<SizeStateModel>({
    name: 'size',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class SizeState {

    @Selector()
    static selected(state: SizeStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: SizeStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: SizeStateModel) {
        return state.entities;
    }

    constructor(private sizeResource: SizeResource,
                private toastController: ToastController) {
    }

    @Action(SelectSize)
    selectSize(ctx: StateContext<SizeStateModel>, {payload}: SelectSize) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadSizes)
    loadSizes(ctx: StateContext<SizeStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.sizeResource.find().pipe(
            map((Unity: SizeModel[]) => ctx.dispatch(new LoadSizesSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadSizesFail(error)))
        );
    }

    @Action(LoadSizesSuccess)
    loadSizesSuccess(ctx: StateContext<SizeStateModel>, {payload}: LoadSizesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadSizesFail)
    loadSizesFail(ctx: StateContext<SizeStateModel>, {payload}: LoadSizesFail) {
        console.warn(`Occorreu um erro ao carregar os tamanhos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateSize)
    createSize(ctx: StateContext<SizeStateModel>, action: CreateSize) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.sizeResource.create(action.payload).pipe(
            map((Size: SizeModel) => ctx.dispatch(new CreateSizeSuccess(Size))),
            catchError((error) => ctx.dispatch(new CreateSizeFail(error)))
        );
    }

    @Action(CreateSizeSuccess)
    createSizeSuccess(ctx: StateContext<SizeStateModel>, {payload}: CreateSizeSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Porte cadastrado com sucesso!');
        ctx.dispatch(new SelectSize(payload));
        ctx.dispatch(new CloseSizeModal());
    }

    @Action(CreateSizeFail)
    createSizeFail(ctx: StateContext<SizeStateModel>, {payload}: CreateSizeFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateSize)
    updateSize(ctx: StateContext<SizeStateModel>, action: UpdateSize) {
        ctx.patchState({isLoading: true});
        return this.sizeResource.update(action.payload).pipe(
            map((Size: SizeModel) => ctx.dispatch(new UpdateSizeSuccess(Size))),
            catchError((error) => ctx.dispatch(new UpdateSizeFail(error)))
        );
    }

    @Action(UpdateSizeSuccess)
    updateSizeSuccess(ctx: StateContext<SizeStateModel>, {payload}: UpdateSizeSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Porte atualizado com sucesso!');
        ctx.dispatch(new CloseSizeModal());
    }

    @Action(UpdateSizeFail)
    updateSizeFail(ctx: StateContext<SizeStateModel>, {payload}: UpdateSizeFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteSize)
    deleteSize(ctx: StateContext<SizeStateModel>, action: DeleteSize) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.sizeResource.destroy(action.payload).pipe(
            map((Size: SizeModel) => ctx.dispatch(new DeleteSizeSuccess(Size))),
            catchError((error) => ctx.dispatch(new DeleteSizeFail(error)))
        );
    }

    @Action(DeleteSizeSuccess)
    deleteSizeSuccess(ctx: StateContext<SizeStateModel>, {payload}: DeleteSizeSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Porte excluído com sucesso!');
    }

    @Action(DeleteSizeFail)
    deleteSizeFail(ctx: StateContext<SizeStateModel>, {payload}: DeleteSizeFail) {
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
