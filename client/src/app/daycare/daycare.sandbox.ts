import {Injectable} from '@angular/core';

import {Store} from '@ngxs/store';

import {
    OpenDaycareModal,
    CloseDaycareModal,
    OpenDaycareCheckModal,
    CloseDaycareCheckModal,
    OpenDaycareClassModal,
    CloseDaycareClassModal
} from './state/daycare-modal/daycare-modal.actions';
import {
    OpenHotelListModal,
    CloseHotelListModal
} from './state/hotel-list-modal/hotel-list-modal.actions';

@Injectable({
    providedIn: 'root'
})
export class DaycareSandbox {

    constructor(private store: Store) {
    }

    public openModalDaycare() {
        this.store.dispatch(new OpenDaycareModal());
    }

    public closeModalDaycare() {
        this.store.dispatch(new CloseDaycareModal());
    }

    public openModalDaycareCheck() {
        this.store.dispatch(new OpenDaycareCheckModal());
    }

    public closeModalDaycareCheck() {
        this.store.dispatch(new CloseDaycareCheckModal());
    }

    public openModalDaycareClass() {
        this.store.dispatch(new OpenDaycareClassModal());
    }

    public closeModalDaycareClass() {
        this.store.dispatch(new CloseDaycareClassModal());
    }

    public openModalHotelList() {
        this.store.dispatch(new OpenHotelListModal());
    }

    public closeModalHotelList() {
        this.store.dispatch(new CloseHotelListModal());
    }
}
