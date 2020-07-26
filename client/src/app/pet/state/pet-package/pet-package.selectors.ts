import {Selector} from '@ngxs/store';

import {PetPackageState, PetPackageStateModel} from './pet-package.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PetPackageSelectors {
    @Selector([PetPackageState.entities])
    static entities(entities: PetPackageStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PetPackageState.selected])
    static selected(selected: PetPackageStateModel['selected']) {
        return selected;
    }

    @Selector([PetPackageState.isLoading])
    static isLoading(isLoading: PetPackageStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([PetPackageState.intervals])
    static intervals(intervals: PetPackageStateModel['intervals']) {
        return intervals;
    }
}
