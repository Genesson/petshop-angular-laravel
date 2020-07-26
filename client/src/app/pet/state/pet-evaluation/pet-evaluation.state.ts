import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectEvaluation,
    LoadEvaluations,
    LoadEvaluationsSuccess,
    LoadEvaluationsFail,
    CreateEvaluation,
    CreateEvaluationSuccess,
    CreateEvaluationFail,
    UpdateEvaluation,
    UpdateEvaluationSuccess,
    UpdateEvaluationFail,
    DeleteEvaluation,
    DeleteEvaluationSuccess,
    DeleteEvaluationFail
} from './pet-evaluation.actions';
import {ClosePetEvaluationModal} from '../pet-evaluation-modal/pet-evaluation-modal.actions';

import {EvaluationModel} from '../../../shared/models/evaluation.model';

import {EvaluationResource} from '../../../shared/resources/evaluation.resource';

export class PetEvaluationStateModel extends NgxsEntityStateStateModel<EvaluationModel> {
    isLoading: boolean;
}

@State<PetEvaluationStateModel>({
    name: 'evaluation',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class PetEvaluationState {

    @Selector()
    static selected(state: PetEvaluationStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PetEvaluationStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PetEvaluationStateModel) {
        return state.entities;
    }

    constructor(private evaluationResource: EvaluationResource,
                private toastController: ToastController) {
    }

    @Action(SelectEvaluation)
    selectEvaluation(ctx: StateContext<PetEvaluationStateModel>, {payload}: SelectEvaluation) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadEvaluations)
    loadEvaluations(ctx: StateContext<PetEvaluationStateModel>, {payload}: LoadEvaluations) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.evaluationResource.find(payload.id).pipe(
            map((Evaluation: EvaluationModel[]) => ctx.dispatch(new LoadEvaluationsSuccess(Evaluation))),
            catchError((error) => ctx.dispatch(new LoadEvaluationsFail(error)))
        );
    }

    @Action(LoadEvaluationsSuccess)
    loadEvaluationsSuccess(ctx: StateContext<PetEvaluationStateModel>, {payload}: LoadEvaluationsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadEvaluationsFail)
    loadEvaluationsFail(ctx: StateContext<PetEvaluationStateModel>, {payload}: LoadEvaluationsFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateEvaluation)
    createEvaluation(ctx: StateContext<PetEvaluationStateModel>, action: CreateEvaluation) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.evaluationResource.create(action.payload).pipe(
            map((Evaluation: EvaluationModel) => ctx.dispatch(new CreateEvaluationSuccess(Evaluation))),
            catchError((error) => ctx.dispatch(new CreateEvaluationFail(error)))
        );
    }

    @Action(CreateEvaluationSuccess)
    createEvaluationSuccess(ctx: StateContext<PetEvaluationStateModel>, {payload}: CreateEvaluationSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Avaliação cadastrada com sucesso!');
        ctx.dispatch(new SelectEvaluation(payload));
        ctx.dispatch(new ClosePetEvaluationModal());
    }

    @Action(CreateEvaluationFail)
    createEvaluationFail(ctx: StateContext<PetEvaluationStateModel>, {payload}: CreateEvaluationFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateEvaluation)
    updateEvaluation(ctx: StateContext<PetEvaluationStateModel>, action: UpdateEvaluation) {
        ctx.patchState({isLoading: true});
        return this.evaluationResource.update(action.payload).pipe(
            map((Evaluation: EvaluationModel) => ctx.dispatch(new UpdateEvaluationSuccess(Evaluation))),
            catchError((error) => ctx.dispatch(new UpdateEvaluationFail(error)))
        );
    }

    @Action(UpdateEvaluationSuccess)
    updateEvaluationSuccess(ctx: StateContext<PetEvaluationStateModel>, {payload}: UpdateEvaluationSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Avaliação atualizada com sucesso!');
    }

    @Action(UpdateEvaluationFail)
    updateEvaluationFail(ctx: StateContext<PetEvaluationStateModel>, {payload}: UpdateEvaluationFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteEvaluation)
    deleteEvaluation(ctx: StateContext<PetEvaluationStateModel>, action: DeleteEvaluation) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.evaluationResource.destroy(action.payload).pipe(
            map((Evaluation: EvaluationModel) => ctx.dispatch(new DeleteEvaluationSuccess(Evaluation))),
            catchError((error) => ctx.dispatch(new DeleteEvaluationFail(error)))
        );
    }

    @Action(DeleteEvaluationSuccess)
    deleteEvaluationSuccess(ctx: StateContext<PetEvaluationStateModel>, {payload}: DeleteEvaluationSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Avaliação excluída com sucesso!');
    }

    @Action(DeleteEvaluationFail)
    deleteEvaluationFail(ctx: StateContext<PetEvaluationStateModel>, {payload}: DeleteEvaluationFail) {
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
