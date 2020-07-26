import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
  CreatePet,
  CreatePetFail,
  CreatePetSuccess,
  DeletePet,
  DeletePetFail,
  DeletePetSuccess,
  LoadPets,
  LoadPetsFail,
  LoadPetsSuccess,
  LoadPetsTutor,
  LoadPetsTutorFail,
  LoadPetsTutorSuccess,
  ResetPets,
  SelectPet,
  UpdatePet,
  UpdatePetFail,
  UpdatePetSuccess,
  UploadCsvPet,
  UploadCsvPetFail,
  UploadCsvPetSuccess,
  UploadImageCarterPet,
  UploadImageCarterPetFail,
  UploadImageCarterPetSuccess,
  UploadImagePet,
  UploadImagePetFail,
  UploadImagePetSuccess,
} from './pet.actions';
import {ClosePetModal} from '../pet-modal/pet-modal.actions';

import {PetModel} from '../../../shared/models/pet.model';

import {PetResource} from '../../../shared/resources/pet.resource';
import {UserModel} from '../../../shared/models/user.model';

export class PetStateModel extends NgxsEntityStateStateModel<PetModel> {
  image: string;
  imageCarter: string;
  isLoadingImage: boolean;
  isLoadingPetsCsv: boolean;
  isLoadingImageCarter: boolean;
  isLoading: boolean;
}

@State<PetStateModel>({
  name: 'pet',
  defaults: {
    ids: [],
    entities: {},
    selected: null,
    image: null,
    imageCarter: null,
    isLoadingPetsCsv: false,
    isLoadingImage: false,
    isLoadingImageCarter: false,
    isLoading: false,
  },
})
@Injectable()
export class PetState {

  @Selector()
  static isLoadingPetsCsv(state: PetStateModel) {
    return state.isLoadingPetsCsv;
  }

  @Selector()
  static selected(state: PetStateModel) {
    return state.selected;
  }

  @Selector()
  static isLoading(state: PetStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isLoadingImage(state: PetStateModel) {
    return state.isLoadingImage;
  }

  @Selector()
  static isLoadingImageCarter(state: PetStateModel) {
    return state.isLoadingImageCarter;
  }

  @Selector()
  static entities(state: PetStateModel) {
    return state.entities;
  }

  @Selector()
  static image(state: PetStateModel) {
    return state.image;
  }

  @Selector()
  static imageCarter(state: PetStateModel) {
    return state.imageCarter;
  }

  constructor(private petResource: PetResource,
              private toastController: ToastController) {
  }

  @Action(SelectPet)
  selectPet(ctx: StateContext<PetStateModel>, {payload}: SelectPet) {
    NgxsEntityStateAdapter.select(payload, ctx);
  }

  @Action(ResetPets)
  resetPets(ctx: StateContext<PetStateModel>) {
    NgxsEntityStateAdapter.addAll([], ctx);
  }

  @Action(LoadPets)
  loadPets(ctx: StateContext<PetStateModel>) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.petResource.find().pipe(
      map((Pet: PetModel[]) => ctx.dispatch(new LoadPetsSuccess(Pet))),
      catchError((error) => ctx.dispatch(new LoadPetsFail(error))),
    );
  }

