import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DaycareCreatePage} from './daycare-create.page';

describe('DaycareCreatePage', () => {
    let component: DaycareCreatePage;
    let fixture: ComponentFixture<DaycareCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DaycareCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DaycareCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
