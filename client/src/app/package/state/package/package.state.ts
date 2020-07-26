import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPackage,
    LoadPackages,
    LoadPackagesSuccess,
    LoadPackagesFail,
    CreatePackage,
    CreatePackageSuccess,
    CreatePackageFail,
    UpdatePackage,
    UpdatePackageSuccess,
    UpdatePackageFail,
    DeletePackage,
    DeletePackageSuccess,
    DeletePackageFail
} from './package.actions';
import {ClosePackageCreateModal} from '../package-create-modal/package-create-modal.actions';

import {PackageModel} from '../../../shared/models/package.model';

import {PackageResource} from '../../../shared/resources/package.resource';

export class PackageStateModel extends NgxsEntityStateStateModel<PackageModel> {
    isLoading: boolean;
}

@State<PackageStateModel>({
    name: 'package',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class PackageState {

    @Selector()
    static selected(state: PackageStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PackageStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PackageStateModel) {
        return state.entities;
    }

    constructor(private packageResource: PackageResource,
                private toastController: ToastController) {
    }

    @Action(SelectPackage)
    selectPackage(ctx: StateContext<PackageStateModel>, {payload}: SelectPackage) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPackages)
    loadPackages(ctx: StateContext<PackageStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.packageResource.find().pipe(
            map((Package: PackageModel[]) => ctx.dispatch(new LoadPackagesSuccess(Package))),
            catchError((error) => ctx.dispatch(new LoadPackagesFail(error)))
        );
    }

    @Action(LoadPackagesSuccess)
    loadPackagesSuccess(ctx: StateContext<PackageStateModel>, {payload}: LoadPackagesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPackagesFail)
    loadPackagesFail(ctx: StateContext<PackageStateModel>, {payload}: LoadPackagesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePackage)
    createPackage(ctx: StateContext<PackageStateModel>, action: CreatePackage) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.packageResource.create(action.payload).pipe(
            map((Package: PackageModel) => ctx.dispatch(new CreatePackageSuccess(Package))),
            catchError((error) => ctx.dispatch(new CreatePackageFail(error)))
        );
    }

    @Action(CreatePackageSuccess)
    createPackageSuccess(ctx: StateContext<PackageStateModel>, {payload}: CreatePackageSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pacote cadastrado com sucesso!');
        ctx.dispatch(new SelectPackage(payload));
        ctx.dispatch(new ClosePackageCreateModal());
    }

    @Action(CreatePackageFail)
    createPackageFail(ctx: StateContext<PackageStateModel>, {payload}: CreatePackageFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePackage)
    updatePackage(ctx: StateContext<PackageStateModel>, action: UpdatePackage) {
        ctx.patchState({isLoading: true});
        return this.packageResource.update(action.payload).pipe(
            map((Package: PackageModel) => ctx.dispatch(new UpdatePackageSuccess(Package))),
            catchError((error) => ctx.dispatch(new UpdatePackageFail(error)))
        );
    }

    @Action(UpdatePackageSuccess)
    updatePackageSuccess(ctx: StateContext<PackageStateModel>, {payload}: UpdatePackageSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pacote atualizado com sucesso!');
        ctx.dispatch(new ClosePackageCreateModal());
    }

    @Action(UpdatePackageFail)
    updatePackageFail(ctx: StateContext<PackageStateModel>, {payload}: UpdatePackageFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePackage)
    deletePackage(ctx: StateContext<PackageStateModel>, action: DeletePackage) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.packageResource.destroy(action.payload).pipe(
            map((Package: PackageModel) => ctx.dispatch(new DeletePackageSuccess(Package))),
            catchError((error) => ctx.dispatch(new DeletePackageFail(error)))
        );
    }

    @Action(DeletePackageSuccess)
    deletePackageSuccess(ctx: StateContext<PackageStateModel>, {payload}: DeletePackageSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pacote excluído com sucesso!');
    }

    @Action(DeletePackageFail)
    deletePackageFail(ctx: StateContext<PackageStateModel>, {payload}: DeletePackageFail) {
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
