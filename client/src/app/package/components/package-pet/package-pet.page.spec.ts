import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PackagePetPage} from './package-pet.page';

describe('PackagePetPage', () => {
    let component: PackagePetPage;
    let fixture: ComponentFixture<PackagePetPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PackagePetPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PackagePetPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
