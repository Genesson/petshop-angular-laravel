import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CashierReceivePage} from './cashier-receive.page';

describe('CashierReceivePage', () => {
    let component: CashierReceivePage;
    let fixture: ComponentFixture<CashierReceivePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashierReceivePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashierReceivePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
