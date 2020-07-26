import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {UnitySelectors} from './state/unity/unity.selectors';
import {CategorySelectors} from './state/category/category.selectors';
import {ServiceSelectors} from './state/service/service.selectors';
import {SubServiceSelectors} from './state/sub-service/sub-service.selectors';
import {ShowerSelectors} from './state/shower/shower.selectors';
import {SubShowerSelectors} from './state/sub-shower/sub-shower.selectors';
import {TransportSelectors} from './state/transport/transport.selectors';
import {PetSitterSelectors} from './state/pet-sitter/pet-sitter.selectors';
import {DayCareSelectors} from './state/day-care/day-care.selectors';
import {HotelSelectors} from './state/hotel/hotel.selectors';
import {OtherSelectors} from './state/other/other.selectors';

import {ServiceState} from './state/service/service.state';

import {
    SelectUnity,
    LoadUnits,
    CreateUnity,
    UpdateUnity,
    DeleteUnity,
    DisableUnity,
    UploadImageUnity
} from './state/unity/unity.actions';
import {
    SelectCategory,
    LoadCategories,
    LoadCategoriesUnity,
    CreateCategory,
    UpdateCategory,
    DeleteCategory
} from './state/category/category.actions';
import {
    SelectService,
    LoadServices,
    LoadServicesUnity,
    CreateService,
    UpdateService,
    UpdateStatusService,
    DeleteService,
    ExpectedTimeService
} from './state/service/service.actions';
import {
    LoadSubServices,
    CreateSubService,
    UpdateSubService,
    DeleteSubService
} from './state/sub-service/sub-service.actions';
import {
    LoadShowers,
    LoadShowersUnity,
    CreateShower,
    UpdateShower,
    DeleteShower
} from './state/shower/shower.actions';
import {
    LoadSubShowers,
    LoadSubShowersUnity,
    CreateSubShower,
    UpdateSubShower,
    DeleteSubShower
} from './state/sub-shower/sub-shower.actions';
import {
    LoadTransports,
    LoadTransportsUnity,
    CreateTransport,
    UpdateTransport,
    DeleteTransport
} from './state/transport/transport.actions';
import {
    LoadPetSitters,
    LoadPetSittersUnity,
    CreatePetSitter,
    UpdatePetSitter,
    DeletePetSitter
} from './state/pet-sitter/pet-sitter.actions';
import {
    LoadDayCares,
    LoadDayCaresUnity,
    CreateDayCare,
    UpdateDayCare,
    DeleteDayCare
} from './state/day-care/day-care.actions';
import {
    LoadHotels,
    LoadHotelsUnity,
    CreateHotel,
    UpdateHotel,
    DeleteHotel
} from './state/hotel/hotel.actions';
import {
    LoadOthers,
    LoadOthersUnity,
    CreateOther,
    UpdateOther,
    DeleteOther
} from './state/other/other.actions';
import {
    SelectCategories,
    SelectServiceHotel,
    SelectServiceSitter,
    SelectServiceDaycare,
    SelectServiceShower,
    SelectServiceOthers
} from '../session/state/session.actions';

import {OpenUnityModal, CloseUnityModal} from './state/unity-modal/unity-modal.actions';
import {OpenCategoryModal, CloseCategoryModal} from './state/category-modal/category-modal.actions';
import {OpenServiceModal, CloseServiceModal} from './state/service-modal/service-modal.actions';
import {OpenShowerModal, CloseShowerModal} from './state/shower-modal/shower-modal.actions';
import {OpenSubShowerModal, CloseSubShowerModal} from './state/sub-shower-modal/sub-shower-modal.actions';
import {OpenTransportModal, CloseTransportModal} from './state/transport-modal/transport-modal.actions';
import {OpenPetSitterModal, ClosePetSitterModal} from './state/pet-sitter-modal/pet-sitter-modal.actions';
import {OpenDayCareModal, CloseDayCareModal} from './state/day-care-modal/day-care-modal.actions';
import {OpenHotelModal, CloseHotelModal} from './state/hotel-modal/hotel-modal.actions';
import {OpenOtherModal, CloseOtherModal} from './state/other-modal/other-modal.actions';

import {UnityModel} from '../shared/models/unity.model';
import {CategoryModel} from '../shared/models/category.model';
import {ServiceModel} from '../shared/models/service.model';

@Injectable({
    providedIn: 'root'
})
export class UnitySandbox {

    @Select(ServiceState.expectedTime) expectedTime$: Observable<number>;

