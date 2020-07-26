import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TotalDaysHotelPage} from './total-days-hotel.page';

describe('TotalDaysHotelPage', () => {
    let component: TotalDaysHotelPage;
    let fixture: ComponentFixture<TotalDaysHotelPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TotalDaysHotelPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TotalDaysHotelPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
