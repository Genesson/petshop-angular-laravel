import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartItensPage} from './cart-itens.page';

describe('CartItensPage', () => {
    let component: CartItensPage;
    let fixture: ComponentFixture<CartItensPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartItensPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartItensPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
