import {Selector} from '@ngxs/store';

import {UserState, UserStateModel} from './user.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

import { UserModel } from '../../../shared/models/user.model';

export class UserSelectors {
    @Selector([UserState.entities])
    static entities(entities: UserStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([UserState.entities])
    static entitiesSchedule(entities: UserStateModel['entities']) {
      return new NgxsEntityStateSelector()
        .getEntities(entities)
        .filter((user: UserModel) => user.role === 'GERENTE_BANHO_TOSA' || user.role === 'TOSADOR' || user.role === 'BANHISTA');
    }

    @Selector([UserState.selected])
    static selected(selected: UserStateModel['selected']) {
        return selected;
    }

    @Selector([UserState.isLoading])
    static isLoading(isLoading: UserStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([UserState.isLoadingUnity])
    static isLoadingUnity(isLoadingUnity: UserStateModel['isLoadingUnity']) {
        return isLoadingUnity;
    }

    @Selector([UserState.isLoadingImage])
    static isLoadingImage(isLoadingImage: UserStateModel['isLoadingImage']) {
        return isLoadingImage;
    }

    @Selector([UserState.image])
    static image(image: UserStateModel['image']) {
        return image;
    }
}
