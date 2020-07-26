import {Selector} from '@ngxs/store';

import {ProductState, ProductStateModel} from './product.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';
import {ProductProviderState, ProductProviderStateModel} from "../product-provider/product-provider.state";

export class ProductSelectors {
    @Selector([ProductState.entities])
    static entities(entities: ProductStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([ProductState.selected])
    static selected(selected: ProductStateModel['selected']) {
        return selected;
    }

    @Selector([ProductState.isLoading])
    static isLoading(isLoading: ProductStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([ProductState.isLoadingImage])
    static isLoadingImage(isLoadingImage: ProductStateModel['isLoadingImage']) {
        return isLoadingImage;
    }

    @Selector([ProductState.image])
    static image(image: ProductStateModel['image']) {
        return image;
    }

  @Selector([ProductState.isLoadingProductCsv])
  static isLoadingProductCsv(isLoadingProductCsv: ProductStateModel['isLoadingProductCsv']) {
    return isLoadingProductCsv;
  }

  @Selector([ProductState.isLoadingProductProductProviderCsv])
  static isLoadingProductProductProviderCsv(isLoadingProductProductProviderCsv: ProductStateModel['isLoadingProductProductProviderCsv']) {
    return isLoadingProductProductProviderCsv;
  }

}
