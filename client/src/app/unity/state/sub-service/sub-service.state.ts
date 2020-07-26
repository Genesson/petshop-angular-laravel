import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectSubService,
    LoadSubServices,
    LoadSubServicesSuccess,
    LoadSubServicesFail,
    CreateSubService,
    CreateSubServiceSuccess,
    CreateSubServiceFail,
    UpdateSubService,
    UpdateSubServiceSuccess,
    UpdateSubServiceFail,
    DeleteSubService,
    DeleteSubServiceSuccess,
    DeleteSubServiceFail
} from './sub-service.actions';
import {CloseServiceModal} from '../service-modal/service-modal.actions';

import {ServiceResource} from '../../../shared/resources/service.resource';

import {ServiceModel} from '../../../shared/models/service.model';

export class SubServiceStateModel extends NgxsEntityStateStateModel<ServiceModel> {
    isLoading: boolean;
}

@State<SubServiceStateModel>({
    name: 'subService',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class SubServiceState {

    @Selector()
    static selected(state: SubServiceStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: SubServiceStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: SubServiceStateModel) {
        return state.entities;
    }

    constructor(private serviceResource: ServiceResource,
                private toastController: ToastController) {
    }

    @Action(SelectSubService)
    selectPaciente(ctx: StateContext<SubServiceStateModel>, {payload}: SelectSubService) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadSubServices)
    loadSubServices(ctx: StateContext<SubServiceStateModel>, {payload}: LoadSubServices) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.serviceResource.findSubService(payload).pipe(
            map((SubService: ServiceModel[]) => ctx.dispatch(new LoadSubServicesSuccess(SubService))),
            catchError((error) => ctx.dispatch(new LoadSubServicesFail(error)))
        );
    }

    @Action(LoadSubServicesSuccess)
    loadSubServicesSuccess(ctx: StateContext<SubServiceStateModel>, {payload}: LoadSubServicesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadSubServicesFail)
    loadSubServicesFail(ctx: StateContext<SubServiceStateModel>, {payload}: LoadSubServicesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateSubService)
    createService(ctx: StateContext<SubServiceStateModel>, action: CreateSubService) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.serviceResource.create(action.payload).pipe(
            map((Service: ServiceModel) => ctx.dispatch(new CreateSubServiceSuccess(Service))),
            catchError((error) => ctx.dispatch(new CreateSubServiceFail(error)))
        );
    }

    @Action(CreateSubServiceSuccess)
    createServiceSuccess(ctx: StateContext<SubServiceStateModel>, {payload}: CreateSubServiceSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço cadastrada com sucesso!');
        ctx.dispatch(new CloseServiceModal());
    }

    @Action(CreateSubServiceFail)
    createServiceFail(ctx: StateContext<SubServiceStateModel>, {payload}: CreateSubServiceFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateSubService)
    updateService(ctx: StateContext<SubServiceStateModel>, action: UpdateSubService) {
        ctx.patchState({isLoading: true});
        return this.serviceResource.update(action.payload).pipe(
            map((Service: ServiceModel) => ctx.dispatch(new UpdateSubServiceSuccess(Service))),
            catchError((error) => ctx.dispatch(new UpdateSubServiceFail(error)))
        );
    }

    @Action(UpdateSubServiceSuccess)
    updateServiceSuccess(ctx: StateContext<SubServiceStateModel>, {payload}: UpdateSubServiceSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço atualizada com sucesso!');
        ctx.dispatch(new CloseServiceModal());
    }

    @Action(UpdateSubServiceFail)
    updateServiceFail(ctx: StateContext<SubServiceStateModel>, {payload}: UpdateSubServiceFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteSubService)
    deleteService(ctx: StateContext<SubServiceStateModel>, action: DeleteSubService) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.serviceResource.destroy(action.payload).pipe(
            map((Service: ServiceModel) => ctx.dispatch(new DeleteSubServiceSuccess(Service))),
            catchError((error) => ctx.dispatch(new DeleteSubServiceFail(error)))
        );
    }

    @Action(DeleteSubServiceSuccess)
    deleteServiceSuccess(ctx: StateContext<SubServiceStateModel>, {payload}: DeleteSubServiceSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço excluída com sucesso!');
    }

    @Action(DeleteSubServiceFail)
    deleteServiceFail(ctx: StateContext<SubServiceStateModel>, {payload}: DeleteSubServiceFail) {
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
