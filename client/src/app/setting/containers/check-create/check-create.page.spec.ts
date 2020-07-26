import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckCreatePage} from './check-create.page';

describe('CheckCreatePage', () => {
    let component: CheckCreatePage;
    let fixture: ComponentFixture<CheckCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CheckCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
