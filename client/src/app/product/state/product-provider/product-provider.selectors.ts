import {Selector} from '@ngxs/store';

import {ProductProviderState, ProductProviderStateModel} from './product-provider.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class ProductProviderSelectors {
  @Selector([ProductProviderState.entities])
  static entities(entities: ProductProviderStateModel['entities']) {
    return new NgxsEntityStateSelector().getEntities(entities);
  }

  @Selector([ProductProviderState.selected])
  static selected(selected: ProductProviderStateModel['selected']) {
    return selected;
  }

  @Selector([ProductProviderState.isLoading])
  static isLoading(isLoading: ProductProviderStateModel['isLoading']) {
    return isLoading;
  }

  @Selector([ProductProviderState.isLoadingProductProviderCsv])
  static isLoadingProductProviderCsv(isLoadingProductProviderCsv: ProductProviderStateModel['isLoadingProductProviderCsv']) {
    return isLoadingProductProviderCsv;
  }
}
