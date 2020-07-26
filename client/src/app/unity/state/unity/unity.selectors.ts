import {Selector} from '@ngxs/store';

import {UnityState, UnityStateModel} from './unity.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class UnitySelectors {
    @Selector([UnityState.entities])
    static entities(entities: UnityStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([UnityState.selected])
    static selected(selected: UnityStateModel['selected']) {
        return selected;
    }

    @Selector([UnityState.isLoading])
    static isLoading(isLoading: UnityStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([UnityState.isLoadingImage])
    static isLoadingImage(isLoadingImage: UnityStateModel['isLoadingImage']) {
        return isLoadingImage;
    }

    @Selector([UnityState.image])
    static image(image: UnityStateModel['image']) {
        return image;
    }
}
