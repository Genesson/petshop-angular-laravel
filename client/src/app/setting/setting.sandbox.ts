import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';
import {SelectSnapshot} from '@ngxs-labs/select-snapshot';

import {Observable} from 'rxjs';

import {BehaviorSelectors} from './state/behavior/behavior.selectors';
import {BreedSelectors} from './state/breed/breed.selectors';
import {SizeSelectors} from './state/size/size.selectors';
import {TypeFurSelectors} from './state/type-fur/type-fur.selectors';
import {TypeSelectors} from './state/type/type.selectors';
import {RoomSelectors} from './state/room/room.selectors';
import {DistrictSelectors} from './state/district/district.selectors';
import {RegionSelectors} from './state/region/region.selectors';
import {CheckSelectors} from './state/check/check.selectors';
import {PriceVariationSelectors} from './state/price-variation/price-variation.selectors';
import {ExceptionDateSelectors} from './state/exception-date/exception-date.selectors';
import {HolidaySelectors} from './state/holiday/holiday.selectors';
import {CardFlagsSelectors} from './state/card-flags/card-flags.selectors';

import {
    SelectBehavior,
    LoadBehaviors,
    CreateBehavior,
    UpdateBehavior,
    DeleteBehavior
} from './state/behavior/behavior.actions';
import {
    SelectBreed,
    LoadBreeds,
    LoadBreedsPerType,
    CreateBreed,
    UpdateBreed,
    DeleteBreed
} from './state/breed/breed.actions';
import {
    SelectSize,
    LoadSizes,
    CreateSize,
    UpdateSize,
    DeleteSize
} from './state/size/size.actions';
import {
    SelectTypeFur,
    LoadTypeFurs,
    CreateTypeFur,
    UpdateTypeFur,
    DeleteTypeFur
} from './state/type-fur/type-fur.actions';
import {
    SelectType,
    LoadTypes,
    CreateType,
    UpdateType,
    DeleteType
} from './state/type/type.actions';
import {
    SelectDistrict,
    LoadDistricts,
    CreateDistrict,
    UpdateDistrict,
    DeleteDistrict
} from './state/district/district.actions';
import {
    SelectRoom,
    LoadRooms,
    CreateRoom,
    UpdateRoom,
    DeleteRoom
} from './state/room/room.actions';
import {
    SelectRegion,
    LoadRegions,
    CreateRegion,
    UpdateRegion,
    DeleteRegion
} from './state/region/region.actions';
import {
    SelectCheck,
    LoadChecks,
    CreateCheck,
    UpdateCheck,
    DeleteCheck
} from './state/check/check.actions';
import {
    SelectPriceVariation,
    LoadPriceVariations,
    CreatePriceVariation,
    UpdatePriceVariation,
    DeletePriceVariation
} from './state/price-variation/price-variation.actions';
import {
    SelectExceptionDate,
    LoadExceptionDates,
    CreateExceptionDate,
    UpdateExceptionDate,
    DeleteExceptionDate
} from './state/exception-date/exception-date.actions';
import {
    SelectHoliday,
    LoadHolidays,
    CreateHoliday,
    UpdateHoliday,
    DeleteHoliday
} from './state/holiday/holiday.actions';
import {
    SelectCardFlag,
    LoadCardFlags,
    CreateCardFlag,
    UpdateCardFlag,
    DeleteCardFlag
} from './state/card-flags/card-flags.actions';

import {OpenBehaviorModal, CloseBehaviorModal} from './state/behavior-modal/behavior-modal.actions';
import {OpenBreedModal, CloseBreedModal} from './state/breed-modal/breed-modal.actions';
import {OpenSizeModal, CloseSizeModal} from './state/size-modal/size-modal.actions';
import {OpenTypeFurModal, CloseTypeFurModal} from './state/type-fur-modal/type-fur-modal.actions';
import {OpenTypeModal, CloseTypeModal} from './state/type-modal/type-modal.actions';
import {OpenRoomModal, CloseRoomModal} from './state/room-modal/room-modal.actions';
import {OpenDistrictModal, CloseDistrictModal} from './state/district-modal/district-modal.actions';
import {OpenRegionModal, CloseRegionModal} from './state/region-modal/region-modal.actions';
import {OpenCheckModal, CloseCheckModal} from './state/check-modal/check-modal.actions';
import {OpenPriceVariationModal, ClosePriceVariationModal} from './state/price-variation-modal/price-variation-modal.actions';
import {OpenExceptionDateModal, CloseExceptionDateModal} from './state/exception-date-modal/exception-date-modal.actions';
import {OpenCardFlagModal, CloseCardFlagModal} from './state/card-flags-modal/card-flags-modal.actions';

