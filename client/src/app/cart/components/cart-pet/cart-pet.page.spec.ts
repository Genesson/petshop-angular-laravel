import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartPetPage} from './cart-pet.page';

describe('CartPetPage', () => {
    let component: CartPetPage;
    let fixture: ComponentFixture<CartPetPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CartPetPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartPetPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
