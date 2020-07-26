import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResponsibleCreatePage} from './behavior-create.page';

describe('BehaviorCreatePage', () => {
    let component: ResponsibleCreatePage;
    let fixture: ComponentFixture<ResponsibleCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResponsibleCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResponsibleCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
