import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetCartModalPage} from './pet-cart-modal.page';

describe('PetCartModalPage', () => {
    let component: PetCartModalPage;
    let fixture: ComponentFixture<PetCartModalPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetCartModalPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetCartModalPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
