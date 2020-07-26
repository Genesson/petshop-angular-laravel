import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BehaviorCreatePage} from './behavior-create.page';

describe('BehaviorCreatePage', () => {
    let component: BehaviorCreatePage;
    let fixture: ComponentFixture<BehaviorCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BehaviorCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BehaviorCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
