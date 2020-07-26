import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardPetComponent} from './card-pet.component';

describe('CardPetComponent', () => {
    let component: CardPetComponent;
    let fixture: ComponentFixture<CardPetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardPetComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardPetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
