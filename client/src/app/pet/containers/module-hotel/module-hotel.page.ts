import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AlertController, ToastController} from '@ionic/angular';

import {PetSandbox} from '../../pet.sandbox';
import {ScheduleSandbox} from '../../../schedule/schedule.sandbox';
import {SettingSandbox} from '../../../setting/setting.sandbox';
import {SessionSandbox} from '../../../session/session.sandbox';

import {PetModel} from '../../../shared/models/pet.model';
import {RoomModel} from '../../../shared/models/room.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-module-hotel',
    templateUrl: './module-hotel.page.html',
    styleUrls: ['./module-hotel.page.scss'],
})
export class ModuleHotelPage implements OnInit, OnDestroy {
    @Input() pet: PetModel;

    public roomsCollection$ = this.settingSandbox.roomsCollection$;

    public checksCollection$ = this.settingSandbox.checksCollection$;

    public checkIn$ = this.settingSandbox.checkIn$;

    public checkOut$ = this.settingSandbox.checkOut$;

    public serviceHotel = this.settingSandbox.serviceHotel;

    public userData = this.sessionSandbox.userData;

    public isLoadingDaily$ = this.petSandbox.isLoadingDaily$;

    public daily$ = this.petSandbox.daily$;

    public formGroup: FormGroup;

    public selectedRoom: number;

    private subscriptions = new Subscription();

    constructor(
        private petSandbox: PetSandbox,
        private scheduleSandbox: ScheduleSandbox,
        private settingSandbox: SettingSandbox,
        private sessionSandbox: SessionSandbox,
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private toastController: ToastController
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            service: [null],
            date_checkin: ['', [Validators.required]],
            hour_checkin: ['', [Validators.required]],
            date_checkout: ['', [Validators.required]],
            hour_checkout: ['', [Validators.required]],
            room: ['', [Validators.required]],
            daily: ['', [Validators.required]],
            pet: ['', [Validators.required]],
            total: [null, [Validators.required]],
        });
    }

    ngOnInit() {
        this.settingSandbox.loadRooms();
        this.settingSandbox.loadChecks();

        if (this.pet) {
            this.formGroup.get('service').patchValue(this.serviceHotel.id);
            this.formGroup.get('pet').patchValue(this.pet);
        }

        this.subscriptions.add(
            this.daily$.subscribe((daily) => {
                this.formGroup.get('total').patchValue(daily.daily_amount);
                this.formGroup.get('daily').patchValue(daily.days);
            })
        );
    }

    public calculateDaily() {
        if (this.validCalculate()) {
            const dateStart = new Date(this.formGroup.value.date_checkin)
                .toISOString()
                .substr(0, 10);
            const hourStart = new Date(this.formGroup.value.hour_checkin)
                .toISOString()
                .substr(11, 8);
            const dateEnd = new Date(this.formGroup.value.date_checkout)
                .toISOString()
                .substr(0, 10);
            const hourEnd = new Date(this.formGroup.value.hour_checkout)
                .toISOString()
                .substr(11, 8);

            const newStart = new Date(
                this.formGroup.value.date_checkin
            ).setHours(
                new Date(this.formGroup.value.hour_checkin).getHours(),
                new Date(this.formGroup.value.hour_checkin).getMinutes()
            );
            const newEnd = new Date(
                this.formGroup.value.date_checkout
            ).setHours(
                new Date(this.formGroup.value.hour_checkout).getHours(),
                new Date(this.formGroup.value.hour_checkout).getMinutes()
            );

            if (newEnd < newStart) {
                this.formGroup.get('hour_checkout').patchValue('');
                return this.presentToast(
                    'Data de Check-out deve ser maior que a de check-in!',
                    'danger'
                );
            }
            this.petSandbox.loadDailyCalculation(
                dateStart,
                hourStart,
                dateEnd,
                hourEnd,
                this.userData.unity,
                this.pet.size.id
            );
        }
    }

    private validCalculate() {
        return (
            this.formGroup.get('date_checkin').valid &&
            this.formGroup.get('hour_checkin').valid &&
            this.formGroup.get('date_checkout').valid &&
            this.formGroup.get('hour_checkout').valid
        );
    }

    async presentToast(msg, type: string = 'success') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: type,
        });
        toast.present();
    }

    public selectRoom(room: RoomModel) {
        this.selectedRoom = room.id;
        this.formGroup.get('room').patchValue(room);
    }

    async confirmPet(pet) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o pet: <strong>${pet.name}</strong>?`,
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
                        this.pet = null;
                    },
                },
            ],
        });
        await alert.present();
    }

    public onClickCancel() {
        this.petSandbox.closeModalModuleHotel();
    }

    public onClickConfirm() {
        this.scheduleSandbox.createSchedule(this.formGroup.value);
    }

    String(type: number) {
        return String(type);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
