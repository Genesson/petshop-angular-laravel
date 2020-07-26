import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AlertController} from '@ionic/angular';

import {UnitySandbox} from '../../unity.sandbox';

import {ServiceModel} from '../../../shared/models/service.model';

import {PeriodType} from '../../../shared/enums/period.enum';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.page.html',
    styleUrls: ['./service-list.page.scss'],
})
export class ServiceListPage implements OnInit {

    @Input() services: ServiceModel[];

    @Input() subServices: ServiceModel[];

    @Input() showers: ServiceModel[];

    @Input() subShowers: any[];

    @Input() transports: ServiceModel[];

    @Input() dayCares: ServiceModel[];

    @Input() hotels: ServiceModel[];

    @Input() petSitters: ServiceModel[];

    @Input() others: ServiceModel[];

    @ViewChild('shower', {static: false}) shower;

    @ViewChild('transport', {static: false}) transport;

    @ViewChild('dayCare', {static: false}) dayCare;

    @ViewChild('hotel', {static: false}) hotel;

    @ViewChild('petSitter', {static: false}) petSitter;

    @ViewChild('other', {static: false}) other;

    public periodType = PeriodType;

    constructor(private unitySandbox: UnitySandbox,
                private alertController: AlertController) {
    }

    ngOnInit() {
    }

    public getOpenTemplate(label) {
        const page = {
            SHOWER: () => this.shower,
            TRANSPORT: () => this.transport,
            DAY_CARE: () => this.dayCare,
            HOTEL: () => this.hotel,
            PET_SITTER: () => this.petSitter,
            OTHER: () => this.other
        };
        return page[label]();
    }

    async presentModalService(editing = false, service?) {
        this.unitySandbox.openModalService(editing, service);
    }

    async presentModalShower(editing = false, service?) {
        this.unitySandbox.openModalShower(editing, service);
    }

    async presentModalSubShower(editing = false, service?) {
        this.unitySandbox.openModalSubShower(editing, service);
    }

    async presentModalTransport(editing = false, service?) {
        this.unitySandbox.openModalTransport(editing, service);
    }

    async presentModalDayCare(editing = false, service?) {
        this.unitySandbox.openModalDayCare(editing, service);
    }

    async presentModalHotel(editing = false, service?) {
        this.unitySandbox.openModalHotel(editing, service);
    }

    async presentModalPetSitter(editing = false, service?) {
        this.unitySandbox.openModalPetSitter(editing, service);
    }

    async presentModalOther(editing = false, service?) {
        this.unitySandbox.openModalOther(editing, service);
    }

    async confirmSubService(service) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir a subcategoria: <strong>${service.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deleteSubService(service);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmShower(service) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o banho porte: <strong>${service.size.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deleteShower(service);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmSubShower(service) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o serviço: <strong>${service.size.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deleteSubShower(service);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmTransport(service) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o transporte: <strong>${service.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deleteTransport(service);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmDayCare(service) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir a creche porte: <strong>${service.size.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deleteDayCare(service);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmHotel(service) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o hotel porte: <strong>${service.size.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deleteHotel(service);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmPetSitter(service) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o pet sitter: <strong>${service.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deletePetSitter(service);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmOther(service) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o serviço: <strong>${service.description}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.unitySandbox.deleteOther(service);
                    }
                }
            ]
        });
        await alert.present();
    }

  changeStatusService(service) {
    this.unitySandbox.updateStatusService(service.id);
  }

}
