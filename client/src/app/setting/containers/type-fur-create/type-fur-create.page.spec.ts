import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TypeFurCreatePage} from './type-fur-create.page';

describe('TypeFurCreatePage', () => {
    let component: TypeFurCreatePage;
    let fixture: ComponentFixture<TypeFurCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TypeFurCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypeFurCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
