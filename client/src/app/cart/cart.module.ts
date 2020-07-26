import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {BrMaskerModule} from 'br-mask';

import {NgxsModule} from '@ngxs/store';

import {CartRoutingModule} from './routers/cart-routing.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {HeaderModalModule} from '../shared/components/header-modal/header-modal.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';
import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';

import {OrderState} from './state/order/order.state';
import {CardPaymentModalState} from './state/card-payment-modal/card-payment-modal.state';

import {CardPaymentModalService} from './services/card-payment-modal.service';

import {CartPage} from './containers/cart/cart.page';
import {CartItensPage} from './components/cart-itens/cart-itens.page';
import {CartTotalPage} from './components/cart-total/cart-total.page';
import {CartDiscountPage} from './components/cart-discount/cart-discount.page';
import {CardPaymentPage} from './containers/card-payment/card-payment.page';
import {CartPetPage} from './components/cart-pet/cart-pet.page';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [
        CartPage,
        CartItensPage,
        CartTotalPage,
        CartDiscountPage,
        CardPaymentPage,
        CartPetPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgxDatatableModule,
        BrMaskerModule,
        BsDatepickerModule,
        CartRoutingModule,
        HeaderModule,
        HeaderModalModule,
        FooterModalModule,
        ValidationMessageModule,
        NgxsModule.forFeature([
            OrderState,
            CardPaymentModalState
        ])
    ],
    providers: [
        CardPaymentModalService
    ],
    entryComponents: [
        CardPaymentPage
    ]
})
export class CartPageModule {
}
