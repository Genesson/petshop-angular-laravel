import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    ExpectedTimeService,
    SelectService,
    LoadServices,
    LoadServicesSuccess,
    LoadServicesFail,
    LoadServicesUnity,
    LoadServicesUnitySuccess,
    LoadServicesUnityFail,
    CreateService,
    CreateServiceSuccess,
    CreateServiceFail,
    UpdateService,
    UpdateServiceSuccess,
    UpdateServiceFail,
    UpdateStatusService,
    UpdateStatusServiceSuccess,
    UpdateStatusServiceFail,
    DeleteService,
    DeleteServiceSuccess,
    DeleteServiceFail
} from './service.actions';
import {CloseServiceModal} from '../service-modal/service-modal.actions';

import {ServiceModel} from '../../../shared/models/service.model';

import {ServiceResource} from '../../../shared/resources/service.resource';

import {UnitySelectors} from '../unity/unity.selectors';
import { LoadSubServices } from '../sub-service/sub-service.actions';

export class ServiceStateModel extends NgxsEntityStateStateModel<ServiceModel> {
    isLoading: boolean;
    expectedTime: number;
}

@State<ServiceStateModel>({
    name: 'service',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        expectedTime: null,
        isLoading: false
    },
})
@Injectable()
export class ServiceState {

    @Selector()
    static selected(state: ServiceStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: ServiceStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: ServiceStateModel) {
        return state.entities;
    }

    @Selector()
    static expectedTime(state: ServiceStateModel) {
        return state.expectedTime;
    }

    constructor(private serviceResource: ServiceResource,
                private toastController: ToastController,
                private store: Store) {
    }

    @Action(ExpectedTimeService)
    expectedTimeService(ctx: StateContext<ServiceStateModel>, {payload}: ExpectedTimeService) {
        return this.serviceResource.expectedTimeService(payload.service, payload.size).pipe(
            map((time: number) => {
                ctx.patchState({
                    expectedTime: time
                });
            }),
            catchError((error) => ctx.dispatch(new LoadServicesFail(error)))
        );
    }

    @Action(SelectService)
    selectService(ctx: StateContext<ServiceStateModel>, {payload}: SelectService) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadServices)
    loadServices(ctx: StateContext<ServiceStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.serviceResource.find().pipe(
            map((Service: ServiceModel[]) => ctx.dispatch(new LoadServicesSuccess(Service))),
            catchError((error) => ctx.dispatch(new LoadServicesFail(error)))
        );
    }

    @Action(LoadServicesSuccess)
    loadServicesSuccess(ctx: StateContext<ServiceStateModel>, {payload}: LoadServicesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadServicesFail)
    loadServicesFail(ctx: StateContext<ServiceStateModel>, {payload}: LoadServicesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadServicesUnity)
    loadServicesUnity(ctx: StateContext<ServiceStateModel>, {payload}: LoadServicesUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.serviceResource.findPerUnity(payload).pipe(
            map((Service: ServiceModel[]) => ctx.dispatch(new LoadServicesUnitySuccess(Service))),
            catchError((error) => ctx.dispatch(new LoadServicesUnityFail(error)))
        );
    }

    @Action(LoadServicesUnitySuccess)
    loadServicesUnitySuccess(ctx: StateContext<ServiceStateModel>, {payload}: LoadServicesUnitySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadServicesUnityFail)
    loadServicesUnityFail(ctx: StateContext<ServiceStateModel>, {payload}: LoadServicesUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateService)
    createService(ctx: StateContext<ServiceStateModel>, action: CreateService) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.serviceResource.create(action.payload).pipe(
            map((Service: ServiceModel) => ctx.dispatch(new CreateServiceSuccess(Service))),
            catchError((error) => ctx.dispatch(new CreateServiceFail(error)))
        );
    }

    @Action(CreateServiceSuccess)
    createServiceSuccess(ctx: StateContext<ServiceStateModel>, {payload}: CreateServiceSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço cadastrada com sucesso!');
        ctx.dispatch(new CloseServiceModal());
    }

    @Action(CreateServiceFail)
    createServiceFail(ctx: StateContext<ServiceStateModel>, {payload}: CreateServiceFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateService)
    updateService(ctx: StateContext<ServiceStateModel>, action: UpdateService) {
        ctx.patchState({isLoading: true});
        return this.serviceResource.update(action.payload).pipe(
            map((Service: ServiceModel) => ctx.dispatch(new UpdateServiceSuccess(Service))),
            catchError((error) => ctx.dispatch(new UpdateServiceFail(error)))
        );
    }

    @Action(UpdateServiceSuccess)
    updateServiceSuccess(ctx: StateContext<ServiceStateModel>, {payload}: UpdateServiceSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço atualizada com sucesso!');
        ctx.dispatch(new CloseServiceModal());
    }

    @Action(UpdateServiceFail)
    updateServiceFail(ctx: StateContext<ServiceStateModel>, {payload}: UpdateServiceFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateStatusService)
    updateStatusService(ctx: StateContext<ServiceStateModel>, action: UpdateStatusService) {
      ctx.patchState({ isLoading: true });
      return this.serviceResource.updateStatus(action).pipe(
        map(() => ctx.dispatch(new UpdateStatusServiceSuccess())),
        catchError((error) => ctx.dispatch(new UpdateStatusServiceFail(error)))
      );
    }

    @Action(UpdateStatusServiceSuccess)
    updateStatusServiceSuccess(ctx: StateContext<ServiceStateModel>) {
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Status atualizado com sucesso!');
      ctx.dispatch(new LoadServicesUnity(this.store.selectSnapshot(UnitySelectors.selected)));
      ctx.dispatch(new LoadSubServices(this.store.selectSnapshot(UnitySelectors.selected)));
    }

    @Action(UpdateStatusServiceFail)
    updateStatusServiceFail(ctx: StateContext<ServiceStateModel>, { payload }: UpdateStatusServiceFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteService)
    deleteService(ctx: StateContext<ServiceStateModel>, action: DeleteService) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.serviceResource.destroy(action.payload).pipe(
            map((Service: ServiceModel) => ctx.dispatch(new DeleteServiceSuccess(Service))),
            catchError((error) => ctx.dispatch(new DeleteServiceFail(error)))
        );
    }

    @Action(DeleteServiceSuccess)
    deleteServiceSuccess(ctx: StateContext<ServiceStateModel>, {payload}: DeleteServiceSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço excluída com sucesso!');
    }

    @Action(DeleteServiceFail)
    deleteServiceFail(ctx: StateContext<ServiceStateModel>, {payload}: DeleteServiceFail) {
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
