import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegionCreatePage} from './region-create.page';

describe('RegionCreatePage', () => {
    let component: RegionCreatePage;
    let fixture: ComponentFixture<RegionCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegionCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegionCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
