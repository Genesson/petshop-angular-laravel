import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataProviderComponent} from './data-provider.component';

describe('DataProviderComponent', () => {
    let component: DataProviderComponent;
    let fixture: ComponentFixture<DataProviderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DataProviderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DataProviderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
