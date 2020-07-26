import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {BrMaskerModule} from 'br-mask';

import {NgxsModule} from '@ngxs/store';

import {ProductRoutingModule} from './routers/product-routing.module';

import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {FooterButtonModule} from '../shared/components/footer-button/footer-button.module';
import {FileModule} from '../shared/components/file/file.module';
import {HeaderModalModule} from '../shared/components/header-modal/header-modal.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';

import {ProductState} from './state/product/product.state';
import {ProductCategoryState} from './state/product-category/product-category.state';
import {ProductProviderState} from './state/product-provider/product-provider.state';
import {XmlState} from './state/xml/xml.state';
import {ProductModalState} from './state/product-modal/product-modal.state';
import {ProductCategoryModalState} from './state/product-category-modal/product-category-modal.state';
import {ProductProviderModalState} from './state/product-provider-modal/product-provider-modal.state';
import {ProductViewModalState} from './state/product-view-modal/product-view-modal.state';
import {ImportModalState} from './state/import-modal/import-modal.state';

import {ProductModalService} from './services/product-modal.service';
import {ProductCategoryModalService} from './services/product-category-modal.service';
import {ProductProviderModalService} from './services/product-provider-modal.service';
import {ProductViewModalService} from './services/product-view-modal.service';
import {ImportModalService} from './services/import-modal.service';

import {ProductPage} from './containers/product/product.page';
import {ProductCreatePage} from './containers/product-create/product-create.page';
import {ProductCategoryCreatePage} from './containers/product-category-create/product-category-create.page';
import {ProductProviderCreatePage} from './containers/product-provider-create/product-provider-create.page';
import {ProductViewPage} from './containers/product-view/product-view.page';
import {ImportNfePage} from './containers/import-nfe/import-nfe.page';
import {DataNfeComponent} from './components/data-nfe/data-nfe.component';
import {DataProviderComponent} from './components/data-provider/data-provider.component';
import {DataProductsComponent} from './components/data-products/data-products.component';
import {ProductGeneralTabsComponent} from './components/product-general-tabs/product-general-tabs.component';
import {ProductTabsComponent} from './components/product-tabs/product-tabs.component';

@NgModule({
    declarations: [
        ProductPage,
        ProductCreatePage,
        ProductCategoryCreatePage,
        ProductProviderCreatePage,
        ProductViewPage,
        ImportNfePage,
        DataNfeComponent,
        DataProviderComponent,
        DataProductsComponent,
        ProductGeneralTabsComponent,
        ProductTabsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgxDatatableModule,
        BrMaskerModule,
        ProductRoutingModule,
        NgxsModule.forFeature([
            ProductState,
            ProductCategoryState,
            ProductProviderState,
            XmlState,
            ProductModalState,
            ProductCategoryModalState,
            ProductProviderModalState,
            ProductViewModalState,
            ImportModalState
        ]),
        ValidationMessageModule,
        HeaderModule,
        FooterButtonModule,
        FileModule,
        HeaderModalModule,
        FooterModalModule
    ],
    providers: [
        ProductModalService,
        ProductCategoryModalService,
        ProductProviderModalService,
        ProductViewModalService,
        ImportModalService
    ],
    entryComponents: [
        ProductCreatePage,
        ProductCategoryCreatePage,
        ProductProviderCreatePage,
        ProductViewPage,
        ImportNfePage
    ]
})
export class ProductModule {
}
