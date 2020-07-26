import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FooterModalComponent} from './footer-modal.component';

describe('FooterModalComponent', () => {
    let component: FooterModalComponent;
    let fixture: ComponentFixture<FooterModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FooterModalComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