import {SessionState} from '../session/state/session.state';

import {BehaviorModel} from '../shared/models/behavior.model';
import {BreedModel} from '../shared/models/breed.model';
import {SizeModel} from '../shared/models/size.model';
import {TypeFurModel} from '../shared/models/type-fur.model';
import {TypeModel} from '../shared/models/type.model';
import {RoomModel} from '../shared/models/room.model';
import {DistrictModel} from '../shared/models/district.model';
import {RegionModel} from '../shared/models/region.model';
import {CheckModel} from '../shared/models/check.model';
import {PriceVariationModel} from '../shared/models/price-variation.model';
import {CategoryModel} from '../shared/models/category.model';
import {ServiceModel} from '../shared/models/service.model';
import {ExceptionDateModel} from '../shared/models/exception-date.model';
import {HolidayModel} from '../shared/models/holiday.model';
import {CardFlagModel} from '../shared/models/cardFlag.model';

@Injectable({
    providedIn: 'root'
})
export class SettingSandbox {

    @Select(BehaviorSelectors.entities) behaviorsCollection$: Observable<BehaviorModel[]>;

    @Select(BehaviorSelectors.selected) behaviorSelected$: Observable<BehaviorModel>;

    @Select(BehaviorSelectors.isLoading) isLoadingBehavior$: Observable<boolean>;

    @Select(BreedSelectors.entities) breedsCollection$: Observable<BreedModel[]>;

    @Select(BreedSelectors.selected) breedSelected$: Observable<BreedModel>;

    @Select(BreedSelectors.isLoading) isLoadingBreed$: Observable<boolean>;

    @Select(SizeSelectors.entities) sizesCollection$: Observable<SizeModel[]>;

    @Select(SizeSelectors.selected) sizeSelected$: Observable<SizeModel>;

    @Select(SizeSelectors.isLoading) isLoadingSize$: Observable<boolean>;

    @Select(TypeFurSelectors.entities) typeFursCollection$: Observable<TypeFurModel[]>;

    @Select(TypeFurSelectors.selected) typeFurSelected$: Observable<TypeFurModel>;

    @Select(TypeFurSelectors.isLoading) isLoadingTypeFur$: Observable<boolean>;

    @Select(TypeSelectors.entities) typesCollection$: Observable<TypeModel[]>;

    @Select(TypeSelectors.selected) typeSelected$: Observable<TypeModel>;

    @Select(TypeSelectors.isLoading) isLoadingType$: Observable<boolean>;

    @Select(RoomSelectors.entities) roomsCollection$: Observable<RoomModel[]>;

    @Select(RoomSelectors.selected) roomSelected$: Observable<RoomModel>;

    @Select(RoomSelectors.isLoading) isLoadingRoom$: Observable<boolean>;

    @Select(DistrictSelectors.entities) districtsCollection$: Observable<DistrictModel[]>;

    @Select(DistrictSelectors.selected) districtSelected$: Observable<DistrictModel>;

    @Select(DistrictSelectors.isLoading) isLoadingDistrict$: Observable<boolean>;

    @Select(RegionSelectors.entities) regionsCollection$: Observable<RegionModel[]>;

    @Select(RegionSelectors.selected) regionSelected$: Observable<RegionModel>;

    @Select(RegionSelectors.isLoading) isLoadingRegion$: Observable<boolean>;

    @Select(CheckSelectors.entities) checksCollection$: Observable<CheckModel[]>;

    @Select(CheckSelectors.selected) checkSelected$: Observable<CheckModel>;

