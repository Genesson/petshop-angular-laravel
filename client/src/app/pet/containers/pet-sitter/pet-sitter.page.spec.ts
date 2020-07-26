import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetSitterPage} from './pet-sitter.page';

describe('PetSitterPage', () => {
    let component: PetSitterPage;
    let fixture: ComponentFixture<PetSitterPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetSitterPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetSitterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
