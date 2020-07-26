import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePdvComponent} from './home-pdv.component';

describe('HomePdvComponent', () => {
    let component: HomePdvComponent;
    let fixture: ComponentFixture<HomePdvComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePdvComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePdvComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
