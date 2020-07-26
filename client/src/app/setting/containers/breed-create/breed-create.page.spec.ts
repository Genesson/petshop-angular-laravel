import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BreedCreatePage} from './breed-create.page';

describe('BreedCreatePage', () => {
    let component: BreedCreatePage;
    let fixture: ComponentFixture<BreedCreatePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BreedCreatePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreedCreatePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
