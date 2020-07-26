import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Subscription} from 'rxjs';

import {AlertController} from '@ionic/angular';

import {DatatableComponent} from '@swimlane/ngx-datatable';

import {ProductSandbox} from '../../product.sandbox';

import {ProductModel} from '../../../shared/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, OnDestroy {

  public showImports = false;

  public isLoadingCsvProduct$ = this.productSandbox.isLoadingCsvProduct$;

  public isLoadingCsvProductProductProvider$ = this.productSandbox.isLoadingCsvProductProductProvider$;

  public productsCollection$ = this.productSandbox.productsCollection$;

  public productCategoriesCollection$ = this.productSandbox.productCategoriesCollection$;

  public productProvidersCollection$ = this.productSandbox.productProvidersCollection$;

  public isLoadingCsvProductProvider$ = this.productSandbox.isLoadingCsvProductProvider$;

  public isLoading$ = this.productSandbox.isLoadingProduct$;

  public isLoadingProductCategory$ = this.productSandbox.isLoadingProductCategory$;

  public isLoadingProductProvider$ = this.productSandbox.isLoadingProductProvider$;

  public tab = 'product';

  public name;

  public category;

  private subscriptions = new Subscription();

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  temp = [];

  rows = [];

  constructor(private productSandbox: ProductSandbox, private alertController: AlertController) {
  }

  ngOnInit() {
    this.productSandbox.loadProducts();
    this.productSandbox.loadProductCategories();
    this.productSandbox.loadProductProviders();
    this.loadProducts();
  }

  onTab(tab) {
    this.tab = tab;
  }

  loadProducts() {
    this.subscriptions.add(
      this.productsCollection$.subscribe(data => {
        this.temp = [...data];
        this.rows = data;
      })
    );
  }

  updateFilterPetName(event) {
    this.loadProducts();
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d: ProductModel) => {
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  updateFilterPetCategory(event) {
    this.loadProducts();
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d: ProductModel) => {
      return d.category.description.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  updateFilter() {
    this.loadProducts();
    if (this.name) {
      const val = this.name.toLowerCase();
      this.temp = this.temp.filter((d: ProductModel) => {
        return d.description.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    if (this.category) {
      const val = this.category.toLowerCase();
      this.temp = this.temp.filter((d: ProductModel) => {
        return d.category.description.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    this.rows = this.temp;
    this.table.offset = 0;
  }

  public presentModal() {
    this.productSandbox.openModal(false);
  }

  public presentCategoryModal() {
    this.productSandbox.openModalProductCategory(false);
  }

  public presentProviderModal() {
    this.productSandbox.openModalProductProvider(false);
  }

  public openImportModal() {
    this.productSandbox.openImportModal();
  }

  public selectProduct(product) {
    this.productSandbox.openModal(true, product);
  }

  public selectProductCategory(category) {
    this.productSandbox.openModalProductCategory(true, category);
  }

  public selectProductProvider(provider) {
    this.productSandbox.openModalProductProvider(true, provider);
  }

  public presentViewModal(product) {
    this.productSandbox.openViewModal(product);
  }

  async confirmProduct(product) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: `Ter certeza que deseja excluir o produto: <strong>${product.description}</strong>?`,
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
            this.productSandbox.deleteProduct(product);
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmProductCategory(category) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: `Ter certeza que deseja excluir a categoria: <strong>${category.description}</strong>?`,
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
            this.productSandbox.deleteProductCategory(category);
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmProductProvider(provider) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: `Ter certeza que deseja excluir o fornecedor: <strong>${provider.description}</strong>?`,
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
            this.productSandbox.deleteProductProvider(provider);
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onProductProviderFileUpload(event) {
    const formData = new FormData();
    const file = (event.target as HTMLInputElement).files[0];
    formData.append('csv', file);
    this.productSandbox.uploadCsvProductProvider(formData);
  }

  /**
   *
   */
  public onProductFileUpload(event) {
    const formData = new FormData();
    const file = (event.target as HTMLInputElement).files[0];
    formData.append('csv', file);
    this.productSandbox.uploadCsvProduct(formData);
  }

  public onProductProductProviderFileUpload(event) {
    const formData = new FormData();
    const file = (event.target as HTMLInputElement).files[0];
    formData.append('csv', file);
    this.productSandbox.uploadCsvProductProductProvider(formData);
  }
}
