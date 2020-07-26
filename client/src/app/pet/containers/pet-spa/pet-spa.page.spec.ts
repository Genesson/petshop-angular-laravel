import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetSpaPage} from './pet-spa.page';

describe('PetSpaPage', () => {
    let component: PetSpaPage;
    let fixture: ComponentFixture<PetSpaPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetSpaPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetSpaPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
