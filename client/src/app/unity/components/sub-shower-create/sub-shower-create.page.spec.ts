import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubShowerCreatePage} from './sub-shower-create.page';

describe('SubShowerCreatePage', () => {
    let component: SubShowerCreatePage;
    let fixture: ComponentFixture<SubShowerCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubShowerCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubShowerCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
