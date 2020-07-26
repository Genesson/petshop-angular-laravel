import {Selector} from '@ngxs/store';

import {PetState, PetStateModel} from './pet.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PetSelectors {
    @Selector([PetState.entities])
    static entities(entities: PetStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PetState.selected])
    static selected(selected: PetStateModel['selected']) {
        return selected;
    }

    @Selector([PetState.image])
    static image(image: PetStateModel['image']) {
        return image;
    }

    @Selector([PetState.imageCarter])
    static imageCarter(imageCarter: PetStateModel['imageCarter']) {
        return imageCarter;
    }

    @Selector([PetState.isLoading])
    static isLoading(isLoading: PetStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([PetState.isLoadingImage])
    static isLoadingImage(isLoadingImage: PetStateModel['isLoadingImage']) {
        return isLoadingImage;
    }

    @Selector([PetState.isLoadingImageCarter])
    static isLoadingImageCarter(isLoadingImageCarter: PetStateModel['isLoadingImageCarter']) {
        return isLoadingImageCarter;
    }

  @Selector([PetState.isLoadingPetsCsv])
  static isLoadingPetsCsv(isLoadingPetsCsv: PetStateModel['isLoadingPetsCsv']) {
    return isLoadingPetsCsv;
  }
}
