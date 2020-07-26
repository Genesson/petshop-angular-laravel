import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TutorViewPage} from './tutor-view.page';

describe('TutorViewPage', () => {
    let component: TutorViewPage;
    let fixture: ComponentFixture<TutorViewPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TutorViewPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TutorViewPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
