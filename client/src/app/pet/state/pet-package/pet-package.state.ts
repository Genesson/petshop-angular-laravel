import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPetPackage,
    LoadPetPackages,
    LoadPetPackagesSuccess,
    LoadPetPackagesFail,
    CreatePetPackage,
    CreatePetPackageSuccess,
    CreatePetPackageFail,
    UpdatePetPackage,
    UpdatePetPackageSuccess,
    UpdatePetPackageFail,
    DeletePetPackage,
    DeletePetPackageSuccess,
    DeletePetPackageFail,
    DateIntervalsPetPackage,
    DateIntervalsPetPackageSuccess,
    DateIntervalsPetPackageFail
} from './pet-package.actions';
import {AddItem} from '../../../cart/state/order/order.actions';
import {OpenPetCartModal} from '../pet-cart-modal/pet-cart-modal.actions';

import {PetPackageModel} from '../../../shared/models/pet-package.model';

import {PetPackageResource} from '../../../shared/resources/pet-package.resource';
import {ClosePetScheduleModal} from '../pet-schedule-modal/pet-schedule-modal.actions';
import {CloseDaycareCreateModal} from '../daycare-create-modal/daycare-create-modal.actions';

export class PetPackageStateModel extends NgxsEntityStateStateModel<PetPackageModel> {
    isLoading: boolean;
    intervals: Array<any>;
}

@State<PetPackageStateModel>({
    name: 'petPackage',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false,
        intervals: []
    }
})
@Injectable()
export class PetPackageState {

    @Selector()
    static selected(state: PetPackageStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PetPackageStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PetPackageStateModel) {
        return state.entities;
    }

    @Selector()
    static intervals(state: PetPackageStateModel) {
        return state.intervals;
    }

    constructor(private petPackageResource: PetPackageResource,
                private toastController: ToastController) {
    }

    @Action(SelectPetPackage)
    selectPetPackage(ctx: StateContext<PetPackageStateModel>, {payload}: SelectPetPackage) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPetPackages)
    loadPetPackages(ctx: StateContext<PetPackageStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petPackageResource.find().pipe(
            map((PetPackage: PetPackageModel[]) => ctx.dispatch(new LoadPetPackagesSuccess(PetPackage))),
            catchError((error) => ctx.dispatch(new LoadPetPackagesFail(error)))
        );
    }

    @Action(LoadPetPackagesSuccess)
    loadPetPackagesSuccess(ctx: StateContext<PetPackageStateModel>, {payload}: LoadPetPackagesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetPackagesFail)
    loadPetPackagesFail(ctx: StateContext<PetPackageStateModel>, {payload}: LoadPetPackagesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePetPackage)
    createPetPackage(ctx: StateContext<PetPackageStateModel>, action: CreatePetPackage) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petPackageResource.create(action.payload).pipe(
            map((PetPackage: PetPackageModel) => ctx.dispatch(new CreatePetPackageSuccess(PetPackage))),
            catchError((error) => ctx.dispatch(new CreatePetPackageFail(error)))
        );
    }

    @Action(CreatePetPackageSuccess)
    createPetPackageSuccess(ctx: StateContext<PetPackageStateModel>, {payload}: CreatePetPackageSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pacote cadastrado com sucesso!');
        ctx.dispatch(
            new AddItem({
              quantity: payload.quantity,
              item: payload.service,
              pet: payload.pet,
              schedule: payload.id
            })
        );
        ctx.dispatch(new OpenPetCartModal());
        ctx.dispatch(new SelectPetPackage(payload));
        ctx.dispatch(new ClosePetScheduleModal());
        ctx.dispatch(new CloseDaycareCreateModal());
    }

    @Action(CreatePetPackageFail)
    createPetPackageFail(ctx: StateContext<PetPackageStateModel>, {payload}: CreatePetPackageFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePetPackage)
    updatePetPackage(ctx: StateContext<PetPackageStateModel>, action: UpdatePetPackage) {
        ctx.patchState({isLoading: true});
        return this.petPackageResource.update(action.payload).pipe(
            map((PetPackage: PetPackageModel) => ctx.dispatch(new UpdatePetPackageSuccess(PetPackage))),
            catchError((error) => ctx.dispatch(new UpdatePetPackageFail(error)))
        );
    }

    @Action(UpdatePetPackageSuccess)
    updatePetPackageSuccess(ctx: StateContext<PetPackageStateModel>, {payload}: UpdatePetPackageSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pacote atualizado com sucesso!');
    }

    @Action(UpdatePetPackageFail)
    updatePetPackageFail(ctx: StateContext<PetPackageStateModel>, {payload}: UpdatePetPackageFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePetPackage)
    deletePetPackage(ctx: StateContext<PetPackageStateModel>, action: DeletePetPackage) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petPackageResource.destroy(action.payload).pipe(
            map((PetPackage: PetPackageModel) => ctx.dispatch(new DeletePetPackageSuccess(PetPackage))),
            catchError((error) => ctx.dispatch(new DeletePetPackageFail(error)))
        );
    }

    @Action(DeletePetPackageSuccess)
    deletePetPackageSuccess(ctx: StateContext<PetPackageStateModel>, {payload}: DeletePetPackageSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Pacote excluído com sucesso!');
    }

    @Action(DeletePetPackageFail)
    deletePetPackageFail(ctx: StateContext<PetPackageStateModel>, {payload}: DeletePetPackageFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DateIntervalsPetPackage)
    dateIntervalsPetPackage(ctx: StateContext<PetPackageStateModel>, action: DateIntervalsPetPackage) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petPackageResource.dateIntervals(action.payload).pipe(
            map((Intervals: any) => ctx.dispatch(new DateIntervalsPetPackageSuccess(Intervals))),
            catchError((error) => ctx.dispatch(new DateIntervalsPetPackageFail(error)))
        );
    }

    @Action(DateIntervalsPetPackageSuccess)
    dateIntervalsPetPackageSuccess(ctx: StateContext<PetPackageStateModel>, {payload}: DateIntervalsPetPackageSuccess) {
        ctx.patchState({intervals: payload});
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Datas atualizadas com sucesso!');
    }

    @Action(DateIntervalsPetPackageFail)
    dateIntervalsPetPackageFail(ctx: StateContext<PetPackageStateModel>, {payload}: DateIntervalsPetPackageFail) {
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
