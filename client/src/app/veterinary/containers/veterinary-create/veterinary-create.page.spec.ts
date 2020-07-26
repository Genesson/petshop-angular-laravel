import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VeterinaryCreatePage} from './veterinary-create.page';

describe('VeterinaryCreatePage', () => {
    let component: VeterinaryCreatePage;
    let fixture: ComponentFixture<VeterinaryCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VeterinaryCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VeterinaryCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
