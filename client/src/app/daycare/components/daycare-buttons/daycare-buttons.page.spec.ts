import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DaycareButtonsPage} from './daycare-buttons.page';

describe('DaycareButtonsPage', () => {
    let component: DaycareButtonsPage;
    let fixture: ComponentFixture<DaycareButtonsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DaycareButtonsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DaycareButtonsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
