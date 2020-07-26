import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetSitterCreatePage} from './pet-sitter-create.page';

describe('PetSitterCreatePage', () => {
    let component: PetSitterCreatePage;
    let fixture: ComponentFixture<PetSitterCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetSitterCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetSitterCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
