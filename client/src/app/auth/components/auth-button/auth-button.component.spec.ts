import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthButtonComponent} from './auth-button.component';

describe('AuthButtonComponent', () => {
    let component: AuthButtonComponent;
    let fixture: ComponentFixture<AuthButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
