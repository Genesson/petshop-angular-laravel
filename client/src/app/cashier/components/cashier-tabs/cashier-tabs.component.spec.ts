import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CashierTabsComponent} from './cashier-tabs.component';

describe('CashierTabsComponent', () => {
    let component: CashierTabsComponent;
    let fixture: ComponentFixture<CashierTabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashierTabsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashierTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
