import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DayCareCreatePage} from './day-care-create.page';

describe('DayCareCreatePage', () => {
    let component: DayCareCreatePage;
    let fixture: ComponentFixture<DayCareCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DayCareCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DayCareCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
