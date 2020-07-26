import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {PackageSelectors} from './state/package/package.selectors';

import {PackageModel} from '../shared/models/package.model';

import {
    CreatePackage,
    DeletePackage,
    LoadPackages,
    SelectPackage,
    UpdatePackage
} from './state/package/package.actions';

import {
    OpenPackageCreateModal,
    ClosePackageCreateModal
} from './state/package-create-modal/package-create-modal.actions';
import {
    OpenPackagePetModal,
    ClosePackagePetModal
} from './state/package-pet-modal/package-pet-modal.actions';
import {
    OpenPackagePetCreateModal,
    ClosePackagePetCreateModal
} from './state/package-pet-create-modal/package-pet-create-modal.actions';

@Injectable({
    providedIn: 'root'
})
export class PackageSandbox {

    @Select(PackageSelectors.entities) packagesCollection$: Observable<PackageModel[]>;

    @Select(PackageSelectors.selected) packageSelected$: Observable<PackageModel>;

    @Select(PackageSelectors.isLoading) isLoadingPackage$: Observable<boolean>;

    constructor(private store: Store) {
    }

    public selectPackage(pack: PackageModel) {
        this.store.dispatch(new SelectPackage(pack));
    }

    public loadPackages() {
        this.store.dispatch(new LoadPackages());
    }

    public createPackage(pack: PackageModel) {
        this.store.dispatch(new CreatePackage(pack));
    }

    public updatePackage(pack: PackageModel) {
        this.store.dispatch(new UpdatePackage(pack));
    }

    public deletePackage(pack: PackageModel) {
        this.store.dispatch(new DeletePackage(pack));
    }

    public openModalPackageCreate(editing, data?) {
        this.store.dispatch(new OpenPackageCreateModal({editing, data}));
    }

    public closeModalPackageCreate() {
        this.store.dispatch(new ClosePackageCreateModal());
    }

    public openModalPackagePet() {
        this.store.dispatch(new OpenPackagePetModal());
    }

    public closeModalPackagePet() {
        this.store.dispatch(new ClosePackagePetModal());
    }

    public openModalPackagePetCreate(editing, data?) {
        this.store.dispatch(new OpenPackagePetCreateModal({editing, data}));
    }

    public closeModalPackagePetCreate() {
        this.store.dispatch(new ClosePackagePetCreateModal());
    }

}
