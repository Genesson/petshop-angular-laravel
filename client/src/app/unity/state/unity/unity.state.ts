import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectUnity,
    LoadUnits,
    LoadUnitsSuccess,
    LoadUnitsFail,
    CreateUnity,
    CreateUnitySuccess,
    CreateUnityFail,
    UpdateUnity,
    UpdateUnitySuccess,
    UpdateUnityFail,
    DeleteUnity,
    DeleteUnitySuccess,
    DeleteUnityFail,
    DisableUnity,
    DisableUnitySuccess,
    DisableUnityFail,
    UploadImageUnity,
    UploadImageUnitySuccess,
    UploadImageUnityFail
} from './unity.actions';
import {CloseUnityModal} from '../unity-modal/unity-modal.actions';
import {Refresh} from '../../../auth/state/signin/signin.actions';

import {UnityModel} from '../../../shared/models/unity.model';

import {UnityResource} from '../../../shared/resources/unity.resource';

export class UnityStateModel extends NgxsEntityStateStateModel<UnityModel> {
    image: string;
    isLoadingImage: boolean;
    isLoading: boolean;
}

@State<UnityStateModel>({
    name: 'unity',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        image: null,
        isLoadingImage: false,
        isLoading: false
    },
})
@Injectable()
export class UnityState {

    @Selector()
    static selected(state: UnityStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: UnityStateModel) {
        return state.isLoading;
    }

    @Selector()
    static isLoadingImage(state: UnityStateModel) {
        return state.isLoadingImage;
    }

    @Selector()
    static entities(state: UnityStateModel) {
        return state.entities;
    }

    @Selector()
    static image(state: UnityStateModel) {
        return state.image;
    }

    constructor(private unityResource: UnityResource,
                private toastController: ToastController) {
    }

    @Action(SelectUnity)
    selectPaciente(ctx: StateContext<UnityStateModel>, {payload}: SelectUnity) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadUnits)
    loadUnits(ctx: StateContext<UnityStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.unityResource.find().pipe(
            map((Unity: UnityModel[]) => ctx.dispatch(new LoadUnitsSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadUnitsFail(error)))
        );
    }

    @Action(LoadUnitsSuccess)
    loadUnitsSuccess(ctx: StateContext<UnityStateModel>, {payload}: LoadUnitsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadUnitsFail)
    loadUnitsFail(ctx: StateContext<UnityStateModel>, {payload}: LoadUnitsFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateUnity)
    createUnity(ctx: StateContext<UnityStateModel>, action: CreateUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.unityResource.create(action.payload).pipe(
            map((Unity: UnityModel) => ctx.dispatch(new CreateUnitySuccess(Unity))),
            catchError((error) => ctx.dispatch(new CreateUnityFail(error)))
        );
    }

    @Action(CreateUnitySuccess)
    createUnitySuccess(ctx: StateContext<UnityStateModel>, {payload}: CreateUnitySuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Unidade cadastrada com sucesso!');
        ctx.dispatch(new CloseUnityModal());
    }

    @Action(CreateUnityFail)
    createUnityFail(ctx: StateContext<UnityStateModel>, {payload}: CreateUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateUnity)
    updateUnity(ctx: StateContext<UnityStateModel>, action: UpdateUnity) {
        ctx.patchState({isLoading: true});
        return this.unityResource.update(action.payload).pipe(
            map((Unity: UnityModel) => ctx.dispatch(new UpdateUnitySuccess(Unity))),
            catchError((error) => ctx.dispatch(new UpdateUnityFail(error)))
        );
    }

    @Action(UpdateUnitySuccess)
    updateUnitySuccess(ctx: StateContext<UnityStateModel>, {payload}: UpdateUnitySuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        ctx.dispatch(new CloseUnityModal());
        ctx.dispatch(new Refresh());
        this.presentToast('Unidade atualizada com sucesso!');
    }

    @Action(UpdateUnityFail)
    updateUnityFail(ctx: StateContext<UnityStateModel>, {payload}: UpdateUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteUnity)
    deleteUnity(ctx: StateContext<UnityStateModel>, action: DeleteUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.unityResource.destroy(action.payload).pipe(
            map((Unity: UnityModel) => ctx.dispatch(new DeleteUnitySuccess(Unity))),
            catchError((error) => ctx.dispatch(new DeleteUnityFail(error)))
        );
    }

    @Action(DeleteUnitySuccess)
    deleteUnitySuccess(ctx: StateContext<UnityStateModel>, {payload}: DeleteUnitySuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Unidade excluída com sucesso!');
    }

    @Action(DeleteUnityFail)
    deleteUnityFail(ctx: StateContext<UnityStateModel>, {payload}: DeleteUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DisableUnity)
    disableUnity(ctx: StateContext<UnityStateModel>, action: DisableUnity) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.unityResource.disable(action.payload).pipe(
        map((Unity: UnityModel) => ctx.dispatch(new DisableUnitySuccess(Unity))),
        catchError((error) => ctx.dispatch(new DisableUnityFail(error)))
      );
    }

    @Action(DisableUnitySuccess)
    disableUnitySuccess(ctx: StateContext<UnityStateModel>, { payload }: DisableUnitySuccess) {
      NgxsEntityStateAdapter.updateOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Status da unidade atualizado com sucesso!');
    }

    @Action(DisableUnityFail)
    disableUnityFail(ctx: StateContext<UnityStateModel>, { payload }: DisableUnityFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UploadImageUnity)
    uploadImageTutor(ctx: StateContext<UnityStateModel>, action: UploadImageUnity) {
        ctx.patchState({isLoadingImage: true});
        return this.unityResource.uploadImage(action.payload).pipe(
            map((image: any) => ctx.dispatch(new UploadImageUnitySuccess(image))),
            catchError((error) => ctx.dispatch(new UploadImageUnityFail(error)))
        );
    }

    @Action(UploadImageUnitySuccess)
    uploadImageTutorSuccess(ctx: StateContext<UnityStateModel>, {payload}: UploadImageUnitySuccess) {
        ctx.patchState({image: payload});
        ctx.patchState({isLoadingImage: false});
    }

    @Action(UploadImageUnityFail)
    uploadImageTutorFail(ctx: StateContext<UnityStateModel>, {payload}: UploadImageUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        ctx.patchState({isLoadingImage: false});
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
