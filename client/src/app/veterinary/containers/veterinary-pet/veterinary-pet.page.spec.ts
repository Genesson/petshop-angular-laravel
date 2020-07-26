import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VeterinaryPetPage} from './veterinary-pet.page';

describe('VeterinaryPetPage', () => {
    let component: VeterinaryPetPage;
    let fixture: ComponentFixture<VeterinaryPetPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VeterinaryPetPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VeterinaryPetPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
