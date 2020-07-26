import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceCreatePage} from './service-create.page';

describe('ServiceCreatePage', () => {
    let component: ServiceCreatePage;
    let fixture: ComponentFixture<ServiceCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServiceCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ServiceCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
