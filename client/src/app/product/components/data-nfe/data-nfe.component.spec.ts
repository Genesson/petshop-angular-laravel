import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataNfeComponent} from './data-nfe.component';

describe('DataNfeComponent', () => {
    let component: DataNfeComponent;
    let fixture: ComponentFixture<DataNfeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DataNfeComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataNfeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
