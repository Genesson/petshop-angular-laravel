import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductCategoryCreatePage} from './product-category-create.page';

describe('ProductCategoryCreatePage', () => {
    let component: ProductCategoryCreatePage;
    let fixture: ComponentFixture<ProductCategoryCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductCategoryCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductCategoryCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
