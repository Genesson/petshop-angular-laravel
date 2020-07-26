import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotelFilterListComponent} from './hotel-filter-list.component';

describe('HotelFilterListComponent', () => {
    let component: HotelFilterListComponent;
    let fixture: ComponentFixture<HotelFilterListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HotelFilterListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HotelFilterListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
