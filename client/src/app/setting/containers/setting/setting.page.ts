import {Component, OnInit} from '@angular/core';

import {AlertController} from '@ionic/angular';

import {SettingSandbox} from '../../setting.sandbox';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
    public behaviorsCollection$ = this.settingSandbox.behaviorsCollection$;
    public isLoadingBehavior$ = this.settingSandbox.isLoadingBehavior$;

    public breedsCollection$ = this.settingSandbox.breedsCollection$;
    public isLoadingBreed$ = this.settingSandbox.isLoadingBreed$;

    public sizesCollection$ = this.settingSandbox.sizesCollection$;
    public isLoadingSize$ = this.settingSandbox.isLoadingSize$;

    public typeFursCollection$ = this.settingSandbox.typeFursCollection$;
    public isLoadingTypeFur$ = this.settingSandbox.isLoadingTypeFur$;

    public typesCollection$ = this.settingSandbox.typesCollection$;
    public isLoadingType$ = this.settingSandbox.isLoadingType$;

    public districtsCollection$ = this.settingSandbox.districtsCollection$;
    public isLoadingDistrict$ = this.settingSandbox.isLoadingDistrict$;

    public roomsCollection$ = this.settingSandbox.roomsCollection$;
    public isLoadingRoom$ = this.settingSandbox.isLoadingRoom$;

    public regionsCollection$ = this.settingSandbox.regionsCollection$;
    public isLoadingRegion$ = this.settingSandbox.isLoadingRegion$;

    public checksCollection$ = this.settingSandbox.checksCollection$;
    public isLoadingCheck$ = this.settingSandbox.isLoadingCheck$;

    public priceVariationsCollection$ = this.settingSandbox
        .priceVariationsCollection$;
    public isLoadingPriceVariation$ = this.settingSandbox
        .isLoadingPriceVariation$;

    public exceptionDatesCollection$ = this.settingSandbox
        .exceptionDatesCollection$;
    public isLoadingExceptionDate$ = this.settingSandbox
        .isLoadingExceptionDate$;

    public holidaysCollection$ = this.settingSandbox.holidaysCollection$;
    public isLoadingHoliday$ = this.settingSandbox.isLoadingHoliday$;

    public cardFlagsCollection$ = this.settingSandbox.cardFlagsCollection$;
    public isLoadingCardFlag$ = this.settingSandbox.isLoadingCardFlag$;

    constructor(
        private settingSandbox: SettingSandbox,
        private alertController: AlertController
    ) {}

    ngOnInit() {
        this.settingSandbox.loadBehaviors();
        this.settingSandbox.loadBreeds();
        this.settingSandbox.loadSizes();
        this.settingSandbox.loadTypeFurs();
        this.settingSandbox.loadTypes();
        this.settingSandbox.loadDistricts();
        this.settingSandbox.loadRooms();
        this.settingSandbox.loadRegions();
        this.settingSandbox.loadChecks();
        this.settingSandbox.loadPriceVariations();
        this.settingSandbox.loadExceptionDates();
        this.settingSandbox.loadHolidays();
        this.settingSandbox.loadCardFlags();
    }

    public presentModalBehavior() {
        this.settingSandbox.openModalBehavior(false);
    }

    public selectBehavior(behavior) {
        this.settingSandbox.openModalBehavior(true, behavior);
    }

    public presentModalBreed() {
        this.settingSandbox.openModalBreed(false);
    }

    public selectBreed(breed) {
        this.settingSandbox.openModalBreed(true, breed);
    }

    public presentModalSize() {
        this.settingSandbox.openModalSize(false);
    }

    public selectSize(size) {
        this.settingSandbox.openModalSize(true, size);
    }

    public presentModalTypeFur() {
        this.settingSandbox.openModalTypeFur(false);
    }

    public selectTypeFur(typeFur) {
        this.settingSandbox.openModalTypeFur(true, typeFur);
    }

    public presentModalType() {
        this.settingSandbox.openModalType(false);
    }

    public selectType(type) {
        this.settingSandbox.openModalType(true, type);
    }

    public presentModalDistrict() {
        this.settingSandbox.openModalDistrict(false);
    }

    public selectDistrict(type) {
        this.settingSandbox.openModalDistrict(true, type);
    }

    public presentModalRoom() {
        this.settingSandbox.openModalRoom(false);
    }

    public selectRoom(room) {
        this.settingSandbox.openModalRoom(true, room);
    }

    public presentModalRegion() {
        this.settingSandbox.openModalRegion(false);
    }

    public selectRegion(room) {
        this.settingSandbox.openModalRegion(true, room);
    }

    public presentModalCheck() {
        this.settingSandbox.openModalCheck(false);
    }

    public selectCheck(check) {
        this.settingSandbox.openModalCheck(true, check);
    }

    public presentModalPriceVariation() {
        this.settingSandbox.openModalPriceVariation(false);
    }

    public selectPriceVariation(check) {
        this.settingSandbox.openModalPriceVariation(true, check);
    }

    public presentModalExceptionDate() {
        this.settingSandbox.openModalExceptionDate(false);
    }

    public selectExceptionDate(exceptionDate) {
        this.settingSandbox.openModalExceptionDate(true, exceptionDate);
    }

    public presentModalCardFlag() {
        this.settingSandbox.openModalCardFlag(false);
    }

    public selectCardFlag(cardFlag) {
        this.settingSandbox.openModalCardFlag(true, cardFlag);
    }

    public updateHoliday(holiday) {
        this.settingSandbox.createHoliday(holiday);
    }

    async confirmDelete(item, model: string) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o registro: <strong>${item.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    },
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.getMethodToDelete(item, model);
                    },
                },
            ],
        });
        await alert.present();
    }

    private getMethodToDelete(item, index) {
        const page = {
            behavior: () => this.settingSandbox.deleteBehavior(item),
            breed: () => this.settingSandbox.deleteBreed(item),
            size: () => this.settingSandbox.deleteSize(item),
            typeFur: () => this.settingSandbox.deleteTypeFur(item),
            type: () => this.settingSandbox.deleteType(item),
            district: () => this.settingSandbox.deleteDistrict(item),
            room: () => this.settingSandbox.deleteRoom(item),
            region: () => this.settingSandbox.deleteRegion(item),
            check: () => this.settingSandbox.deleteCheck(item),
            priceVariation: () =>
                this.settingSandbox.deletePriceVariation(item),
            exceptionDate: () => this.settingSandbox.deleteExceptionDate(item),
            cardFlag: () => this.settingSandbox.deleteCardFlag(item),
        };
        return page[index]();
    }

    String(type: number) {
        return String(type);
    }
}
