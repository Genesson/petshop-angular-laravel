import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetCreatePage} from './pet-create.page';

describe('PetCreatePage', () => {
    let component: PetCreatePage;
    let fixture: ComponentFixture<PetCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
