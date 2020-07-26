import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DistrictCreatePage} from './district-create.page';

describe('DistrictCreatePage', () => {
    let component: DistrictCreatePage;
    let fixture: ComponentFixture<DistrictCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DistrictCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DistrictCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
