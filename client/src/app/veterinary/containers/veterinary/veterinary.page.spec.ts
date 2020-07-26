import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VeterinaryPage} from './veterinary.page';

describe('VeterinaryPage', () => {
    let component: VeterinaryPage;
    let fixture: ComponentFixture<VeterinaryPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VeterinaryPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VeterinaryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