    @Select(CheckSelectors.isLoading) isLoadingCheck$: Observable<boolean>;

    @Select(CheckSelectors.checkIn) checkIn$: Observable<any>;

    @Select(CheckSelectors.checkOut) checkOut$: Observable<any>;

    @Select(PriceVariationSelectors.entities) priceVariationsCollection$: Observable<PriceVariationModel[]>;

    @Select(PriceVariationSelectors.selected) priceVariationSelected$: Observable<PriceVariationModel>;

    @Select(PriceVariationSelectors.isLoading) isLoadingPriceVariation$: Observable<boolean>;

    @Select(ExceptionDateSelectors.entities) exceptionDatesCollection$: Observable<ExceptionDateModel[]>;

    @Select(ExceptionDateSelectors.selected) exceptionDateSelected$: Observable<ExceptionDateModel>;

    @Select(ExceptionDateSelectors.isLoading) isLoadingExceptionDate$: Observable<boolean>;

    @Select(HolidaySelectors.entities) holidaysCollection$: Observable<HolidayModel[]>;

    @Select(HolidaySelectors.selected) holidaySelected$: Observable<HolidayModel>;

    @Select(HolidaySelectors.isLoading) isLoadingHoliday$: Observable<boolean>;

    @Select(CardFlagsSelectors.entities) cardFlagsCollection$: Observable<CardFlagModel[]>;

    @Select(CardFlagsSelectors.selected) cardFlagSelected$: Observable<CardFlagModel>;

    @Select(CardFlagsSelectors.isLoading) isLoadingCardFlag$: Observable<boolean>;

    @SelectSnapshot(SessionState.categories) categories: CategoryModel[];

    @SelectSnapshot(SessionState.serviceShower) serviceShower: ServiceModel[];

    @SelectSnapshot(SessionState.serviceOthers) serviceOthers: ServiceModel[];

    @SelectSnapshot(SessionState.serviceHotel) serviceHotel: ServiceModel;

    @SelectSnapshot(SessionState.serviceSitter) serviceSitter: ServiceModel;

    @SelectSnapshot(SessionState.serviceDaycare) serviceDaycare: ServiceModel;

    constructor(private store: Store) {
    }

    public selectBehavior(behavior: BehaviorModel) {
        this.store.dispatch(new SelectBehavior(behavior));
    }

    public loadBehaviors() {
        this.store.dispatch(new LoadBehaviors());
    }

    public createBehavior(behavior: BehaviorModel) {
        this.store.dispatch(new CreateBehavior(behavior));
    }

    public updateBehavior(behavior: BehaviorModel) {
        this.store.dispatch(new UpdateBehavior(behavior));
    }

    public deleteBehavior(behavior: BehaviorModel) {
        this.store.dispatch(new DeleteBehavior(behavior));
    }

    public selectBreed(breed: BreedModel) {
        this.store.dispatch(new SelectBreed(breed));
    }

    public loadBreeds() {
        this.store.dispatch(new LoadBreeds());
    }

    public async loadBreedsPerType(type) {
        await this.store.dispatch(new LoadBreedsPerType(type));
    }

    public createBreed(breed: BreedModel) {
        this.store.dispatch(new CreateBreed(breed));
    }

    public updateBreed(breed: BreedModel) {
        this.store.dispatch(new UpdateBreed(breed));
    }

    public deleteBreed(breed: BreedModel) {
        this.store.dispatch(new DeleteBreed(breed));
    }

    public selectSize(size: SizeModel) {
        this.store.dispatch(new SelectSize(size));
    }

    public loadSizes() {
        this.store.dispatch(new LoadSizes());
    }

    public createSize(size: SizeModel) {
        this.store.dispatch(new CreateSize(size));
    }

    public updateSize(size: SizeModel) {
        this.store.dispatch(new UpdateSize(size));
    }

    public deleteSize(size: SizeModel) {
        this.store.dispatch(new DeleteSize(size));
    }

    public selectTypeFur(typeFur: TypeFurModel) {
        this.store.dispatch(new SelectTypeFur(typeFur));
    }

    public loadTypeFurs() {
        this.store.dispatch(new LoadTypeFurs());
    }

