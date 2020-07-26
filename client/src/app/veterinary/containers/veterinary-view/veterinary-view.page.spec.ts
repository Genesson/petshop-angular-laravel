import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VeterinaryViewPage} from './veterinary-view.page';

describe('VeterinaryViewPage', () => {
    let component: VeterinaryViewPage;
    let fixture: ComponentFixture<VeterinaryViewPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VeterinaryViewPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VeterinaryViewPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
