import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectSchedule,
    SelectAllSchedule,
    LoadSchedules,
    LoadSchedulesByService,
    LoadSchedulesSuccess,
    LoadSchedulesFail,
    LoadDaycare,
    LoadDaycareSuccess,
    LoadDaycareFail,
    CreateSchedule,
    CreateScheduleSuccess,
    CreateScheduleFail,
    UpdateSchedule,
    UpdateScheduleSuccess,
    UpdateScheduleFail,
    UpdateScheduleAll,
    UpdateScheduleAllSuccess,
    UpdateScheduleAllFail,
    UpdateScheduleDaycare,
    UpdateScheduleDaycareSuccess,
    UpdateScheduleDaycareFail,
    FinishedSchedule,
    FinishedScheduleSuccess,
    FinishedScheduleFail,
    DeleteSchedule,
    DeleteScheduleSuccess,
    DeleteScheduleFail,
    DeleteScheduleDaycare,
    DeleteScheduleDaycareSuccess,
    DeleteScheduleDaycareFail
} from './schedule.actions';
import {AddItem} from '../../../cart/state/order/order.actions';
import {ClosePetScheduleModal} from '../../../pet/state/pet-schedule-modal/pet-schedule-modal.actions';
import {OpenPetCartModal} from '../../../pet/state/pet-cart-modal/pet-cart-modal.actions';
import {CloseDaycareCreateModal} from '../../../pet/state/daycare-create-modal/daycare-create-modal.actions';
import {CloseModuleHotelModal} from '../../../pet/state/module-hotel-modal/module-hotel-modal.actions';
import {CloseServicePetSitterModal} from '../../../pet/state/service-pet-sitter-modal/service-pet-sitter-modal.actions';
import {ClosePetOtherModal} from '../../../pet/state/pet-other-modal/pet-other-modal.actions';
import {ClosePetServiceModal} from '../../../pet/state/pet-service-modal/pet-service-modal.actions';

import {ScheduleModel} from '../../../shared/models/schedule.model';

import {ScheduleResource} from '../../../shared/resources/schedule.resource';

export class ScheduleStateModel extends NgxsEntityStateStateModel<ScheduleModel> {
  isLoading: boolean;
  isCheck: boolean;
}

@State<ScheduleStateModel>({
  name: 'schedule',
  defaults: {
    ids: [],
    entities: {},
    selected: null,
    isLoading: false,
    isCheck: false
  }
})
@Injectable()
export class ScheduleState {

    @Selector()
    static selected(state: ScheduleStateModel) {
      return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: ScheduleStateModel) {
      return state.isLoading;
    }

    @Selector()
    static isCheck(state: ScheduleStateModel) {
      return state.isCheck;
    }

    @Selector()
    static entities(state: ScheduleStateModel) {
      return state.entities;
    }

    constructor(private scheduleResource: ScheduleResource,
                private toastController: ToastController) {
    }

    @Action(SelectSchedule)
    selectSchedule(ctx: StateContext<ScheduleStateModel>, {payload}: SelectSchedule) {
      ctx.patchState({
        entities: {
          ...ctx.getState().entities,
          [payload['id']]: {
            ...payload, check: !payload.check
          }
        }
      });
      NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(SelectAllSchedule)
    selectAllSchedule(ctx: StateContext<ScheduleStateModel>, {payload}: SelectAllSchedule) {
      payload.forEach(value => {
        ctx.patchState({
          entities: {
            ...ctx.getState().entities,
            [value['id']]: {
              ...value, check: !ctx.getState().isCheck
            }
          }
        });
      });
      ctx.patchState({isCheck: !ctx.getState().isCheck});
    }

    @Action(LoadSchedules)
    loadSchedules(ctx: StateContext<ScheduleStateModel>) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.scheduleResource.find().pipe(
        map((Schedule: ScheduleModel[]) => ctx.dispatch(new LoadSchedulesSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new LoadSchedulesFail(error)))
      );
    }

