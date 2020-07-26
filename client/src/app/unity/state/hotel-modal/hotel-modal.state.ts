import {Action, State, StateContext} from '@ngxs/store';

import {OpenHotelModal, CloseHotelModal} from './hotel-modal.actions';

import {HotelModalService} from '../../services/hotel-modal.service';

export interface HotelModalStateModel {
    isLoading: boolean;
}

@State<HotelModalStateModel>({
    name: 'hotelModal',
    defaults: {
        isLoading: false
    }
})

export class HotelModalState {

    constructor(private hotelModalService: HotelModalService) {
    }

    @Action(OpenHotelModal)
    async openHotelModal(ctx: StateContext<HotelModalStateModel>, {payload}: OpenHotelModal) {
        await this.hotelModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseHotelModal)
    closeHotelModal(ctx: StateContext<HotelModalStateModel>) {
        this.hotelModalService.close();
    }
}
