import {Component, Input, OnInit} from '@angular/core';

import {ModalController} from '@ionic/angular';

import {AuthSandbox} from '../../../auth/auth.sandbox';

@Component({
    selector: 'app-menu-content',
    templateUrl: './menu-content.component.html',
    styleUrls: ['./menu-content.component.scss'],
})
export class MenuContentComponent implements OnInit {
    public appPages = [
        {
            title: 'Caixa',
            url: '/main/cashier',
            icon: 'assets/icon/money.svg',
            role: 'CASHIER',
        },
        {
            title: 'Pets',
            url: '/main/pets',
            icon: 'assets/icon/pets.svg',
            role: 'PETS',
        },
        {
            title: 'Tutores',
            url: '/main/tutors',
            icon: 'assets/icon/smile.svg',
            role: 'TUTORS',
        },
        {
            title: 'Pacotes',
            url: '/main/package',
            icon: 'assets/icon/cart.svg',
            role: 'PETS',
        },
        {
            title: 'Calendário',
            url: '/main/schedule',
            icon: 'assets/icon/calendar.svg',
            role: 'DAILY',
        },
        {
            title: 'Diário',
            url: '/main/daycare',
            icon: 'assets/icon/daily.svg',
            role: 'DAILY',
        },
        {
            title: 'Produtos',
            url: '/main/products',
            icon: 'assets/icon/cart.svg',
            role: 'PRODUCTS',
        },
        {
            title: 'Veterinário',
            url: '/main/veterinary',
            icon: 'assets/icon/stats.svg',
            role: 'VET',
        },
        {
            title: 'Usuários',
            url: '/main/users',
            icon: 'assets/icon/people.svg',
            role: 'USERS',
        },
        {
            title: 'Unidades',
            url: '/main/units',
            icon: 'assets/icon/marker.svg',
            role: 'UNITS',
        },
        {
            title: 'Relatórios',
            url: '/main/reports',
            icon: 'assets/icon/reports.svg',
            role: 'REPORTS',
        },
        {
            title: 'Notas Fiscais',
            url: '/main/invoice',
            icon: 'assets/icon/reports.svg',
            role: 'INVOICES',
        },
        {
            title: 'Configurações',
            url: '/main/settings',
            icon: 'assets/icon/settings.svg',
            role: 'SETTINGS',
        },
    ];

    constructor(
        private modalController: ModalController,
        private authSandbox: AuthSandbox
    ) {}

    ngOnInit() {}

    async closeModals() {
        await this.modalController
            .dismiss()
            .then((res) => (res ? this.closeModals() : null))
            .catch(() => null);
    }

    public logout() {
        this.closeModals().finally(() => {
            this.authSandbox.logout();
        });
    }
}
