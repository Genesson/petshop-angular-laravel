import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CashierModalPage} from './cashier-modal.page';

describe('CashierModalPage', () => {
    let component: CashierModalPage;
    let fixture: ComponentFixture<CashierModalPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashierModalPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashierModalPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
