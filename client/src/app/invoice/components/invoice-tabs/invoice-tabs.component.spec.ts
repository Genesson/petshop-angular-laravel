import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceTabsComponent} from './invoice-tabs.component';

describe('InvoiceTabsComponent', () => {
    let component: InvoiceTabsComponent;
    let fixture: ComponentFixture<InvoiceTabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InvoiceTabsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InvoiceTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
