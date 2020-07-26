import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetPackagePage} from './pet-package.page';

describe('PetPackagePage', () => {
    let component: PetPackagePage;
    let fixture: ComponentFixture<PetPackagePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetPackagePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetPackagePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
