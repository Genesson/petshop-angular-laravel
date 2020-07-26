import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeRequestsComponent} from './home-requests.component';

describe('HomeRequestsComponent', () => {
    let component: HomeRequestsComponent;
    let fixture: ComponentFixture<HomeRequestsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeRequestsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeRequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
