import {Selector} from '@ngxs/store';

import {PermissionState, PermissionStateModel} from './permission.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PermissionSelectors {
    @Selector([PermissionState.entities])
    static entities(entities: PermissionStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PermissionState.selected])
    static selected(selected: PermissionStateModel['selected']) {
        return selected;
    }

    @Selector([PermissionState.isLoading])
    static isLoading(isLoading: PermissionStateModel['isLoading']) {
        return isLoading;
    }
}
