import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
  CreateTutor,
  CreateTutorFail,
  CreateTutorSuccess,
  DeleteTutor,
  DeleteTutorFail,
  DeleteTutorSuccess,
  LoadNextPageTutor,
  LoadTutors,
  LoadTutorsFail,
  LoadTutorsSuccess,
  SelectTutor,
  UpdateTutor,
  UpdateTutorFail,
  UpdateTutorSuccess,
  UploadCsvContact,
  UploadCsvContactFail,
  UploadCsvContactSuccess,
  UploadCsvTutor,
  UploadCsvTutorFail,
  UploadCsvTutorSuccess,
  UploadImageTutor,
  UploadImageTutorFail,
  UploadImageTutorSuccess,
} from './tutor.actions';
import {CloseTutorModal} from '../tutor-modal/tutor-modal.actions';
import {CloseResponsibleModal} from '../responsible-modal/responsible-modal.actions';
import {CloseTutorViewModal, OpenTutorViewModal} from '../tutor-view-modal/tutor-view-modal.actions';

import {UserModel} from '../../../shared/models/user.model';

import {UserResource} from '../../../shared/resources/user.resource';

export class ContactStateModel extends NgxsEntityStateStateModel<any> {
  image: string;
  csv: string;
  isLoadingImage: boolean;
  isLoadingContactsCsv: boolean;
  isLoadingCsv: boolean;
  isLoading: boolean;
}

export class TutorStateModel extends NgxsEntityStateStateModel<UserModel> {
  image: string;
  csv: string;
  isLoadingImage: boolean;
  isLoadingCsv: boolean;
  isLoading: boolean;
  paginator: {
    first_page_url: number,
    prev_page_url: number,
    current_page: number,
    next_page_url: number,
    from: number,
    per_page: number,
    to: number
  };
}

@State<TutorStateModel>({
  name: 'tutor',
  defaults: {
    ids: [],
    entities: {},
    selected: null,
    image: null,
    csv: null,
    isLoadingImage: false,
    isLoadingCsv: false,
    isLoading: false,
    paginator: {
      first_page_url: null,
      prev_page_url: null,
      current_page: null,
      next_page_url: null,
      from: null,
      per_page: null,
      to: null
    }
  },
})

@Injectable()
export class TutorState {

  @Selector()
  static selected(state: TutorStateModel) {
    return state.entities[state.selected.id];
  }

  @Selector()
  static isLoading(state: TutorStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isLoadingImage(state: TutorStateModel) {
    return state.isLoadingImage;
  }

  @Selector()
  static isLoadingCsv(state: TutorStateModel) {
    return state.isLoadingCsv;
  }

  @Selector()
  static isLoadingContactsCsv(state: ContactStateModel) {
    return state.isLoadingContactsCsv;
  }

  @Selector()
  static entities(state: TutorStateModel) {
    return state.entities;
  }

  @Selector()
  static image(state: TutorStateModel) {
    return state.image;
  }

  @Selector()
  static csv(state: TutorStateModel) {
    return state.csv;
  }

  @Selector()
  static paginator(state: TutorStateModel) {
    return state.paginator;
  }

  constructor(private userResource: UserResource,
              private toastController: ToastController) {
  }

  @Action(SelectTutor)
  selectTutor(ctx: StateContext<TutorStateModel>, {payload}: SelectTutor) {
    NgxsEntityStateAdapter.select(payload, ctx);
  }

  @Action(LoadTutors)
  loadTutors(ctx: StateContext<TutorStateModel>, { payload }: any) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.userResource.find(payload).pipe(
      map((Tutor) => ctx.dispatch(new LoadTutorsSuccess(Tutor))),
      catchError((error) => ctx.dispatch(new LoadTutorsFail(error))),
    );
  }

