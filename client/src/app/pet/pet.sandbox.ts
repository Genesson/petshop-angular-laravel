import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {PetSelectors} from './state/pet/pet.selectors';
import {TutorSelectors} from '../tutor/state/tutor/tutor.selectors';
import {PetEvaluationSelectors} from './state/pet-evaluation/pet-evaluation.selectors';
import {ModuleHotelSelectors} from './state/module-hotel/module-hotel.selectors';
import {PetPackageSelectors} from './state/pet-package/pet-package.selectors';
import {PetDiseaseSelectors} from './state/pet-disease/pet-disease.selectors';
import {PetMedicineSelectors} from './state/pet-medicine/pet-medicine.selectors';
import {PetVaccineSelectors} from './state/pet-vaccine/pet-vaccine.selectors';

import {PetModel} from '../shared/models/pet.model';
import {EvaluationModel} from '../shared/models/evaluation.model';
import {DailyModel} from '../shared/models/daily.model';
import {PetPackageModel} from '../shared/models/pet-package.model';
import {PetDiseaseModel} from '../shared/models/pet-disease.model';
import {PetMedicineModel} from '../shared/models/pet-medicine.model';
import {PetVaccineModel} from '../shared/models/pet-vaccine.model';

import {
  CreatePet,
  DeletePet,
  LoadPets,
  LoadPetsTutor,
  ResetPets,
  SelectPet,
  UpdatePet, UploadCsvPet,
  UploadImageCarterPet,
  UploadImagePet,
} from './state/pet/pet.actions';
import {
  CreateEvaluation,
  DeleteEvaluation,
  LoadEvaluations,
  SelectEvaluation,
  UpdateEvaluation,
} from './state/pet-evaluation/pet-evaluation.actions';
import {
  CreatePetPackage,
  DateIntervalsPetPackage,
  DeletePetPackage,
  LoadPetPackages,
  SelectPetPackage,
  UpdatePetPackage,
} from './state/pet-package/pet-package.actions';
import {
  CreatePetDisease,
  DeletePetDisease,
  LoadPetDiseases,
  SelectPetDisease,
  UpdatePetDisease,
} from './state/pet-disease/pet-disease.actions';
import {
  CreatePetMedicine,
  DeletePetMedicine,
  LoadPetMedicines,
  SelectPetMedicine,
  UpdatePetMedicine,
} from './state/pet-medicine/pet-medicine.actions';
import {
  CreatePetVaccine,
  DeletePetVaccine,
  LoadPetVaccines,
  LoadPetVaccinesPet,
  SelectPetVaccine,
  UpdatePetVaccine,
} from './state/pet-vaccine/pet-vaccine.actions';
import {ClosePetModal, OpenPetModal} from './state/pet-modal/pet-modal.actions';
import {ClosePetServiceModal, OpenPetServiceModal} from './state/pet-service-modal/pet-service-modal.actions';
import {ClosePetProfileModal, OpenPetProfileModal} from './state/pet-profile-modal/pet-profile-modal.actions';
import {ClosePetEvaluationModal, OpenPetEvaluationModal} from './state/pet-evaluation-modal/pet-evaluation-modal.actions';
import {
  ClosePetEvaluationInfoModal,
  OpenPetEvaluationInfoModal,
} from './state/pet-evaluation-info-modal/pet-evaluation-info-modal.actions';
import {CloseModuleHotelModal, OpenModuleHotelModal} from './state/module-hotel-modal/module-hotel-modal.actions';
import {CloseServicePetSitterModal, OpenServicePetSitterModal} from './state/service-pet-sitter-modal/service-pet-sitter-modal.actions';
import {ClosePetSpaModal, OpenPetSpaModal} from './state/pet-spa-modal/pet-spa-modal.actions';
import {ClosePetOtherModal, OpenPetOtherModal} from './state/pet-other-modal/pet-other-modal.actions';
import {ClosePetScheduleModal, OpenPetScheduleModal} from './state/pet-schedule-modal/pet-schedule-modal.actions';
import {ClosePetCartModal, OpenPetCartModal} from './state/pet-cart-modal/pet-cart-modal.actions';
import {CloseDaycareCreateModal, OpenDaycareCreateModal} from './state/daycare-create-modal/daycare-create-modal.actions';
import {ClosePetDiseaseModal, OpenPetDiseaseModal} from './state/pet-disease-modal/pet-disease-modal.actions';
import {ClosePetMedicineModal, OpenPetMedicineModal} from './state/pet-medicine-modal/pet-medicine-modal.actions';
import {ClosePetVaccineModal, OpenPetVaccineModal} from './state/pet-vaccine-modal/pet-vaccine-modal.actions';
import {LoadDailyCalculation} from './state/module-hotel/module-hotel.actions';

