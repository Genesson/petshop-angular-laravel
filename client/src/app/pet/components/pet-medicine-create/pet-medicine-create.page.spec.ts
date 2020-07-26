import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetMedicineCreatePage} from './category-create.page';

describe('CategoryCreatePage', () => {
    let component: PetMedicineCreatePage;
    let fixture: ComponentFixture<PetMedicineCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetMedicineCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetMedicineCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
