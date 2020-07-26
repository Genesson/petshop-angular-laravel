import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PriceVariationCreatePage} from './price-variation-create.page';

describe('PriceVariationCreatePage', () => {
    let component: PriceVariationCreatePage;
    let fixture: ComponentFixture<PriceVariationCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PriceVariationCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceVariationCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
