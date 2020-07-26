import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {TutorSelectors} from './state/tutor/tutor.selectors';

import {UserModel} from '../shared/models/user.model';

import {
  CreateTutor,
  DeleteTutor,
  LoadNextPageTutor,
  LoadTutors,
  SelectTutor,
  UpdateTutor,
  UploadCsvContact,
  UploadCsvTutor,
  UploadImageTutor,
} from './state/tutor/tutor.actions';
import {CloseTutorModal, OpenTutorModal} from './state/tutor-modal/tutor-modal.actions';
import {CloseTutorViewModal, OpenTutorViewModal} from './state/tutor-view-modal/tutor-view-modal.actions';
import {CloseResponsibleModal, OpenResponsibleModal} from './state/responsible-modal/responsible-modal.actions';

@Injectable({
  providedIn: 'root',
})
export class TutorSandbox {

  @Select(TutorSelectors.entities) tutorsCollection$: Observable<UserModel[]>;

  @Select(TutorSelectors.selected) tutorSelected$: Observable<UserModel>;

  @Select(TutorSelectors.image) imageTutor$: Observable<string>;

  @Select(TutorSelectors.csv) csvTutor$: Observable<string>;

  @Select(TutorSelectors.isLoading) isLoadingTutor$: Observable<boolean>;

  @Select(TutorSelectors.isLoadingImage) isLoadingImageTutor$: Observable<boolean>;

  @Select(TutorSelectors.isLoadingCsv) isLoadingCsvTutor$: Observable<boolean>;

  @Select(TutorSelectors.isLoadingContactsCsv) isLoadingCsvContact$: Observable<boolean>;

  @Select(TutorSelectors.paginator) paginator$: Observable<any>;

  constructor(private store: Store) {
  }

  public selectTutor(tutor: UserModel) {
    this.store.dispatch(new SelectTutor(tutor));
  }

  public loadTutors(page: number) {
    this.store.dispatch(new LoadTutors(page));
  }

  public loadNextPage(skip: number, termo?: string) {
    this.store.dispatch(new LoadNextPageTutor({skip, termo}));
  }

  public createTutor(tutor: UserModel) {
    this.store.dispatch(new CreateTutor(tutor));
  }

  public updateTutor(tutor: UserModel) {
    this.store.dispatch(new UpdateTutor(tutor));
  }

  public deleteTutor(tutor: UserModel) {
    this.store.dispatch(new DeleteTutor(tutor));
  }

  public uploadImageTutor(image: FormData) {
    this.store.dispatch(new UploadImageTutor(image));
  }

  public uploadCsvTutor(csv: FormData) {
    this.store.dispatch(new UploadCsvTutor(csv));
  }

  public uploadCsvContact(csv: FormData) {
    this.store.dispatch(new UploadCsvContact(csv));
  }

  public openModal(editing, data?) {
    this.store.dispatch(new OpenTutorModal({editing, data}));
  }

  public closeModal() {
    this.store.dispatch(new CloseTutorModal());
  }

  public openTutorViewModal(data) {
    this.store.dispatch(new OpenTutorViewModal(data));
  }

  public closeTutorViewModal() {
    this.store.dispatch(new CloseTutorViewModal());
  }

  public openResponsibleModal(data) {
    this.store.dispatch(new OpenResponsibleModal(data));
  }

  public closeResponsibleModal() {
    this.store.dispatch(new CloseResponsibleModal());
  }

}
