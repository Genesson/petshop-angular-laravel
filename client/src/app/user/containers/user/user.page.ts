import {Component, OnInit} from '@angular/core';

import {AlertController} from '@ionic/angular';

import {UserSandbox} from '../../../user/user.sandbox';

import {UserActionType} from '../../../shared/enums/user.enum';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

    public tab = 'user';

    public usersCollection$ = this.userSandbox.usersCollection$;

    public permissionsCollection$ = this.userSandbox.permissionsCollection$;

    public isLoading$ = this.userSandbox.isLoadingUser$;

    public userType = UserActionType;

    constructor(private userSandbox: UserSandbox, private alertController: AlertController) {
    }

    ngOnInit() {
        this.userSandbox.loadUsers();
        this.userSandbox.loadPermissions();
    }

    public onTab(tab) {
        this.tab = tab;
    }

    public presentModal() {
        this.userSandbox.resetImageUser();
        this.userSandbox.openModal(false);
    }

    public presentModalPermission() {
        this.userSandbox.openPermissionModal(false);
    }

    public selectUser(user) {
        this.userSandbox.selectUser(user);
        this.userSandbox.openModal(true, user);
    }

    public selectPermission(permission) {
        this.userSandbox.selectPermission(permission);
        this.userSandbox.openPermissionModal(true, permission);
    }

    async confirmUser(user) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir o usuário: <strong>${user.name}</strong>?`,
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
                        this.userSandbox.deleteUser(user);
                    }
                }
            ]
        });
        await alert.present();
    }

    async confirmPermission(permission) {
        const alert = await this.alertController.create({
            header: 'Confirma a exclusão?',
            message: `Ter certeza que deseja excluir a permissão: <strong>${permission.description}</strong>?`,
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
                        this.userSandbox.deletePermission(permission);
                    }
                }
            ]
        });
        await alert.present();
    }

}
