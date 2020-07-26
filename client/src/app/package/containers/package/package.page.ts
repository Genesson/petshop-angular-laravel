import {Component, Input, OnInit} from '@angular/core';

import {AlertController} from '@ionic/angular';

import {PetModel} from '../../../shared/models/pet.model';

import {PackageSandbox} from '../../package.sandbox';

@Component({
    selector: 'app-package',
    templateUrl: './package.page.html',
    styleUrls: ['./package.page.scss'],
})
export class PackagePage implements OnInit {

    @Input() pet: PetModel;

    public packagesCollection$ = this.packageSandbox.packagesCollection$;

    public isLoading$ = this.packageSandbox.isLoadingPackage$;

    constructor(private packageSandbox: PackageSandbox, private alertController: AlertController) {
    }

    ngOnInit() {
        this.packageSandbox.loadPackages();
    }

    public presentModal() {
        this.packageSandbox.openModalPackageCreate(false);
    }

    public selectPackage(pack) {
        this.packageSandbox.openModalPackageCreate(true, pack);
    }

    async confirmPackage(pack) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o pacote: <strong>${pack.name}</strong>?`,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelou');
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.packageSandbox.deletePackage(pack);
                    }
                }
            ]
        });
        await alert.present();
    }

    openModalPackagePet(pack) {
        this.packageSandbox.selectPackage(pack);
        this.packageSandbox.openModalPackagePet();
    }
}
