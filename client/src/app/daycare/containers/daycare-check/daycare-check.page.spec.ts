import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DaycareCheckPage} from './daycare-check.page';

describe('DaycareCheckPage', () => {
    let component: DaycareCheckPage;
    let fixture: ComponentFixture<DaycareCheckPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DaycareCheckPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DaycareCheckPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
