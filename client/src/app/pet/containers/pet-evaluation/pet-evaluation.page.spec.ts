import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetEvaluationPage} from './pet-evaluation.page';

describe('PetEvaluationPage', () => {
    let component: PetEvaluationPage;
    let fixture: ComponentFixture<PetEvaluationPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetEvaluationPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetEvaluationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
