import {Action, State, StateContext} from '@ngxs/store';

import {CloseHotelListModal, OpenHotelListModal} from './hotel-list-modal.actions';

import {HotelListModalService} from '../../services/hotel-list-modal.service';

export interface HotelListModalStateModel {
    isLoading: boolean;
}

@State<HotelListModalStateModel>({
    name: 'hotelListModal',
    defaults: {
        isLoading: false
    }
})

export class HotelListModalState {

    constructor(private hotelListModalService: HotelListModalService) {
    }

    @Action(OpenHotelListModal)
    async openHotelListModal(ctx: StateContext<HotelListModalStateModel>) {
        await this.hotelListModalService.open();
    }

    @Action(CloseHotelListModal)
    closeHotelListModal(ctx: StateContext<HotelListModalStateModel>) {
        this.hotelListModalService.close();
    }

}