    @Select(UnitySelectors.entities) unitsCollection$: Observable<UnityModel[]>;

    @Select(UnitySelectors.selected) unitySelected$: Observable<UnityModel>;

    @Select(UnitySelectors.image) imageUnity$: Observable<string>;

    @Select(UnitySelectors.isLoading) isLoading$: Observable<boolean>;

    @Select(UnitySelectors.isLoadingImage) isLoadingImageUnity$: Observable<boolean>;

    @Select(CategorySelectors.entities) categoriesCollection$: Observable<CategoryModel[]>;

    @Select(CategorySelectors.selected) categorySelected$: Observable<CategoryModel>;

    @Select(CategorySelectors.isLoading) isLoadingCategory$: Observable<boolean>;

    @Select(ServiceSelectors.entities) servicesCollection$: Observable<ServiceModel[]>;

    @Select(ServiceSelectors.entitiesNotDaycareAndHotel) servicesNotDaycareAndHotelCollection$: Observable<ServiceModel[]>;

    @Select(ServiceSelectors.selected) serviceSelected$: Observable<ServiceModel>;

    @Select(ServiceSelectors.isLoading) isLoadingService$: Observable<boolean>;

    @Select(SubServiceSelectors.entities) subServicesCollection$: Observable<ServiceModel[]>;

    @Select(SubServiceSelectors.selected) subServiceSelected$: Observable<ServiceModel>;

    @Select(SubServiceSelectors.isLoading) isLoadingSubService$: Observable<boolean>;

    @Select(ShowerSelectors.entities) showersCollection$: Observable<ServiceModel[]>;

    @Select(ShowerSelectors.selected) showerSelected$: Observable<ServiceModel>;

    @Select(ShowerSelectors.isLoading) isLoadingShower$: Observable<boolean>;

    @Select(SubShowerSelectors.entities) subShowersCollection$: Observable<any[]>;

    @Select(SubShowerSelectors.selected) subShowerSelected$: Observable<ServiceModel>;

    @Select(SubShowerSelectors.isLoading) isLoadingSubShower$: Observable<boolean>;

    @Select(TransportSelectors.entities) transportsCollection$: Observable<ServiceModel[]>;

    @Select(TransportSelectors.selected) transportSelected$: Observable<ServiceModel>;

    @Select(TransportSelectors.isLoading) isLoadingTransport$: Observable<boolean>;

    @Select(PetSitterSelectors.entities) petSittersCollection$: Observable<ServiceModel[]>;

    @Select(PetSitterSelectors.selected) petSitterSelected$: Observable<ServiceModel>;

    @Select(PetSitterSelectors.isLoading) isLoadingPetSitter$: Observable<boolean>;

    @Select(DayCareSelectors.entities) dayCaresCollection$: Observable<ServiceModel[]>;

    @Select(DayCareSelectors.selected) dayCareSelected$: Observable<ServiceModel>;

    @Select(DayCareSelectors.isLoading) isLoadingDayCare$: Observable<boolean>;

    @Select(HotelSelectors.entities) hotelsCollection$: Observable<ServiceModel[]>;

    @Select(HotelSelectors.selected) hotelSelected$: Observable<ServiceModel>;

    @Select(HotelSelectors.isLoading) isLoadingHotel$: Observable<boolean>;

    @Select(OtherSelectors.entities) othersCollection$: Observable<ServiceModel[]>;

    @Select(OtherSelectors.selected) otherSelected$: Observable<ServiceModel>;

    @Select(OtherSelectors.isLoading) isLoadingOther$: Observable<boolean>;

    constructor(private store: Store) {
    }

    public expectedTimeService(service, size) {
        this.store.dispatch(new ExpectedTimeService({service, size}));
    }

    public selectCategories(categories: CategoryModel[]) {
        this.store.dispatch(new SelectCategories(categories));
    }

    public selectServiceShower(services: ServiceModel[]) {
        this.store.dispatch(new SelectServiceShower(services));
    }

    public selectServiceOthers(services: ServiceModel[]) {
      this.store.dispatch(new SelectServiceOthers(services));
    }

    public selectServiceHotel(service: ServiceModel) {
        this.store.dispatch(new SelectServiceHotel(service));
    }

    public selectServiceSitter(service: ServiceModel) {
        this.store.dispatch(new SelectServiceSitter(service));
    }

    public selectServiceDaycare(service: ServiceModel) {
        this.store.dispatch(new SelectServiceDaycare(service));
    }

