import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectBehavior,
    LoadBehaviors,
    LoadBehaviorsFail,
    LoadBehaviorsSuccess,
    CreateBehavior,
    CreateBehaviorFail,
    CreateBehaviorSuccess,
    UpdateBehavior,
    UpdateBehaviorFail,
    UpdateBehaviorSuccess,
    DeleteBehavior,
    DeleteBehaviorFail,
    DeleteBehaviorSuccess
} from './behavior.actions';
import {CloseBehaviorModal} from '../behavior-modal/behavior-modal.actions';

import {BehaviorModel} from '../../../shared/models/behavior.model';

import {BehaviorResource} from '../../../shared/resources/behavior.resource';

export class BehaviorStateModel extends NgxsEntityStateStateModel<BehaviorModel> {
    isLoading: boolean;
}

@State<BehaviorStateModel>({
    name: 'behavior',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class BehaviorState {

    @Selector()
    static selected(state: BehaviorStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: BehaviorStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: BehaviorStateModel) {
        return state.entities;
    }

    constructor(private behaviorResource: BehaviorResource,
                private toastController: ToastController) {
    }

    @Action(SelectBehavior)
    selectBehavior(ctx: StateContext<BehaviorStateModel>, {payload}: SelectBehavior) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadBehaviors)
    loadBehaviors(ctx: StateContext<BehaviorStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.behaviorResource.find().pipe(
            map((Unity: BehaviorModel[]) => ctx.dispatch(new LoadBehaviorsSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadBehaviorsFail(error)))
        );
    }

    @Action(LoadBehaviorsSuccess)
    loadBehaviorsSuccess(ctx: StateContext<BehaviorStateModel>, {payload}: LoadBehaviorsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadBehaviorsFail)
    loadBehaviorsFail(ctx: StateContext<BehaviorStateModel>, {payload}: LoadBehaviorsFail) {
        console.warn(`Occorreu um erro ao carregar os comportamentos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateBehavior)
    createBehavior(ctx: StateContext<BehaviorStateModel>, action: CreateBehavior) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.behaviorResource.create(action.payload).pipe(
            map((Behavior: BehaviorModel) => ctx.dispatch(new CreateBehaviorSuccess(Behavior))),
            catchError((error) => ctx.dispatch(new CreateBehaviorFail(error)))
        );
    }

    @Action(CreateBehaviorSuccess)
    createBehaviorSuccess(ctx: StateContext<BehaviorStateModel>, {payload}: CreateBehaviorSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Comportamento cadastrado com sucesso!');
        ctx.dispatch(new SelectBehavior(payload));
        ctx.dispatch(new CloseBehaviorModal());
    }

    @Action(CreateBehaviorFail)
    createBehaviorFail(ctx: StateContext<BehaviorStateModel>, {payload}: CreateBehaviorFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateBehavior)
    updateBehavior(ctx: StateContext<BehaviorStateModel>, action: UpdateBehavior) {
        ctx.patchState({isLoading: true});
        return this.behaviorResource.update(action.payload).pipe(
            map((Behavior: BehaviorModel) => ctx.dispatch(new UpdateBehaviorSuccess(Behavior))),
            catchError((error) => ctx.dispatch(new UpdateBehaviorFail(error)))
        );
    }

    @Action(UpdateBehaviorSuccess)
    updateBehaviorSuccess(ctx: StateContext<BehaviorStateModel>, {payload}: UpdateBehaviorSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Comportamento atualizado com sucesso!');
        ctx.dispatch(new CloseBehaviorModal());
    }

    @Action(UpdateBehaviorFail)
    updateBehaviorFail(ctx: StateContext<BehaviorStateModel>, {payload}: UpdateBehaviorFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteBehavior)
    deleteBehavior(ctx: StateContext<BehaviorStateModel>, action: DeleteBehavior) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.behaviorResource.destroy(action.payload).pipe(
            map((Behavior: BehaviorModel) => ctx.dispatch(new DeleteBehaviorSuccess(Behavior))),
            catchError((error) => ctx.dispatch(new DeleteBehaviorFail(error)))
        );
    }

    @Action(DeleteBehaviorSuccess)
    deleteBehaviorSuccess(ctx: StateContext<BehaviorStateModel>, {payload}: DeleteBehaviorSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Comportamento excluído com sucesso!');
    }

    @Action(DeleteBehaviorFail)
    deleteBehaviorFail(ctx: StateContext<BehaviorStateModel>, {payload}: DeleteBehaviorFail) {
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
