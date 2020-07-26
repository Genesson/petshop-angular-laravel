import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FooterButtonComponent} from './footer-button.component';

describe('FooterButtonComponent', () => {
    let component: FooterButtonComponent;
    let fixture: ComponentFixture<FooterButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FooterButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