    public selectUnity(unity: UnityModel) {
        this.store.dispatch(new SelectUnity(unity));
    }

    public async setUnity(unity: UnityModel) {
        await this.store.dispatch(new SelectUnity(unity));
    }

    public loadUnits() {
        this.store.dispatch(new LoadUnits());
    }

    public createUnity(unity: UnityModel) {
        this.store.dispatch(new CreateUnity(unity));
    }

    public updateUnity(unity: UnityModel) {
        this.store.dispatch(new UpdateUnity(unity));
    }

    public deleteUnity(unity: UnityModel) {
        this.store.dispatch(new DeleteUnity(unity));
    }

    public disableUnity(unity: UnityModel) {
        this.store.dispatch(new DisableUnity(unity));
    }

    public uploadImageUnity(image: FormData) {
        this.store.dispatch(new UploadImageUnity(image));
    }

    public openModal(editing, data?) {
        this.store.dispatch(new OpenUnityModal({editing, data}));
    }

    public closeModal() {
        this.store.dispatch(new CloseUnityModal());
    }

    public selectCategory(category: CategoryModel) {
        this.store.dispatch(new SelectCategory(category));
    }

    public loadCategories() {
        this.store.dispatch(new LoadCategories());
    }

    public loadCategoriesUnity() {
        this.store.dispatch(new LoadCategoriesUnity(this.unitySnapshot()));
    }

    public createCategory(category: CategoryModel) {
        this.store.dispatch(new CreateCategory(category));
    }

    public updateCategory(category: CategoryModel) {
        this.store.dispatch(new UpdateCategory(category));
    }

    public deleteCategory(category: CategoryModel) {
        this.store.dispatch(new DeleteCategory(category));
    }

    public openModalCategory(editing, data?) {
        this.store.dispatch(new OpenCategoryModal({editing, data}));
    }

    public closeModalCategory() {
        this.store.dispatch(new CloseCategoryModal());
    }

    public selectService(service: ServiceModel) {
        this.store.dispatch(new SelectService(service));
    }

    public loadServices() {
        this.store.dispatch(new LoadServices());
    }

    public loadServicesUnity() {
        this.store.dispatch(new LoadServicesUnity(this.unitySnapshot()));
    }

    public createService(service: ServiceModel) {
        this.store.dispatch(new CreateService(service));
    }

    public updateService(service: ServiceModel) {
        this.store.dispatch(new UpdateService(service));
    }

    public updateStatusService(payload: number) {
      this.store.dispatch(new UpdateStatusService(payload));
    }

    public deleteService(service: ServiceModel) {
        this.store.dispatch(new DeleteService(service));
    }

    public openModalService(editing, data?) {
        this.store.dispatch(new OpenServiceModal({editing, data}));
    }

    public closeModalService() {
        this.store.dispatch(new CloseServiceModal());
    }

    public loadSubServicesUnity() {
        this.store.dispatch(new LoadSubServices(this.unitySnapshot()));
    }

    public createSubService(service: ServiceModel) {
        this.store.dispatch(new CreateSubService(service));
    }

    public updateSubService(service: ServiceModel) {
        this.store.dispatch(new UpdateSubService(service));
    }

    public deleteSubService(service: ServiceModel) {
        this.store.dispatch(new DeleteSubService(service));
    }

    public loadShowers() {
        this.store.dispatch(new LoadShowers());
    }

    public loadShowersUnity() {
        this.store.dispatch(new LoadShowersUnity(this.unitySnapshot()));
    }

    public createShower(shower: ServiceModel) {
        this.store.dispatch(new CreateShower(shower));
    }

    public updateShower(shower: ServiceModel) {
        this.store.dispatch(new UpdateShower(shower));
    }

    public deleteShower(shower: ServiceModel) {
        this.store.dispatch(new DeleteShower(shower));
    }

    public openModalShower(editing, data?) {
        this.store.dispatch(new OpenShowerModal({editing, data}));
    }

    public closeModalShower() {
        this.store.dispatch(new CloseShowerModal());
    }

    public loadSubShowers() {
        this.store.dispatch(new LoadSubShowers());
    }

    public loadSubShowersUnity() {
        this.store.dispatch(new LoadSubShowersUnity(this.unitySnapshot()));
    }

    public createSubShower(shy: ServiceModel) {
        this.store.dispatch(new CreateSubShower(shy));
    }

    public updateSubShower(shy: ServiceModel) {
        this.store.dispatch(new UpdateSubShower(shy));
    }

