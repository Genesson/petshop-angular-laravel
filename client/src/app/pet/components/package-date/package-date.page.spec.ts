import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PackageDatePage} from './package-date.page';

describe('PackageDatePage', () => {
    let component: PackageDatePage;
    let fixture: ComponentFixture<PackageDatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PackageDatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PackageDatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
