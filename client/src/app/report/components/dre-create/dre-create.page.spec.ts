import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DreCreatePage} from './dre-create.page';

describe('DreCreatePage', () => {
    let component: DreCreatePage;
    let fixture: ComponentFixture<DreCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DreCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DreCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