    public deleteSubShower(shy: ServiceModel) {
        this.store.dispatch(new DeleteSubShower(shy));
    }

    public openModalSubShower(editing, data?) {
        this.store.dispatch(new OpenSubShowerModal({editing, data}));
    }

    public closeModalSubShower() {
        this.store.dispatch(new CloseSubShowerModal());
    }

    public loadTransports() {
        this.store.dispatch(new LoadTransports());
    }

    public loadTransportsUnity() {
        this.store.dispatch(new LoadTransportsUnity(this.unitySnapshot()));
    }

    public createTransport(transport: ServiceModel) {
        this.store.dispatch(new CreateTransport(transport));
    }

    public updateTransport(transport: ServiceModel) {
        this.store.dispatch(new UpdateTransport(transport));
    }

    public deleteTransport(transport: ServiceModel) {
        this.store.dispatch(new DeleteTransport(transport));
    }

    public openModalTransport(editing, data?) {
        this.store.dispatch(new OpenTransportModal({editing, data}));
    }

    public closeModalTransport() {
        this.store.dispatch(new CloseTransportModal());
    }

    public loadPetSitters() {
        this.store.dispatch(new LoadPetSitters());
    }

    public loadPetSittersUnity() {
        this.store.dispatch(new LoadPetSittersUnity(this.unitySnapshot()));
    }

    public createPetSitter(petSitter: ServiceModel) {
        this.store.dispatch(new CreatePetSitter(petSitter));
    }

    public updatePetSitter(petSitter: ServiceModel) {
        this.store.dispatch(new UpdatePetSitter(petSitter));
    }

    public deletePetSitter(petSitter: ServiceModel) {
        this.store.dispatch(new DeletePetSitter(petSitter));
    }

    public openModalPetSitter(editing, data?) {
        this.store.dispatch(new OpenPetSitterModal({editing, data}));
    }

    public closeModalPetSitter() {
        this.store.dispatch(new ClosePetSitterModal());
    }

    public loadDayCares() {
        this.store.dispatch(new LoadDayCares());
    }

    public loadDayCaresUnity() {
        this.store.dispatch(new LoadDayCaresUnity(this.unitySnapshot()));
    }

    public createDayCare(dayCare: ServiceModel) {
        this.store.dispatch(new CreateDayCare(dayCare));
    }

    public updateDayCare(dayCare: ServiceModel) {
        this.store.dispatch(new UpdateDayCare(dayCare));
    }

    public deleteDayCare(dayCare: ServiceModel) {
        this.store.dispatch(new DeleteDayCare(dayCare));
    }

    public openModalDayCare(editing, data?) {
        this.store.dispatch(new OpenDayCareModal({editing, data}));
    }

    public closeModalDayCare() {
        this.store.dispatch(new CloseDayCareModal());
    }

    public loadHotels() {
        this.store.dispatch(new LoadHotels());
    }

    public loadHotelsUnity() {
        this.store.dispatch(new LoadHotelsUnity(this.unitySnapshot()));
    }

    public createHotel(hotel: ServiceModel) {
        this.store.dispatch(new CreateHotel(hotel));
    }

    public updateHotel(hotel: ServiceModel) {
        this.store.dispatch(new UpdateHotel(hotel));
    }

    public deleteHotel(hotel: ServiceModel) {
        this.store.dispatch(new DeleteHotel(hotel));
    }

    public openModalHotel(editing, data?) {
        this.store.dispatch(new OpenHotelModal({editing, data}));
    }

    public closeModalHotel() {
        this.store.dispatch(new CloseHotelModal());
    }

    public loadOthers() {
        this.store.dispatch(new LoadOthers());
    }

    public loadOthersUnity() {
        this.store.dispatch(new LoadOthersUnity(this.unitySnapshot()));
    }

    public createOther(other: ServiceModel) {
        this.store.dispatch(new CreateOther(other));
    }

    public updateOther(other: ServiceModel) {
        this.store.dispatch(new UpdateOther(other));
    }

    public deleteOther(other: ServiceModel) {
        this.store.dispatch(new DeleteOther(other));
    }

    public openModalOther(editing, data?) {
        this.store.dispatch(new OpenOtherModal({editing, data}));
    }

    public closeModalOther() {
        this.store.dispatch(new CloseOtherModal());
    }

    unitySnapshot() {
        return this.store.selectSnapshot(UnitySelectors.selected);
    }
}