  @Action(LoadTutorsSuccess)
  loadTutorsSuccess(ctx: StateContext<TutorStateModel>, {payload}: LoadTutorsSuccess) {
    ctx.patchState({
      paginator: {
        first_page_url: (payload.first_page_url) ?
          Number(payload.first_page_url.replace('https://api.kando-so.com.br/api/users?page=', '')) : null,
        prev_page_url: (payload.prev_page_url) ?
          Number(payload.prev_page_url.replace('https://api.kando-so.com.br/api/users?page=', '')) : null,
        current_page: payload.current_page,
        next_page_url: (payload.next_page_url) ?
          Number(payload.next_page_url.replace('https://api.kando-so.com.br/api/users?page=', '')) : null,
        from: payload.from,
        per_page: payload.per_page,
        to: payload.to
      }
    });
    NgxsEntityStateAdapter.addAll(payload.data, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(LoadTutorsFail)
  loadTutorsFail(ctx: StateContext<TutorStateModel>, {payload}: LoadTutorsFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(LoadNextPageTutor)
  loadNextPageTutor(ctx: StateContext<TutorStateModel>, {payload}: LoadNextPageTutor) {
    return this.userResource.loadNextPageTutor(payload.skip, payload.termo).pipe(
      map((Tutor) => ctx.dispatch(new LoadTutorsSuccess(Tutor))),
      catchError((error) => ctx.dispatch(new LoadTutorsFail(error))),
    );
  }

  @Action(CreateTutor)
  createTutor(ctx: StateContext<TutorStateModel>, action: CreateTutor) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.userResource.create(action.payload).pipe(
      map((Tutor: UserModel) => ctx.dispatch(new CreateTutorSuccess(Tutor))),
      catchError((error) => ctx.dispatch(new CreateTutorFail(error))),
    );
  }

  @Action(CreateTutorSuccess)
  createTutorSuccess(ctx: StateContext<TutorStateModel>, {payload}: CreateTutorSuccess) {
    NgxsEntityStateAdapter.addOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Tutor cadastrado com sucesso!');
    ctx.dispatch(new CloseTutorModal());
  }

  @Action(CreateTutorFail)
  createTutorFail(ctx: StateContext<TutorStateModel>, {payload}: CreateTutorFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(UpdateTutor)
  updateTutor(ctx: StateContext<TutorStateModel>, action: UpdateTutor) {
    ctx.patchState({isLoading: true});
    return this.userResource.update(action.payload).pipe(
      map((Tutor: UserModel) => ctx.dispatch(new UpdateTutorSuccess(Tutor))),
      catchError((error) => ctx.dispatch(new UpdateTutorFail(error))),
    );
  }

  @Action(UpdateTutorSuccess)
  updateTutorSuccess(ctx: StateContext<TutorStateModel>, {payload}: UpdateTutorSuccess) {
    NgxsEntityStateAdapter.updateOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Tutor atualizado com sucesso!');
    ctx.dispatch(new CloseTutorModal());
    ctx.dispatch(new CloseResponsibleModal());
    ctx.dispatch(new CloseTutorViewModal());
    ctx.dispatch(new OpenTutorViewModal(payload));
  }

  @Action(UpdateTutorFail)
  updateTutorFail(ctx: StateContext<TutorStateModel>, {payload}: UpdateTutorFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(DeleteTutor)
  deleteTutor(ctx: StateContext<TutorStateModel>, action: DeleteTutor) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.userResource.destroy(action.payload).pipe(
      map((Tutor: UserModel) => ctx.dispatch(new DeleteTutorSuccess(Tutor))),
      catchError((error) => ctx.dispatch(new DeleteTutorFail(error))),
    );
  }

  @Action(DeleteTutorSuccess)
  deleteTutorSuccess(ctx: StateContext<TutorStateModel>, {payload}: DeleteTutorSuccess) {
    NgxsEntityStateAdapter.removeOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Tutor excluído com sucesso!');
  }

  @Action(DeleteTutorFail)
  deleteTutorFail(ctx: StateContext<TutorStateModel>, {payload}: DeleteTutorFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(UploadImageTutor)
  uploadImageTutor(ctx: StateContext<TutorStateModel>, action: UploadImageTutor) {
    ctx.patchState({isLoadingImage: true});
    return this.userResource.uploadImage(action.payload).pipe(
      map((image: any) => ctx.dispatch(new UploadImageTutorSuccess(image))),
      catchError((error) => ctx.dispatch(new UploadImageTutorFail(error))),
    );
  }

  @Action(UploadImageTutorSuccess)
  uploadImageTutorSuccess(ctx: StateContext<TutorStateModel>, {payload}: UploadImageTutorSuccess) {
    ctx.patchState({image: payload});
    ctx.patchState({isLoadingImage: false});
  }

  @Action(UploadImageTutorFail)
  uploadImageTutorFail(ctx: StateContext<TutorStateModel>, {payload}: UploadImageTutorFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingImage: false});
  }

  @Action(UploadCsvContact)
  uploadCsvContact(ctx: StateContext<ContactStateModel>, action: UploadCsvContact) {
    ctx.patchState({isLoadingContactsCsv: true});
    return this.userResource.uploadContactCsv(action.payload).pipe(
      map((Tutor: UserModel[]) => ctx.dispatch(new UploadCsvContactSuccess(Tutor))),
      catchError((error) => ctx.dispatch(new UploadCsvContactFail(error))),
    );
  }

  @Action(UploadCsvContactSuccess)
  uploadCsvContactSuccess(ctx: StateContext<ContactStateModel>, {payload}: UploadCsvContactSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    ctx.patchState({isLoadingContactsCsv: false});
    this.presentToast('Importação finalizada com sucesso!');
  }

  @Action(UploadCsvContactFail)
  uploadCsvContactFail(ctx: StateContext<ContactStateModel>, {payload}: UploadCsvContactFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingContactsCsv: false});
  }

  @Action(UploadCsvTutor)
  uploadCsvTutor(ctx: StateContext<TutorStateModel>, action: UploadCsvTutor) {
    ctx.patchState({isLoadingCsv: true});
    return this.userResource.uploadCsv(action.payload).pipe(
      map((Tutor: UserModel[]) => ctx.dispatch(new UploadCsvTutorSuccess(Tutor))),
      catchError((error) => ctx.dispatch(new UploadCsvTutorFail(error))),
    );
  }

  @Action(UploadCsvTutorSuccess)
  uploadCsvTutorSuccess(ctx: StateContext<TutorStateModel>, {payload}: UploadCsvTutorSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    ctx.patchState({isLoadingCsv: false});
    this.presentToast('Importação finalizada com sucesso!');
  }

  @Action(UploadCsvTutorFail)
  uploadCsvTutorFail(ctx: StateContext<TutorStateModel>, {payload}: UploadCsvTutorFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingCsv: false});
  }

  async presentToast(msg, type: string = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: type,
    });
    toast.present();
  }
}
