import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CashierReceiveViewPage} from './cashier-receive-view.page';

describe('CashierReceiveViewPage', () => {
    let component: CashierReceiveViewPage;
    let fixture: ComponentFixture<CashierReceiveViewPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashierReceiveViewPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CashierReceiveViewPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
