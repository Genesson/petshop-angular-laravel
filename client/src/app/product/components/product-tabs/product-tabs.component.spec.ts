import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductTabsComponent} from './product-tabs.component';

describe('ProductTabsComponent', () => {
    let component: ProductTabsComponent;
    let fixture: ComponentFixture<ProductTabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductTabsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
