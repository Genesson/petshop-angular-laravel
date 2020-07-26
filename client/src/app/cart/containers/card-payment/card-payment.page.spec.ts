import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardPaymentPage} from './card-payment.page';

describe('CardPaymentPage', () => {
    let component: CardPaymentPage;
    let fixture: ComponentFixture<CardPaymentPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardPaymentPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardPaymentPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
