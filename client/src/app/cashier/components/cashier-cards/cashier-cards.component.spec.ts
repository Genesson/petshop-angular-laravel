import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CashierCardsComponent} from './cashier-cards.component';

describe('CashierCardsComponent', () => {
    let component: CashierCardsComponent;
    let fixture: ComponentFixture<CashierCardsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashierCardsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashierCardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
