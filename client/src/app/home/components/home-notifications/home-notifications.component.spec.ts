import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeNotificationsComponent} from './home-notifications.component';

describe('HomeNotificationsComponent', () => {
    let component: HomeNotificationsComponent;
    let fixture: ComponentFixture<HomeNotificationsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeNotificationsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeNotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
