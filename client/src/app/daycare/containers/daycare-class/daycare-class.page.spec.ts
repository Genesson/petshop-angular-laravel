import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DaycareClassPage} from './daycare-class.page';

describe('DaycareClassPage', () => {
    let component: DaycareClassPage;
    let fixture: ComponentFixture<DaycareClassPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DaycareClassPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DaycareClassPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
