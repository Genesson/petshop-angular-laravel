import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetProfilePage} from './pet-profile.page';

describe('PetProfilePage', () => {
    let component: PetProfilePage;
    let fixture: ComponentFixture<PetProfilePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetProfilePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetProfilePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
