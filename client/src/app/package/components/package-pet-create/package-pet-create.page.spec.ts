import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PackagePetCreatePage} from './package-pet-create.page';

describe('PackagePetCreatePage', () => {
    let component: PackagePetCreatePage;
    let fixture: ComponentFixture<PackagePetCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PackagePetCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PackagePetCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
