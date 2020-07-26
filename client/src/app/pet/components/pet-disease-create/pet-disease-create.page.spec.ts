import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetDiseaseCreatePage} from './pet-disease-create.page';

describe('PetDiseaseCreatePage', () => {
    let component: PetDiseaseCreatePage;
    let fixture: ComponentFixture<PetDiseaseCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetDiseaseCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetDiseaseCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
