import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPetMedicine,
    LoadPetMedicines,
    LoadPetMedicinesSuccess,
    LoadPetMedicinesFail,
    CreatePetMedicine,
    CreatePetMedicineSuccess,
    CreatePetMedicineFail,
    UpdatePetMedicine,
    UpdatePetMedicineSuccess,
    UpdatePetMedicineFail,
    DeletePetMedicine,
    DeletePetMedicineSuccess,
    DeletePetMedicineFail
} from './pet-medicine.actions';
import {ClosePetMedicineModal} from '../pet-medicine-modal/pet-medicine-modal.actions';

import {PetMedicineModel} from '../../../shared/models/pet-medicine.model';

import {PetMedicineResource} from '../../../shared/resources/pet-medicine.resource';

export class PetMedicineStateModel extends NgxsEntityStateStateModel<PetMedicineModel> {
    isLoading: boolean;
}

@State<PetMedicineStateModel>({
    name: 'petMedicine',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class PetMedicineState {

    @Selector()
    static selected(state: PetMedicineStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PetMedicineStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PetMedicineStateModel) {
        return state.entities;
    }

    constructor(private petMedicineResource: PetMedicineResource,
                private toastController: ToastController) {
    }

    @Action(SelectPetMedicine)
    selectPetMedicine(ctx: StateContext<PetMedicineStateModel>, {payload}: SelectPetMedicine) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPetMedicines)
    loadPetMedicines(ctx: StateContext<PetMedicineStateModel>, {payload}: LoadPetMedicines) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petMedicineResource.find(payload.id).pipe(
            map((PetMedicine: PetMedicineModel[]) => ctx.dispatch(new LoadPetMedicinesSuccess(PetMedicine))),
            catchError((error) => ctx.dispatch(new LoadPetMedicinesFail(error)))
        );
    }

    @Action(LoadPetMedicinesSuccess)
    loadPetMedicinesSuccess(ctx: StateContext<PetMedicineStateModel>, {payload}: LoadPetMedicinesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetMedicinesFail)
    loadPetMedicinesFail(ctx: StateContext<PetMedicineStateModel>, {payload}: LoadPetMedicinesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePetMedicine)
    createPetMedicine(ctx: StateContext<PetMedicineStateModel>, action: CreatePetMedicine) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petMedicineResource.create(action.payload).pipe(
            map((PetMedicine: PetMedicineModel) => ctx.dispatch(new CreatePetMedicineSuccess(PetMedicine))),
            catchError((error) => ctx.dispatch(new CreatePetMedicineFail(error)))
        );
    }

    @Action(CreatePetMedicineSuccess)
    createPetMedicineSuccess(ctx: StateContext<PetMedicineStateModel>, {payload}: CreatePetMedicineSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Remédio cadastrado com sucesso!');
        ctx.dispatch(new SelectPetMedicine(payload));
        ctx.dispatch(new ClosePetMedicineModal());
    }

    @Action(CreatePetMedicineFail)
    createPetMedicineFail(ctx: StateContext<PetMedicineStateModel>, {payload}: CreatePetMedicineFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePetMedicine)
    updatePetMedicine(ctx: StateContext<PetMedicineStateModel>, action: UpdatePetMedicine) {
        ctx.patchState({isLoading: true});
        return this.petMedicineResource.update(action.payload).pipe(
            map((PetMedicine: PetMedicineModel) => ctx.dispatch(new UpdatePetMedicineSuccess(PetMedicine))),
            catchError((error) => ctx.dispatch(new UpdatePetMedicineFail(error)))
        );
    }

    @Action(UpdatePetMedicineSuccess)
    updatePetMedicineSuccess(ctx: StateContext<PetMedicineStateModel>, {payload}: UpdatePetMedicineSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Remédio atualizado com sucesso!');
        ctx.dispatch(new ClosePetMedicineModal());
    }

    @Action(UpdatePetMedicineFail)
    updatePetMedicineFail(ctx: StateContext<PetMedicineStateModel>, {payload}: UpdatePetMedicineFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePetMedicine)
    deletePetMedicine(ctx: StateContext<PetMedicineStateModel>, action: DeletePetMedicine) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petMedicineResource.destroy(action.payload).pipe(
            map((PetMedicine: PetMedicineModel) => ctx.dispatch(new DeletePetMedicineSuccess(PetMedicine))),
            catchError((error) => ctx.dispatch(new DeletePetMedicineFail(error)))
        );
    }

    @Action(DeletePetMedicineSuccess)
    deletePetMedicineSuccess(ctx: StateContext<PetMedicineStateModel>, {payload}: DeletePetMedicineSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Remédio excluído com sucesso!');
    }

    @Action(DeletePetMedicineFail)
    deletePetMedicineFail(ctx: StateContext<PetMedicineStateModel>, {payload}: DeletePetMedicineFail) {
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
