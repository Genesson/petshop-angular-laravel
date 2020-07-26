import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetServicePage} from './pet-service.page';

describe('PetServicePage', () => {
    let component: PetServicePage;
    let fixture: ComponentFixture<PetServicePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetServicePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetServicePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