    @Action(LoadSchedulesByService)
    loadSchedulesByService(ctx: StateContext<ScheduleStateModel>, { payload }: LoadSchedulesByService) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.scheduleResource.findByService(payload).pipe(
        map((Schedule: ScheduleModel[]) => ctx.dispatch(new LoadSchedulesSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new LoadSchedulesFail(error)))
      );
    }

    @Action(LoadSchedulesSuccess)
    loadSchedulesSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: LoadSchedulesSuccess) {
      NgxsEntityStateAdapter.addAll(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadSchedulesFail)
    loadSchedulesFail(ctx: StateContext<ScheduleStateModel>, {payload}: LoadSchedulesFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDaycare)
    loadDaycare(ctx: StateContext<ScheduleStateModel>) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.scheduleResource.findDaycare().pipe(
        map((Schedule: ScheduleModel[]) => ctx.dispatch(new LoadDaycareSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new LoadDaycareFail(error)))
      );
    }

    @Action(LoadDaycareSuccess)
    loadDaycareSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: LoadDaycareSuccess) {
      NgxsEntityStateAdapter.addAll(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDaycareFail)
    loadDaycareFail(ctx: StateContext<ScheduleStateModel>, {payload}: LoadDaycareFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateSchedule)
    createSchedule(ctx: StateContext<ScheduleStateModel>, action: CreateSchedule) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.scheduleResource.create(action.payload).pipe(
        map((Schedule: ScheduleModel) => ctx.dispatch(new CreateScheduleSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new CreateScheduleFail(error)))
      );
    }

    @Action(CreateScheduleSuccess)
    createScheduleSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: CreateScheduleSuccess) {
      NgxsEntityStateAdapter.addOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Agendamento do serviço realizado com sucesso!');
      ctx.dispatch(
        new AddItem({
          quantity: 1,
          item: payload.service,
          pet: payload.pet,
          schedule: payload.id,
        })
      );
      ctx.dispatch(new OpenPetCartModal());
      ctx.dispatch(new SelectSchedule(payload));
      ctx.dispatch(new CloseModuleHotelModal());
      ctx.dispatch(new ClosePetScheduleModal());
      ctx.dispatch(new CloseDaycareCreateModal());
      ctx.dispatch(new CloseServicePetSitterModal());
      ctx.dispatch(new ClosePetOtherModal());
      ctx.dispatch(new ClosePetServiceModal());
    }

    @Action(CreateScheduleFail)
    createScheduleFail(ctx: StateContext<ScheduleStateModel>, {payload}: CreateScheduleFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateSchedule)
    updateSchedule(ctx: StateContext<ScheduleStateModel>, action: UpdateSchedule) {
      ctx.patchState({isLoading: true});
      return this.scheduleResource.update(action.payload).pipe(
        map((Schedule: ScheduleModel) => ctx.dispatch(new UpdateScheduleSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new UpdateScheduleFail(error)))
      );
    }

    @Action(UpdateScheduleSuccess)
    updateScheduleSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: UpdateScheduleSuccess) {
      NgxsEntityStateAdapter.updateOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Agendamento do serviço atualizado com sucesso!');
      ctx.dispatch(new ClosePetScheduleModal());
      ctx.dispatch(new CloseDaycareCreateModal());
    }

    @Action(UpdateScheduleFail)
    updateScheduleFail(ctx: StateContext<ScheduleStateModel>, {payload}: UpdateScheduleFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateScheduleAll)
    updateScheduleAll(ctx: StateContext<ScheduleStateModel>, action: UpdateScheduleAll) {
      ctx.patchState({isLoading: true});
      return this.scheduleResource.updateAll(action.payload).pipe(
        map((Schedule: ScheduleModel[]) => ctx.dispatch(new UpdateScheduleAllSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new UpdateScheduleAllFail(error)))
      );
    }

    @Action(UpdateScheduleAllSuccess)
    updateScheduleAllSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: UpdateScheduleAllSuccess) {
      NgxsEntityStateAdapter.addAll(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Atualizado com sucesso!');
    }

    @Action(UpdateScheduleAllFail)
    updateScheduleAllFail(ctx: StateContext<ScheduleStateModel>, {payload}: UpdateScheduleAllFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateScheduleDaycare)
    updateDaycare(ctx: StateContext<ScheduleStateModel>, action: UpdateScheduleDaycare) {
      ctx.patchState({isLoading: true});
      return this.scheduleResource.updateDaycare(action.payload).pipe(
        map((Schedule: ScheduleModel) => ctx.dispatch(new UpdateScheduleDaycareSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new UpdateScheduleDaycareFail(error)))
      );
    }

    @Action(UpdateScheduleDaycareSuccess)
    updateDaycareSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: UpdateScheduleDaycareSuccess) {
      NgxsEntityStateAdapter.updateOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Atualizado com sucesso!');
    }

    @Action(UpdateScheduleDaycareFail)
    updateDaycareFail(ctx: StateContext<ScheduleStateModel>, {payload}: UpdateScheduleDaycareFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(FinishedSchedule)
    finishedSchedule(ctx: StateContext<ScheduleStateModel>, action: FinishedSchedule) {
      ctx.patchState({isLoading: true});
      return this.scheduleResource.finished(action.payload.id).pipe(
        map((Schedule: ScheduleModel) => ctx.dispatch(new FinishedScheduleSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new UpdateScheduleFail(error)))
      );
    }

    @Action(FinishedScheduleSuccess)
    finishedScheduleSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: FinishedScheduleSuccess) {
      NgxsEntityStateAdapter.updateOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Serviço atualizado com sucesso!');
    }

    @Action(FinishedScheduleFail)
    finishedScheduleFail(ctx: StateContext<ScheduleStateModel>, {payload}: FinishedScheduleFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteSchedule)
    deleteSchedule(ctx: StateContext<ScheduleStateModel>, action: DeleteSchedule) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.scheduleResource.destroy(action.payload).pipe(
        map((Schedule: ScheduleModel) => ctx.dispatch(new DeleteScheduleSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new DeleteScheduleFail(error)))
      );
    }

    @Action(DeleteScheduleSuccess)
    deleteScheduleSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: DeleteScheduleSuccess) {
      NgxsEntityStateAdapter.removeOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Agendamento do serviço excluído com sucesso!');
    }

    @Action(DeleteScheduleFail)
    deleteScheduleFail(ctx: StateContext<ScheduleStateModel>, {payload}: DeleteScheduleFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteScheduleDaycare)
    deleteScheduleDaycare(ctx: StateContext<ScheduleStateModel>, action: DeleteScheduleDaycare) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.scheduleResource.destroyDaycare(action.payload).pipe(
        map((Schedule: ScheduleModel) => ctx.dispatch(new DeleteScheduleDaycareSuccess(Schedule))),
        catchError((error) => ctx.dispatch(new DeleteScheduleDaycareFail(error)))
      );
    }

    @Action(DeleteScheduleDaycareSuccess)
    deleteScheduleDaycareSuccess(ctx: StateContext<ScheduleStateModel>, {payload}: DeleteScheduleDaycareSuccess) {
      NgxsEntityStateAdapter.removeOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Excluído com sucesso!');
    }

    @Action(DeleteScheduleDaycareFail)
    deleteScheduleDaycareFail(ctx: StateContext<ScheduleStateModel>, {payload}: DeleteScheduleFail) {
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
