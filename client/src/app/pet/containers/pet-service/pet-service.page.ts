import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {PetSandbox} from '../../pet.sandbox';
import {ProductSandbox} from '../../../product/product.sandbox';
import {CartSandbox} from '../../../cart/cart.sandbox';
import {SettingSandbox} from '../../../setting/setting.sandbox';

import {PetModel} from '../../../shared/models/pet.model';

@Component({
    selector: 'app-pet-service',
    templateUrl: './pet-service.page.html',
    styleUrls: ['./pet-service.page.scss'],
})
export class PetServicePage implements OnInit {

    @Input() pet: PetModel;

    public orderSelected$ = this.cartSandbox.orderSelected$;

    public productsCollection$ = this.productSandbox.productsCollection$;

    public isLoadingProduct$ = this.productSandbox.isLoadingProduct$;

    public categories = this.settingSandbox.categories;

    public serviceDaycare = this.settingSandbox.serviceDaycare;

    constructor(private petSandbox: PetSandbox,
                private productSandbox: ProductSandbox,
                private cartSandbox: CartSandbox,
                private settingSandbox: SettingSandbox,
                private router: Router) {
    }

    ngOnInit() {
        this.productSandbox.loadProducts();
        this.cartSandbox.loadOrder();
    }

    public getOpenTemplate(label, category) {
        const page = {
            SHOWER: () => this.selectSpa(category),
            DAY_CARE: () => this.selectDaycare(),
            PACKAGE: () => this.selectPackage(),
            HOTEL: () => this.selectModuleHotel(),
            PET_SITTER: () => this.selectPetSitter(),
            OTHER: () => this.selectOther(category)
        };
        return page[label]();
    }

    selectModuleHotel() {
        this.petSandbox.openModalModuleHotel(this.pet);
    }

    selectSpa(category) {
        this.petSandbox.openModalSpa(this.pet, category);
    }

    selectDaycare() {
        this.petSandbox.openDaycareCreateModal(this.serviceDaycare, this.pet);
    }

    selectPackage() {
        this.router.navigate(['/main/package']);
    }

    selectPetSitter() {
        this.petSandbox.openModalPetSitter(this.pet);
    }

    selectOther(category) {
        this.petSandbox.openModalOther(this.pet, category);
    }

    openPetProfile() {
        this.petSandbox.openModalProfile(this.pet);
        this.petSandbox.loadEvaluations(this.pet);
    }

    presentViewModal(product) {
        this.productSandbox.openViewModal(product);
    }

    addProduct(product) {
        this.cartSandbox.addItem(product, this.pet);
    }

}
