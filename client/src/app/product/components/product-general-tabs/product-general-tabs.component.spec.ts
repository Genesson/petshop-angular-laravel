import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductGeneralTabsComponent} from './product-general-tabs.component';

describe('ProductGeneralTabsComponent', () => {
    let component: ProductGeneralTabsComponent;
    let fixture: ComponentFixture<ProductGeneralTabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductGeneralTabsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductGeneralTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
