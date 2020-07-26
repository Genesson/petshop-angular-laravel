import {Selector} from '@ngxs/store';

import {XmlState, XmlStateModel} from './xml.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class XmlSelectors {
    @Selector([XmlState.entities])
    static entities(entities: XmlStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([XmlState.selected])
    static selected(selected: XmlStateModel['selected']) {
        return selected;
    }

    @Selector([XmlState.isLoading])
    static isLoading(isLoading: XmlStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([XmlState.xml])
    static xml(xml: XmlStateModel['xml']) {
        return xml;
    }
}
