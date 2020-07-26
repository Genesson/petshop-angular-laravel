import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SizeCreatePage} from './size-create.page';

describe('SizeCreatePage', () => {
    let component: SizeCreatePage;
    let fixture: ComponentFixture<SizeCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SizeCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SizeCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
