import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TransportCreatePage} from './transport-create.page';

describe('TransportCreatePage', () => {
    let component: TransportCreatePage;
    let fixture: ComponentFixture<TransportCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TransportCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TransportCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
