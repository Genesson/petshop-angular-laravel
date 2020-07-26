import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetCartPage} from './pet-cart.page';

describe('PetCartPage', () => {
    let component: PetCartPage;
    let fixture: ComponentFixture<PetCartPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetCartPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetCartPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
