import {Component, OnInit} from '@angular/core';

import {AlertController} from '@ionic/angular';

import {UnitySandbox} from '../../unity.sandbox';

@Component({
    selector: 'app-unity',
    templateUrl: './unity.page.html',
    styleUrls: ['./unity.page.scss'],
})
export class UnityPage implements OnInit {

    public unitsCollection$ = this.unitySandbox.unitsCollection$;

    public isLoading$ = this.unitySandbox.isLoading$;

    constructor(private unitySandbox: UnitySandbox, private alertController: AlertController) {
    }

    ngOnInit() {
        this.unitySandbox.loadUnits();
    }

    async presentModal() {
        this.unitySandbox.openModal(false);
    }

    public selectUnity(unity) {
        this.unitySandbox.selectUnity(unity);
        this.unitySandbox.openModal(true, unity);
    }

    async confirmUnity(unity) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir a unidade: <strong>${unity.fantasy}</strong>?`,
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
                        this.unitySandbox.deleteUnity(unity);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmDisable(unity) {
      const alert = await this.alertController.create({
        header: 'Confirma a exclusão?',
        message: `Ter certeza que deseja desativar a unidade: <strong>${unity.fantasy}</strong>?`,
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
                this.unitySandbox.disableUnity(unity);
            }
          }
        ]
      });
      await alert.present();
    }

}
