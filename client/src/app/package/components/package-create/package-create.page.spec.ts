import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PackageCreatePage} from './package-create.page';

describe('PackageCreatePage', () => {
    let component: PackageCreatePage;
    let fixture: ComponentFixture<PackageCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PackageCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PackageCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
