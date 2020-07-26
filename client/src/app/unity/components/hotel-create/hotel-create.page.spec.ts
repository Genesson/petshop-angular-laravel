import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotelCreatePage} from './hotel-create.page';

describe('HotelCreatePage', () => {
    let component: HotelCreatePage;
    let fixture: ComponentFixture<HotelCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HotelCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HotelCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
