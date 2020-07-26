import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserTabsComponent} from './user-tabs.component';

describe('UserTabsComponent', () => {
    let component: UserTabsComponent;
    let fixture: ComponentFixture<UserTabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserTabsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
