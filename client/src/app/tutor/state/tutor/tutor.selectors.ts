import {Selector} from '@ngxs/store';

import {ContactStateModel, TutorState, TutorStateModel} from './tutor.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';
import {PetStateModel} from '../../../pet/state/pet/pet.state';

export class TutorSelectors {
  @Selector([TutorState.entities])
  static entities(entities: TutorStateModel['entities']) {
    return new NgxsEntityStateSelector().getEntities(entities);
  }

  @Selector([TutorState.selected])
  static selected(selected: TutorStateModel['selected']) {
    return selected;
  }

  @Selector([TutorState.isLoading])
  static isLoading(isLoading: TutorStateModel['isLoading']) {
    return isLoading;
  }

  @Selector([TutorState.isLoadingImage])
  static isLoadingImage(isLoadingImage: TutorStateModel['isLoadingImage']) {
    return isLoadingImage;
  }

  @Selector([TutorState.isLoadingCsv])
  static isLoadingCsv(isLoadingCsv: TutorStateModel['isLoadingCsv']) {
    return isLoadingCsv;
  }

  @Selector([TutorState.isLoadingContactsCsv])
  static isLoadingContactsCsv(isLoadingContactsCsv: ContactStateModel['isLoadingContactsCsv']) {
    return isLoadingContactsCsv;
  }

  @Selector([TutorState.image])
  static image(image: TutorStateModel['image']) {
    return image;
  }

  @Selector([TutorState.csv])
  static csv(csv: TutorStateModel['csv']) {
    return csv;
  }

  @Selector([TutorState.paginator])
  static paginator(paginator: TutorStateModel['paginator']) {
    return paginator;
  }
}
