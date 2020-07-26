import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductProviderCreatePage} from './product-provider-create.page';

describe('ProductProviderCreatePage', () => {
    let component: ProductProviderCreatePage;
    let fixture: ComponentFixture<ProductProviderCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductProviderCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductProviderCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