@Injectable({
  providedIn: 'root',
})
export class PetSandbox {
  @Select(PetSelectors.entities) petsCollection$: Observable<PetModel[]>;

  @Select(PetSelectors.selected) petSelected$: Observable<PetModel>;

  @Select(PetSelectors.image) imagePet$: Observable<string>;

  @Select(PetSelectors.imageCarter) imagePetCarter$: Observable<string>;

  @Select(PetSelectors.isLoading) isLoadingPet$: Observable<boolean>;

  @Select(PetSelectors.isLoadingImage) isLoadingImagePet$: Observable<boolean>;

  @Select(PetSelectors.isLoadingImageCarter) isLoadingImageCarterPet$: Observable<boolean>;

  @Select(PetEvaluationSelectors.entities) evaluationsCollection$: Observable<EvaluationModel[]>;

  @Select(PetEvaluationSelectors.selected) evaluationSelected$: Observable<EvaluationModel>;

  @Select(PetEvaluationSelectors.isLoading) isLoadingEvaluation$: Observable<boolean>;

  @Select(PetPackageSelectors.entities) petPackagesCollection$: Observable<PetPackageModel[]>;

  @Select(PetPackageSelectors.selected) petPackageSelected$: Observable<PetPackageModel>;

  @Select(PetPackageSelectors.isLoading) isLoadingPetPackage$: Observable<boolean>;

  @Select(PetSelectors.isLoadingPetsCsv) isLoadingCsvPet$: Observable<boolean>;

  @Select(PetPackageSelectors.intervals) intervals$: Observable<any>;

  @Select(PetDiseaseSelectors.entities) diseasesCollection$: Observable<PetDiseaseModel[]>;

  @Select(PetDiseaseSelectors.selected) diseaseSelected$: Observable<PetDiseaseModel>;

  @Select(PetDiseaseSelectors.isLoading) isLoadingDisease$: Observable<boolean>;

  @Select(PetMedicineSelectors.entities) medicinesCollection$: Observable<PetMedicineModel[]>;

  @Select(PetMedicineSelectors.selected) medicineSelected$: Observable<PetMedicineModel>;

  @Select(PetMedicineSelectors.isLoading) isLoadingMedicine$: Observable<boolean>;

  @Select(PetVaccineSelectors.entities) vaccinesCollection$: Observable<PetVaccineModel[]>;

  @Select(PetVaccineSelectors.selected) vaccineSelected$: Observable<PetVaccineModel>;

  @Select(PetVaccineSelectors.isLoading) isLoadingVaccine$: Observable<boolean>;

  @Select(ModuleHotelSelectors.isLoading) isLoadingDaily$: Observable<boolean>;

  @Select(ModuleHotelSelectors.daily) daily$: Observable<DailyModel>;

  constructor(private store: Store) {
  }

  public loadDailyCalculation(
    checkinDate,
    checkinHour,
    checkoutDate,
    checkoutHour,
    unityId,
    petSize,
  ) {
    this.store.dispatch(
      new LoadDailyCalculation({
        checkin_date: checkinDate,
        checkin_hour: checkinHour,
        checkout_date: checkoutDate,
        checkout_hour: checkoutHour,
        unity_id: unityId,
        pet_size: petSize,
      }),
    );
  }

  public selectPet(pet: PetModel) {
    this.store.dispatch(new SelectPet(pet));
  }