    public createTypeFur(typeFur: TypeFurModel) {
        this.store.dispatch(new CreateTypeFur(typeFur));
    }

    public updateTypeFur(typeFur: TypeFurModel) {
        this.store.dispatch(new UpdateTypeFur(typeFur));
    }

    public deleteTypeFur(typeFur: TypeFurModel) {
        this.store.dispatch(new DeleteTypeFur(typeFur));
    }

    public selectType(type: TypeModel) {
        this.store.dispatch(new SelectType(type));
    }

    public async loadTypes() {
        await this.store.dispatch(new LoadTypes());
    }

    public createType(type: TypeModel) {
        this.store.dispatch(new CreateType(type));
    }

    public updateType(type: TypeModel) {
        this.store.dispatch(new UpdateType(type));
    }

    public deleteType(type: TypeModel) {
        this.store.dispatch(new DeleteType(type));
    }

    public selectRoom(room: RoomModel) {
        this.store.dispatch(new SelectRoom(room));
    }

    public loadRooms() {
        this.store.dispatch(new LoadRooms());
    }

    public createRoom(room: RoomModel) {
        this.store.dispatch(new CreateRoom(room));
    }

    public updateRoom(room: RoomModel) {
        this.store.dispatch(new UpdateRoom(room));
    }

    public deleteRoom(room: RoomModel) {
        this.store.dispatch(new DeleteRoom(room));
    }

    public selectDistrict(district: DistrictModel) {
        this.store.dispatch(new SelectDistrict(district));
    }

    public loadDistricts() {
        this.store.dispatch(new LoadDistricts());
    }

    public createDistrict(district: DistrictModel) {
        this.store.dispatch(new CreateDistrict(district));
    }

    public updateDistrict(district: DistrictModel) {
        this.store.dispatch(new UpdateDistrict(district));
    }

    public deleteDistrict(district: DistrictModel) {
        this.store.dispatch(new DeleteDistrict(district));
    }

    public selectRegion(region: RegionModel) {
        this.store.dispatch(new SelectRegion(region));
    }

    public loadRegions() {
        this.store.dispatch(new LoadRegions());
    }

    public createRegion(region: RegionModel) {
        this.store.dispatch(new CreateRegion(region));
    }

    public updateRegion(region: RegionModel) {
        this.store.dispatch(new UpdateRegion(region));
    }

    public deleteRegion(region: RegionModel) {
        this.store.dispatch(new DeleteRegion(region));
    }

    public selectCheck(check: CheckModel) {
        this.store.dispatch(new SelectCheck(check));
    }

    public loadChecks() {
        this.store.dispatch(new LoadChecks());
    }

    public createCheck(check: CheckModel) {
        this.store.dispatch(new CreateCheck(check));
    }

    public updateCheck(check: CheckModel) {
        this.store.dispatch(new UpdateCheck(check));
    }

    public deleteCheck(check: CheckModel) {
        this.store.dispatch(new DeleteCheck(check));
    }

    public openModalBehavior(editing, data?) {
        this.store.dispatch(new OpenBehaviorModal({editing, data}));
    }

    public selectPriceVariation(priceVariation: PriceVariationModel) {
        this.store.dispatch(new SelectPriceVariation(priceVariation));
    }

    public loadPriceVariations() {
        this.store.dispatch(new LoadPriceVariations());
    }

    public createPriceVariation(priceVariation: PriceVariationModel) {
        this.store.dispatch(new CreatePriceVariation(priceVariation));
    }

    public updatePriceVariation(priceVariation: PriceVariationModel) {
        this.store.dispatch(new UpdatePriceVariation(priceVariation));
    }

    public deletePriceVariation(priceVariation: PriceVariationModel) {
        this.store.dispatch(new DeletePriceVariation(priceVariation));
    }

    public selectExceptionDate(exceptionDate: ExceptionDateModel) {
        this.store.dispatch(new SelectExceptionDate(exceptionDate));
    }

    public loadExceptionDates() {
        this.store.dispatch(new LoadExceptionDates());
    }

    public createExceptionDate(exceptionDate: ExceptionDateModel) {
        this.store.dispatch(new CreateExceptionDate(exceptionDate));
    }

