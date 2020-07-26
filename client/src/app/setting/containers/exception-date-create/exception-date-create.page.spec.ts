import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExceptionDateCreatePage} from './exception-date-create.page';

describe('ExceptionDateCreatePage', () => {
    let component: ExceptionDateCreatePage;
    let fixture: ComponentFixture<ExceptionDateCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExceptionDateCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExceptionDateCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
