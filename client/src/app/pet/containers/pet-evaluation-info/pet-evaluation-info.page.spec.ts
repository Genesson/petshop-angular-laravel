import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PetEvaluationInfoPage} from './pet-evaluation-info.page';

describe('PetEvaluationInfoPage', () => {
    let component: PetEvaluationInfoPage;
    let fixture: ComponentFixture<PetEvaluationInfoPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetEvaluationInfoPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetEvaluationInfoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