    public updateExceptionDate(exceptionDate: ExceptionDateModel) {
        this.store.dispatch(new UpdateExceptionDate(exceptionDate));
    }

    public deleteExceptionDate(exceptionDate: ExceptionDateModel) {
        this.store.dispatch(new DeleteExceptionDate(exceptionDate));
    }

    public selectHoliday(holiday: HolidayModel) {
        this.store.dispatch(new SelectHoliday(holiday));
    }

    public loadHolidays() {
        this.store.dispatch(new LoadHolidays());
    }

    public createHoliday(holiday: HolidayModel) {
        this.store.dispatch(new CreateHoliday(holiday));
    }

    public updateHoliday(holiday: HolidayModel) {
        this.store.dispatch(new UpdateHoliday(holiday));
    }

    public deleteHoliday(holiday: HolidayModel) {
        this.store.dispatch(new DeleteHoliday(holiday));
    }

    public selectCardFlag(cardFlag: CardFlagModel) {
        this.store.dispatch(new SelectCardFlag(cardFlag));
    }

    public loadCardFlags() {
        this.store.dispatch(new LoadCardFlags());
    }

    public createCardFlag(cardFlag: CardFlagModel) {
        this.store.dispatch(new CreateCardFlag(cardFlag));
    }

    public updateCardFlag(cardFlag: CardFlagModel) {
        this.store.dispatch(new UpdateCardFlag(cardFlag));
    }

    public deleteCardFlag(cardFlag: CardFlagModel) {
        this.store.dispatch(new DeleteCardFlag(cardFlag));
    }

    public closeModalBehavior() {
        this.store.dispatch(new CloseBehaviorModal());
    }

    public openModalBreed(editing, data?) {
        this.store.dispatch(new OpenBreedModal({editing, data}));
    }

    public closeModalBreed() {
        this.store.dispatch(new CloseBreedModal());
    }

    public openModalSize(editing, data?) {
        this.store.dispatch(new OpenSizeModal({editing, data}));
    }

    public closeModalSize() {
        this.store.dispatch(new CloseSizeModal());
    }

    public openModalTypeFur(editing, data?) {
        this.store.dispatch(new OpenTypeFurModal({editing, data}));
    }

    public closeModalTypeFur() {
        this.store.dispatch(new CloseTypeFurModal());
    }

    public openModalType(editing, data?) {
        this.store.dispatch(new OpenTypeModal({editing, data}));
    }

    public closeModalType() {
        this.store.dispatch(new CloseTypeModal());
    }

    public openModalRoom(editing, data?) {
        this.store.dispatch(new OpenRoomModal({editing, data}));
    }

    public closeModalRoom() {
        this.store.dispatch(new CloseRoomModal());
    }

    public openModalDistrict(editing, data?) {
        this.store.dispatch(new OpenDistrictModal({editing, data}));
    }

    public closeModalDistrict() {
        this.store.dispatch(new CloseDistrictModal());
    }

    public openModalRegion(editing, data?) {
        this.store.dispatch(new OpenRegionModal({editing, data}));
    }

    public closeModalRegion() {
        this.store.dispatch(new CloseRegionModal());
    }

    public openModalCheck(editing, data?) {
        this.store.dispatch(new OpenCheckModal({editing, data}));
    }

    public closeModalCheck() {
        this.store.dispatch(new CloseCheckModal());
    }

    public openModalPriceVariation(editing, data?) {
        this.store.dispatch(new OpenPriceVariationModal({editing, data}));
    }

    public closeModalPriceVariation() {
        this.store.dispatch(new ClosePriceVariationModal());
    }

    public openModalExceptionDate(editing, data?) {
        this.store.dispatch(new OpenExceptionDateModal({editing, data}));
    }

    public closeModalExceptionDate() {
        this.store.dispatch(new CloseExceptionDateModal());
    }

    public openModalCardFlag(editing, data?) {
        this.store.dispatch(new OpenCardFlagModal({editing, data}));
    }

    public closeModalCardFlag() {
        this.store.dispatch(new CloseCardFlagModal());
    }
}
