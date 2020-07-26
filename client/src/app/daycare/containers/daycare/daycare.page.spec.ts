import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DaycarePage} from './daycare.page';

describe('DaycarePage', () => {
    let component: DaycarePage;
    let fixture: ComponentFixture<DaycarePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DaycarePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DaycarePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
