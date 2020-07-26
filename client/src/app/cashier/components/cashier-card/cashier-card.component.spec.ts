import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CashierCardComponent} from './cashier-card.component';

describe('CashierCardComponent', () => {
    let component: CashierCardComponent;
    let fixture: ComponentFixture<CashierCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashierCardComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashierCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
