import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnityCreatePage} from './unity-create.page';

describe('UnityCreatePage', () => {
    let component: UnityCreatePage;
    let fixture: ComponentFixture<UnityCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnityCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnityCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
