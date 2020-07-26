import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScheduleCreatePage} from './schedule-create.page';

describe('ScheduleCreatePage', () => {
    let component: ScheduleCreatePage;
    let fixture: ComponentFixture<ScheduleCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScheduleCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
