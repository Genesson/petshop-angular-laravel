import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TypeCreatePage} from './type-create.page';

describe('TypeCreatePage', () => {
    let component: TypeCreatePage;
    let fixture: ComponentFixture<TypeCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TypeCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
