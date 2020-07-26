import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryCreatePage} from './category-create.page';

describe('CategoryCreatePage', () => {
    let component: CategoryCreatePage;
    let fixture: ComponentFixture<CategoryCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoryCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
