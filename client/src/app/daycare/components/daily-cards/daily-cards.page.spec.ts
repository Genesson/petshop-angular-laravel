import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DailyCardsPage} from './daily-cards.page';

describe('DailyCardsPage', () => {
    let component: DailyCardsPage;
    let fixture: ComponentFixture<DailyCardsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DailyCardsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DailyCardsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
