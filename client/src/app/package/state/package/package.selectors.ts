import {Selector} from '@ngxs/store';

import {PackageState, PackageStateModel} from './package.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PackageSelectors {
    @Selector([PackageState.entities])
    static entities(entities: PackageStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PackageState.selected])
    static selected(selected: PackageStateModel['selected']) {
        return selected;
    }

    @Selector([PackageState.isLoading])
    static isLoading(isLoading: PackageStateModel['isLoading']) {
        return isLoading;
    }
}
