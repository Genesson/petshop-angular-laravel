import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { PetOthersPage } from './pet-others.page';

describe('PetOthersPage', () => {
    let component: PetOthersPage;
    let fixture: ComponentFixture<PetOthersPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetOthersPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetOthersPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
