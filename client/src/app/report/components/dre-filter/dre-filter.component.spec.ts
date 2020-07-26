import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DreFilterComponent} from './dre-filter.component';

describe('DreFilterComponent', () => {
    let component: DreFilterComponent;
    let fixture: ComponentFixture<DreFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DreFilterComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DreFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