  @Action(LoadPetsSuccess)
  loadPetsSuccess(ctx: StateContext<PetStateModel>, {payload}: LoadPetsSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(LoadPetsFail)
  loadPetsFail(ctx: StateContext<PetStateModel>, {payload}: LoadPetsFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(LoadPetsTutor)
  loadPetsTutor(ctx: StateContext<PetStateModel>, {payload}: LoadPetsTutor) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.petResource.findPerTutor(payload).pipe(
      map((Pet: PetModel[]) => ctx.dispatch(new LoadPetsTutorSuccess(Pet))),
      catchError((error) => ctx.dispatch(new LoadPetsTutorFail(error))),
    );
  }

  @Action(LoadPetsTutorSuccess)
  loadPetsTutorSuccess(ctx: StateContext<PetStateModel>, {payload}: LoadPetsTutorSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(LoadPetsTutorFail)
  loadPetsTutorFail(ctx: StateContext<PetStateModel>, {payload}: LoadPetsTutorFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(CreatePet)
  createPet(ctx: StateContext<PetStateModel>, action: CreatePet) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.petResource.create(action.payload).pipe(
      map((Pet: PetModel) => ctx.dispatch(new CreatePetSuccess(Pet))),
      catchError((error) => ctx.dispatch(new CreatePetFail(error))),
    );
  }

  @Action(CreatePetSuccess)
  createPetSuccess(ctx: StateContext<PetStateModel>, {payload}: CreatePetSuccess) {
    NgxsEntityStateAdapter.addOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Pet cadastrado com sucesso!');
    ctx.dispatch(new SelectPet(payload));
    ctx.dispatch(new ClosePetModal());
  }

  @Action(CreatePetFail)
  createPetFail(ctx: StateContext<PetStateModel>, {payload}: CreatePetFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(UpdatePet)
  updatePet(ctx: StateContext<PetStateModel>, action: UpdatePet) {
    ctx.patchState({isLoading: true});
    return this.petResource.update(action.payload).pipe(
      map((Pet: PetModel) => ctx.dispatch(new UpdatePetSuccess(Pet))),
      catchError((error) => ctx.dispatch(new UpdatePetFail(error))),
    );
  }

  @Action(UpdatePetSuccess)
  updatePetSuccess(ctx: StateContext<PetStateModel>, {payload}: UpdatePetSuccess) {
    NgxsEntityStateAdapter.updateOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Pet atualizado com sucesso!');
    ctx.dispatch(new ClosePetModal());
  }

  @Action(UpdatePetFail)
  updatePetFail(ctx: StateContext<PetStateModel>, {payload}: UpdatePetFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(DeletePet)
  deletePet(ctx: StateContext<PetStateModel>, action: DeletePet) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.petResource.destroy(action.payload).pipe(
      map((Pet: PetModel) => ctx.dispatch(new DeletePetSuccess(Pet))),
      catchError((error) => ctx.dispatch(new DeletePetFail(error))),
    );
  }

  @Action(DeletePetSuccess)
  deletePetSuccess(ctx: StateContext<PetStateModel>, {payload}: DeletePetSuccess) {
    NgxsEntityStateAdapter.removeOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Pet excluído com sucesso!');
  }

  @Action(DeletePetFail)
  deletePetFail(ctx: StateContext<PetStateModel>, {payload}: DeletePetFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(UploadImagePet)
  uploadImagePet(ctx: StateContext<PetStateModel>, action: UploadImagePet) {
    ctx.patchState({isLoadingImage: true});
    return this.petResource.uploadImage(action.payload).pipe(
      map((image: any) => ctx.dispatch(new UploadImagePetSuccess(image))),
      catchError((error) => ctx.dispatch(new UploadImagePetFail(error))),
    );
  }

  @Action(UploadImagePetSuccess)
  uploadImagePetSuccess(ctx: StateContext<PetStateModel>, {payload}: UploadImagePetSuccess) {
    ctx.patchState({image: payload});
    ctx.patchState({isLoadingImage: false});
  }

  @Action(UploadImagePetFail)
  uploadImagePetFail(ctx: StateContext<PetStateModel>, {payload}: UploadImagePetFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingImage: false});
  }

  @Action(UploadImageCarterPet)
  uploadImageCarterPet(ctx: StateContext<PetStateModel>, action: UploadImageCarterPet) {
    ctx.patchState({isLoadingImageCarter: true});
    return this.petResource.uploadImage(action.payload).pipe(
      map((imageCarter: any) => ctx.dispatch(new UploadImageCarterPetSuccess(imageCarter))),
      catchError((error) => ctx.dispatch(new UploadImageCarterPetFail(error))),
    );
  }

  @Action(UploadImageCarterPetSuccess)
  uploadImageCarterPetSuccess(ctx: StateContext<PetStateModel>, {payload}: UploadImageCarterPetSuccess) {
    ctx.patchState({imageCarter: payload});
    ctx.patchState({isLoadingImageCarter: false});
  }

  @Action(UploadImageCarterPetFail)
  uploadImageCarterPetFail(ctx: StateContext<PetStateModel>, {payload}: UploadImageCarterPetFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingImageCarter: false});
  }

  async presentToast(msg, type: string = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: type,
    });
    toast.present();
  }

  @Action(UploadCsvPet)
  uploadCsvPet(ctx: StateContext<PetStateModel>, action: UploadCsvPet) {
    ctx.patchState({isLoadingPetsCsv: true});
    return this.petResource.uploadPetCsv(action.payload).pipe(
      map((Tutor: UserModel[]) => ctx.dispatch(new UploadCsvPetSuccess(Tutor))),
      catchError((error) => ctx.dispatch(new UploadCsvPetFail(error))),
    );
  }

  @Action(UploadCsvPetSuccess)
  uploadCsvPetSuccess(ctx: StateContext<PetStateModel>, {payload}: UploadCsvPetSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    ctx.patchState({isLoadingPetsCsv: false});
    this.presentToast('Importação finalizada com sucesso!');
  }

  @Action(UploadCsvPetFail)
  uploadCsvPetFail(ctx: StateContext<PetStateModel>, {payload}: UploadCsvPetFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingPetsCsv: false});
  }
}
