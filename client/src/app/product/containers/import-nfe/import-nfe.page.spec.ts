import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportNfePage} from './import-nfe.page';

describe('ImportNfePage', () => {
    let component: ImportNfePage;
    let fixture: ComponentFixture<ImportNfePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImportNfePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImportNfePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
