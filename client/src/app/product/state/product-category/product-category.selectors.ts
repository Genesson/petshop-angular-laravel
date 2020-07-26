import {Selector} from '@ngxs/store';

import {ProductCategoryState, ProductCategoryStateModel} from './product-category.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class ProductCategorySelectors {
  @Selector([ProductCategoryState.entities])
  static entities(entities: ProductCategoryStateModel['entities']) {
    return new NgxsEntityStateSelector().getEntities(entities);
  }

  @Selector([ProductCategoryState.selected])
  static selected(selected: ProductCategoryStateModel['selected']) {
    return selected;
  }

  @Selector([ProductCategoryState.isLoading])
  static isLoading(isLoading: ProductCategoryStateModel['isLoading']) {
    return isLoading;
  }
}
