import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetVaccineCreatePage} from './category-create.page';

describe('CategoryCreatePage', () => {
    let component: PetVaccineCreatePage;
    let fixture: ComponentFixture<PetVaccineCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetVaccineCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetVaccineCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
