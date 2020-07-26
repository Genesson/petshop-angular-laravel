import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartTotalPage} from './cart-total.page';

describe('CartTotalPage', () => {
    let component: CartTotalPage;
    let fixture: ComponentFixture<CartTotalPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartTotalPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartTotalPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
