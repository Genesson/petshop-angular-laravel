import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectSubShower,
    LoadSubShowers,
    LoadSubShowersSuccess,
    LoadSubShowersFail,
    LoadSubShowersUnity,
    LoadSubShowersUnitySuccess,
    LoadSubShowersUnityFail,
    CreateSubShower,
    CreateSubShowerSuccess,
    CreateSubShowerFail,
    UpdateSubShower,
    UpdateSubShowerSuccess,
    UpdateSubShowerFail,
    DeleteSubShower,
    DeleteSubShowerSuccess,
    DeleteSubShowerFail
} from './sub-shower.actions';
import {CloseSubShowerModal} from '../sub-shower-modal/sub-shower-modal.actions';

import {ServiceModel} from '../../../shared/models/service.model';

import {ServiceResource} from '../../../shared/resources/service.resource';

export class SubShowerStateModel extends NgxsEntityStateStateModel<any> {
    isLoading: boolean;
}

@State<SubShowerStateModel>({
    name: 'subShower',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class SubShowerState {

    @Selector()
    static selected(state: SubShowerStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: SubShowerStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: SubShowerStateModel) {
        return state.entities;
    }

    constructor(private subShowerResource: ServiceResource,
                private toastController: ToastController) {
    }

    @Action(SelectSubShower)
    selectPaciente(ctx: StateContext<SubShowerStateModel>, {payload}: SelectSubShower) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadSubShowers)
    loadSubShowers(ctx: StateContext<SubShowerStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.subShowerResource.find().pipe(
            map((SubShower: ServiceModel[]) => ctx.dispatch(new LoadSubShowersSuccess(SubShower))),
            catchError((error) => ctx.dispatch(new LoadSubShowersFail(error)))
        );
    }

    @Action(LoadSubShowersSuccess)
    loadSubShowersSuccess(ctx: StateContext<SubShowerStateModel>, {payload}: LoadSubShowersSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadSubShowersFail)
    loadSubShowersFail(ctx: StateContext<SubShowerStateModel>, {payload}: LoadSubShowersFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadSubShowersUnity)
    loadSubShowersUnity(ctx: StateContext<SubShowerStateModel>, {payload}: LoadSubShowersUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.subShowerResource.findSubShowersPerUnity(payload).pipe(
            map((SubShower: ServiceModel[]) => ctx.dispatch(new LoadSubShowersUnitySuccess(SubShower))),
            catchError((error) => ctx.dispatch(new LoadSubShowersUnityFail(error)))
        );
    }

    @Action(LoadSubShowersUnitySuccess)
    loadSubShowersUnitySuccess(ctx: StateContext<SubShowerStateModel>, {payload}: LoadSubShowersUnitySuccess) {
        ctx.patchState({entities: payload});
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadSubShowersUnityFail)
    loadSubShowersUnityFail(ctx: StateContext<SubShowerStateModel>, {payload}: LoadSubShowersUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateSubShower)
    createSubShower(ctx: StateContext<SubShowerStateModel>, action: CreateSubShower) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.subShowerResource.create(action.payload).pipe(
            map((SubShower: any) => ctx.dispatch(new CreateSubShowerSuccess(SubShower))),
            catchError((error) => ctx.dispatch(new CreateSubShowerFail(error)))
        );
    }

    @Action(CreateSubShowerSuccess)
    createSubShowerSuccess(ctx: StateContext<SubShowerStateModel>, {payload}: CreateSubShowerSuccess) {
        ctx.patchState({entities: payload});
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tosa cadastrada com sucesso!');
        ctx.dispatch(new CloseSubShowerModal());
    }

    @Action(CreateSubShowerFail)
    createSubShowerFail(ctx: StateContext<SubShowerStateModel>, {payload}: CreateSubShowerFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateSubShower)
    updateSubShower(ctx: StateContext<SubShowerStateModel>, action: UpdateSubShower) {
        ctx.patchState({isLoading: true});
        return this.subShowerResource.update(action.payload).pipe(
            map((SubShower: any) => ctx.dispatch(new UpdateSubShowerSuccess(SubShower))),
            catchError((error) => ctx.dispatch(new UpdateSubShowerFail(error)))
        );
    }

    @Action(UpdateSubShowerSuccess)
    updateSubShowerSuccess(ctx: StateContext<SubShowerStateModel>, {payload}: UpdateSubShowerSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tosa atualizada com sucesso!');
        ctx.dispatch(new CloseSubShowerModal());
    }

    @Action(UpdateSubShowerFail)
    updateSubShowerFail(ctx: StateContext<SubShowerStateModel>, {payload}: UpdateSubShowerFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteSubShower)
    deleteSubShower(ctx: StateContext<SubShowerStateModel>, action: DeleteSubShower) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.subShowerResource.destroy(action.payload).pipe(
            map((SubShower: any) => ctx.dispatch(new DeleteSubShowerSuccess(SubShower))),
            catchError((error) => ctx.dispatch(new DeleteSubShowerFail(error)))
        );
    }

    @Action(DeleteSubShowerSuccess)
    deleteSubShowerSuccess(ctx: StateContext<SubShowerStateModel>, {payload}: DeleteSubShowerSuccess) {
        ctx.patchState({entities: payload});
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tosa excluída com sucesso!');
    }

    @Action(DeleteSubShowerFail)
    deleteSubShowerFail(ctx: StateContext<SubShowerStateModel>, {payload}: DeleteSubShowerFail) {
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
