import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DreDatatableComponent} from './dre-datatable.component';

describe('DreDatatableComponent', () => {
    let component: DreDatatableComponent;
    let fixture: ComponentFixture<DreDatatableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DreDatatableComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DreDatatableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
