import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPetVaccine,
    LoadPetVaccines,
    LoadPetVaccinesSuccess,
    LoadPetVaccinesFail,
    LoadPetVaccinesPet,
    LoadPetVaccinesPetSuccess,
    LoadPetVaccinesPetFail,
    CreatePetVaccine,
    CreatePetVaccineSuccess,
    CreatePetVaccineFail,
    UpdatePetVaccine,
    UpdatePetVaccineSuccess,
    UpdatePetVaccineFail,
    DeletePetVaccine,
    DeletePetVaccineSuccess,
    DeletePetVaccineFail,
} from './pet-vaccine.actions';
import {ClosePetVaccineModal} from '../pet-vaccine-modal/pet-vaccine-modal.actions';

import {PetVaccineModel} from '../../../shared/models/pet-vaccine.model';

import {PetVaccineResource} from '../../../shared/resources/pet-vaccine.resource';

export class PetVaccineStateModel extends NgxsEntityStateStateModel<PetVaccineModel> {
    isLoading: boolean;
}

@State<PetVaccineStateModel>({
    name: 'petVaccine',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class PetVaccineState {

    @Selector()
    static selected(state: PetVaccineStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PetVaccineStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PetVaccineStateModel) {
        return state.entities;
    }

    constructor(private petVaccineResource: PetVaccineResource,
                private toastController: ToastController) {
    }

    @Action(SelectPetVaccine)
    selectPetVaccine(ctx: StateContext<PetVaccineStateModel>, {payload}: SelectPetVaccine) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPetVaccines)
    loadPetVaccines(ctx: StateContext<PetVaccineStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petVaccineResource.find().pipe(
            map((PetVaccine: PetVaccineModel[]) => ctx.dispatch(new LoadPetVaccinesSuccess(PetVaccine))),
            catchError((error) => ctx.dispatch(new LoadPetVaccinesFail(error)))
        );
    }

    @Action(LoadPetVaccinesSuccess)
    loadPetVaccinesSuccess(ctx: StateContext<PetVaccineStateModel>, {payload}: LoadPetVaccinesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetVaccinesFail)
    loadPetVaccinesFail(ctx: StateContext<PetVaccineStateModel>, {payload}: LoadPetVaccinesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetVaccinesPet)
    loadPetVaccinesPet(ctx: StateContext<PetVaccineStateModel>, {payload}: LoadPetVaccinesPet) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petVaccineResource.findOne(payload.id).pipe(
            map((PetVaccine: PetVaccineModel[]) => ctx.dispatch(new LoadPetVaccinesPetSuccess(PetVaccine))),
            catchError((error) => ctx.dispatch(new LoadPetVaccinesPetFail(error)))
        );
    }

    @Action(LoadPetVaccinesPetSuccess)
    loadPetVaccinesPetSuccess(ctx: StateContext<PetVaccineStateModel>, {payload}: LoadPetVaccinesPetSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPetVaccinesPetFail)
    loadPetVaccinesPetFail(ctx: StateContext<PetVaccineStateModel>, {payload}: LoadPetVaccinesPetFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePetVaccine)
    createPetVaccine(ctx: StateContext<PetVaccineStateModel>, action: CreatePetVaccine) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petVaccineResource.create(action.payload).pipe(
            map((PetVaccine: PetVaccineModel) => ctx.dispatch(new CreatePetVaccineSuccess(PetVaccine))),
            catchError((error) => ctx.dispatch(new CreatePetVaccineFail(error)))
        );
    }

    @Action(CreatePetVaccineSuccess)
    createPetVaccineSuccess(ctx: StateContext<PetVaccineStateModel>, {payload}: CreatePetVaccineSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Vacina cadastrada com sucesso!');
        ctx.dispatch(new SelectPetVaccine(payload));
        ctx.dispatch(new ClosePetVaccineModal());
    }

    @Action(CreatePetVaccineFail)
    createPetVaccineFail(ctx: StateContext<PetVaccineStateModel>, {payload}: CreatePetVaccineFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePetVaccine)
    updatePetVaccine(ctx: StateContext<PetVaccineStateModel>, action: UpdatePetVaccine) {
        ctx.patchState({isLoading: true});
        return this.petVaccineResource.update(action.payload).pipe(
            map((PetVaccine: PetVaccineModel) => ctx.dispatch(new UpdatePetVaccineSuccess(PetVaccine))),
            catchError((error) => ctx.dispatch(new UpdatePetVaccineFail(error)))
        );
    }

    @Action(UpdatePetVaccineSuccess)
    updatePetVaccineSuccess(ctx: StateContext<PetVaccineStateModel>, {payload}: UpdatePetVaccineSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Vacina atualizada com sucesso!');
        ctx.dispatch(new ClosePetVaccineModal());
    }

    @Action(UpdatePetVaccineFail)
    updatePetVaccineFail(ctx: StateContext<PetVaccineStateModel>, {payload}: UpdatePetVaccineFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePetVaccine)
    deletePetVaccine(ctx: StateContext<PetVaccineStateModel>, action: DeletePetVaccine) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.petVaccineResource.destroy(action.payload).pipe(
            map((PetVaccine: PetVaccineModel) => ctx.dispatch(new DeletePetVaccineSuccess(PetVaccine))),
            catchError((error) => ctx.dispatch(new DeletePetVaccineFail(error)))
        );
    }

    @Action(DeletePetVaccineSuccess)
    deletePetVaccineSuccess(ctx: StateContext<PetVaccineStateModel>, {payload}: DeletePetVaccineSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Vacina excluída com sucesso!');
    }

    @Action(DeletePetVaccineFail)
    deletePetVaccineFail(ctx: StateContext<PetVaccineStateModel>, {payload}: DeletePetVaccineFail) {
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