  public async resetPets() {
    this.store.dispatch(new ResetPets());
  }

  public loadPets() {
    this.store.dispatch(new LoadPets());
  }

  public loadPetsTutor() {
    this.store.dispatch(new LoadPetsTutor(this.tutorSnapshot()));
  }

  public createPet(pet: PetModel) {
    this.store.dispatch(new CreatePet(pet));
  }

  public updatePet(pet: PetModel) {
    this.store.dispatch(new UpdatePet(pet));
  }

  public deletePet(pet: PetModel) {
    this.store.dispatch(new DeletePet(pet));
  }

  public uploadImagePet(image: FormData) {
    this.store.dispatch(new UploadImagePet(image));
  }

  public uploadImageCarterPet(image: FormData) {
    this.store.dispatch(new UploadImageCarterPet(image));
  }

  public selectEvaluation(evaluation: EvaluationModel) {
    this.store.dispatch(new SelectEvaluation(evaluation));
  }

  public loadEvaluations(pet: PetModel) {
    this.store.dispatch(new LoadEvaluations(pet));
  }

  public createEvaluation(evaluation: EvaluationModel) {
    this.store.dispatch(new CreateEvaluation(evaluation));
  }

  public updateEvaluation(evaluation: EvaluationModel) {
    this.store.dispatch(new UpdateEvaluation(evaluation));
  }

  public deleteEvaluation(evaluation: EvaluationModel) {
    this.store.dispatch(new DeleteEvaluation(evaluation));
  }

  public selectPetPackage(petPackage: PetPackageModel) {
    this.store.dispatch(new SelectPetPackage(petPackage));
  }

  public loadPetPackages() {
    this.store.dispatch(new LoadPetPackages());
  }

  public createPetPackage(petPackage: PetPackageModel) {
    this.store.dispatch(new CreatePetPackage(petPackage));
  }

  public updatePetPackage(petPackage: PetPackageModel) {
    this.store.dispatch(new UpdatePetPackage(petPackage));
  }

  public deletePetPackage(petPackage: PetPackageModel) {
    this.store.dispatch(new DeletePetPackage(petPackage));
  }

  public getDateIntervals(payload) {
    this.store.dispatch(new DateIntervalsPetPackage(payload));
  }

  public selectPetDisease(petDisease: PetDiseaseModel) {
    this.store.dispatch(new SelectPetDisease(petDisease));
  }

  public loadPetDiseases(pet: PetModel) {
    this.store.dispatch(new LoadPetDiseases(pet));
  }

  public createPetDisease(petDisease: PetDiseaseModel) {
    this.store.dispatch(new CreatePetDisease(petDisease));
  }

  public updatePetDisease(petDisease: PetDiseaseModel) {
    this.store.dispatch(new UpdatePetDisease(petDisease));
  }

  public deletePetDisease(petDisease: PetDiseaseModel) {
    this.store.dispatch(new DeletePetDisease(petDisease));
  }

  public selectPetMedicine(petMedicine: PetMedicineModel) {
    this.store.dispatch(new SelectPetMedicine(petMedicine));
  }

  public loadPetMedicines(pet: PetModel) {
    this.store.dispatch(new LoadPetMedicines(pet));
  }

  public createPetMedicine(petMedicine: PetMedicineModel) {
    this.store.dispatch(new CreatePetMedicine(petMedicine));
  }

  public updatePetMedicine(petMedicine: PetMedicineModel) {
    this.store.dispatch(new UpdatePetMedicine(petMedicine));
  }

  public deletePetMedicine(petMedicine: PetMedicineModel) {
    this.store.dispatch(new DeletePetMedicine(petMedicine));
  }

  public selectPetVaccine(petVaccine: PetVaccineModel) {
    this.store.dispatch(new SelectPetVaccine(petVaccine));
  }

  public loadPetVaccines() {
    this.store.dispatch(new LoadPetVaccines());
  }

  public loadPetVaccinesPet(pet: PetModel) {
    this.store.dispatch(new LoadPetVaccinesPet(pet));
  }

