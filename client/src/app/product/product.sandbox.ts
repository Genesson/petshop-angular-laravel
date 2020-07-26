import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {ProductSelectors} from './state/product/product.selectors';
import {XmlSelectors} from './state/xml/xml.selectors';
import {ProductCategorySelectors} from './state/product-category/product-category.selectors';
import {ProductProviderSelectors} from './state/product-provider/product-provider.selectors';

import {ProductModel} from '../shared/models/product.model';
import {XmlModel} from './../shared/models/xml.model';
import {ProductCategoryModel} from './../shared/models/product-category.model';
import {ProductProviderModel} from './../shared/models/product-provider.model';

import {
  CreateProduct,
  DeleteProduct,
  LoadProducts,
  SelectProduct,
  UpdateProduct, UploadCsvProduct,
  UploadImageProduct
} from './state/product/product.actions';
import {CreateXml, LoadXml, ResetXml, SelectXml, UploadXml} from './state/xml/xml.actions';
import {
  CreateProductCategory,
  DeleteProductCategory,
  LoadProductCategories,
  SelectProductCategory,
  UpdateProductCategory
} from './state/product-category/product-category.actions';
import {
  CreateProductProvider,
  DeleteProductProvider,
  LoadProductProviders,
  SelectProductProvider,
  UpdateProductProvider, UploadCsvProductProductProvider,
  UploadCsvProductProvider
} from './state/product-provider/product-provider.actions';

import {CloseProductModal, OpenProductModal} from './state/product-modal/product-modal.actions';
import {CloseProductViewModal, OpenProductViewModal} from './state/product-view-modal/product-view-modal.actions';
import {CloseImportModal, OpenImportModal} from './state/import-modal/import-modal.actions';
import {
  CloseProductCategoryModal,
  OpenProductCategoryModal
} from './state/product-category-modal/product-category-modal.actions';
import {
  CloseProductProviderModal,
  OpenProductProviderModal
} from './state/product-provider-modal/product-provider-modal.actions';
import {TutorSelectors} from "../tutor/state/tutor/tutor.selectors";

@Injectable({
  providedIn: 'root'
})
export class ProductSandbox {

  @Select(ProductSelectors.entities) productsCollection$: Observable<ProductModel[]>;

  @Select(ProductSelectors.selected) productSelected$: Observable<ProductModel>;

  @Select(ProductSelectors.image) imageProduct$: Observable<string>;

  @Select(ProductSelectors.isLoading) isLoadingProduct$: Observable<boolean>;

  @Select(ProductSelectors.isLoadingImage) isLoadingImageProduct$: Observable<boolean>;

  @Select(XmlSelectors.selected) xmlSelected$: Observable<XmlModel>;

  @Select(XmlSelectors.isLoading) isLoadingXml$: Observable<boolean>;

  @Select(XmlSelectors.xml) xml$: Observable<string>;

  @Select(ProductCategorySelectors.entities) productCategoriesCollection$: Observable<ProductCategoryModel[]>;

  @Select(ProductCategorySelectors.selected) productCategorySelected$: Observable<ProductCategoryModel>;

  @Select(ProductCategorySelectors.isLoading) isLoadingProductCategory$: Observable<boolean>;

  @Select(ProductProviderSelectors.entities) productProvidersCollection$: Observable<ProductProviderModel[]>;

  @Select(ProductProviderSelectors.selected) productProviderSelected$: Observable<ProductProviderModel>;

  @Select(ProductProviderSelectors.isLoading) isLoadingProductProvider$: Observable<boolean>;

  @Select(ProductProviderSelectors.isLoadingProductProviderCsv) isLoadingCsvProductProvider$: Observable<boolean>;

  @Select(ProductSelectors.isLoadingProductProductProviderCsv) isLoadingCsvProductProductProvider$: Observable<boolean>;

  @Select(ProductSelectors.isLoadingProductCsv) isLoadingCsvProduct$: Observable<boolean>;

  constructor(private store: Store) {
  }

  public selectProduct(product: ProductModel) {
    this.store.dispatch(new SelectProduct(product));
  }

  public loadProducts() {
    this.store.dispatch(new LoadProducts());
  }

  public createProduct(product: ProductModel) {
    this.store.dispatch(new CreateProduct(product));
  }

  public updateProduct(product: ProductModel) {
    this.store.dispatch(new UpdateProduct(product));
  }

  public deleteProduct(product: ProductModel) {
    this.store.dispatch(new DeleteProduct(product));
  }

  public uploadImageProduct(image: FormData) {
    this.store.dispatch(new UploadImageProduct(image));
  }

  public selectXml(xml: XmlModel) {
    this.store.dispatch(new SelectXml(xml));
  }

  public resetXml() {
    this.store.dispatch(new ResetXml());
  }

  public loadXml(path: string) {
    this.store.dispatch(new LoadXml(path));
  }

  public uploadXml(xml: FormData) {
    this.store.dispatch(new UploadXml(xml));
  }

  public createXml(xml: XmlModel) {
    this.store.dispatch(new CreateXml(xml));
  }

  public selectProductCategory(product: ProductCategoryModel) {
    this.store.dispatch(new SelectProductCategory(product));
  }

  public loadProductCategories() {
    this.store.dispatch(new LoadProductCategories());
  }

  public createProductCategory(category: ProductCategoryModel) {
    this.store.dispatch(new CreateProductCategory(category));
  }

  public updateProductCategory(category: ProductCategoryModel) {
    this.store.dispatch(new UpdateProductCategory(category));
  }

  public deleteProductCategory(category: ProductCategoryModel) {
    this.store.dispatch(new DeleteProductCategory(category));
  }

  public selectProductProvider(provider: ProductProviderModel) {
    this.store.dispatch(new SelectProductProvider(provider));
  }

  public loadProductProviders() {
    this.store.dispatch(new LoadProductProviders());
  }

  public createProductProvider(provider: ProductProviderModel) {
    this.store.dispatch(new CreateProductProvider(provider));
  }

  public updateProductProvider(provider: ProductProviderModel) {
    this.store.dispatch(new UpdateProductProvider(provider));
  }

  public deleteProductProvider(provider: ProductProviderModel) {
    this.store.dispatch(new DeleteProductProvider(provider));
  }

  public openModal(editing, data?) {
    this.store.dispatch(new OpenProductModal({editing, data}));
  }

  public closeModal() {
    this.store.dispatch(new CloseProductModal());
  }

  public openViewModal(data) {
    this.store.dispatch(new OpenProductViewModal(data));
  }

  public closeViewModal() {
    this.store.dispatch(new CloseProductViewModal());
  }

  public openImportModal() {
    this.store.dispatch(new OpenImportModal());
  }

  public closeImportModal() {
    this.store.dispatch(new CloseImportModal());
  }

  public openModalProductCategory(editing, data?) {
    this.store.dispatch(new OpenProductCategoryModal({editing, data}));
  }

  public closeModalProductCategory() {
    this.store.dispatch(new CloseProductCategoryModal());
  }

  public openModalProductProvider(editing, data?) {
    this.store.dispatch(new OpenProductProviderModal({editing, data}));
  }

  public closeModalProductProvider() {
    this.store.dispatch(new CloseProductProviderModal());
  }

  public uploadCsvProductProvider(csv: FormData) {
    this.store.dispatch(new UploadCsvProductProvider(csv));
  }

  public uploadCsvProduct(csv: FormData) {
    this.store.dispatch(new UploadCsvProduct(csv));
  }

  public uploadCsvProductProductProvider(csv: FormData) {
    this.store.dispatch(new UploadCsvProductProductProvider(csv));
  }
}