  public createPetVaccine(petVaccine: PetVaccineModel) {
    this.store.dispatch(new CreatePetVaccine(petVaccine));
  }

  public updatePetVaccine(petVaccine: PetVaccineModel) {
    this.store.dispatch(new UpdatePetVaccine(petVaccine));
  }

  public deletePetVaccine(petVaccine: PetVaccineModel) {
    this.store.dispatch(new DeletePetVaccine(petVaccine));
  }

  tutorSnapshot() {
    return this.store.selectSnapshot(TutorSelectors.selected);
  }

  public openModal(editing, data?) {
    this.store.dispatch(new OpenPetModal({editing, data}));
  }

  public closeModal() {
    this.store.dispatch(new ClosePetModal());
  }

  public openModalService(data) {
    this.store.dispatch(new OpenPetServiceModal(data));
  }

  public closeModalService() {
    this.store.dispatch(new ClosePetServiceModal());
  }

  public openModalProfile(data) {
    this.store.dispatch(new OpenPetProfileModal(data));
  }

  public closeModalProfile() {
    this.store.dispatch(new ClosePetProfileModal());
  }

  public openModalEvaluation(data) {
    this.store.dispatch(new OpenPetEvaluationModal(data));
  }

  public closeModalEvaluation() {
    this.store.dispatch(new ClosePetEvaluationModal());
  }

  public openModalEvaluationInfo(data) {
    this.store.dispatch(new OpenPetEvaluationInfoModal(data));
  }

  public closeModalEvaluationInfo() {
    this.store.dispatch(new ClosePetEvaluationInfoModal());
  }

  public openModalModuleHotel(data) {
    this.store.dispatch(new OpenModuleHotelModal(data));
  }

  public closeModalModuleHotel() {
    this.store.dispatch(new CloseModuleHotelModal());
  }

  public openModalPetSitter(data) {
    this.store.dispatch(new OpenServicePetSitterModal(data));
  }

  public closeModalPetSitter() {
    this.store.dispatch(new CloseServicePetSitterModal());
  }

  public openModalSpa(data, category) {
    this.store.dispatch(new OpenPetSpaModal({data, category}));
  }

  public closeModalSpa() {
    this.store.dispatch(new ClosePetSpaModal());
  }

  public openModalOther(data, category) {
    this.store.dispatch(new OpenPetOtherModal({data, category}));
  }

  public closeModalOther() {
    this.store.dispatch(new ClosePetOtherModal());
  }

  public openPetScheduleModal(service, data?) {
    this.store.dispatch(new OpenPetScheduleModal({service, data}));
  }

  public closePetScheduleModal() {
    this.store.dispatch(new ClosePetScheduleModal());
  }

  public openPetCartModal() {
    this.store.dispatch(new OpenPetCartModal());
  }

  public closePetCartModal() {
    this.store.dispatch(new ClosePetCartModal());
  }

  public openDaycareCreateModal(service, data?) {
    this.store.dispatch(new OpenDaycareCreateModal({service, data}));
  }

  public closeDaycareCreateModal() {
    this.store.dispatch(new CloseDaycareCreateModal());
  }

  public openPetDiseaseModal(editing, data?) {
    this.store.dispatch(new OpenPetDiseaseModal({editing, data}));
  }

  public closePetDiseaseModal() {
    this.store.dispatch(new ClosePetDiseaseModal());
  }

  public openPetMedicineModal(editing, data?) {
    this.store.dispatch(new OpenPetMedicineModal({editing, data}));
  }

  public closePetMedicineModal() {
    this.store.dispatch(new ClosePetMedicineModal());
  }

  public openPetVaccineModal(editing, data?) {
    this.store.dispatch(new OpenPetVaccineModal({editing, data}));
  }

  public closePetVaccineModal() {
    this.store.dispatch(new ClosePetVaccineModal());
  }

  petSnapshot() {
    return this.store.selectSnapshot(PetSelectors.selected);
  }

  public uploadCsvPet(csv: FormData) {
    this.store.dispatch(new UploadCsvPet(csv));
  }
}
