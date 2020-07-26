<?php

use Illuminate\Http\Request;

// Rotas de autenticação
Route::group(['middleware' => ['api'], 'prefix' => 'auth'], function ($router) {
    Route::post('login', 'Api\AuthController@login')->name('login');
    Route::get('logout', 'Api\AuthController@logout');
    Route::post('forgot', 'Api\AuthController@forgot');
    Route::post('refresh', 'Api\AuthController@refresh');
    Route::post('me', 'Api\AuthController@me');
    Route::post('check', 'Api\AuthController@check');
});

// Route::middleware('api')->namespace('App\Http\Controllers')->group(function () {
//     Route::delete('cache', function () {
//         if (\Cache::flush()) {
//             return response()->json([], 200);
//         }
//         return response()->json([], 500);
//     });

//     Route::get('storage', function () {
//         if (Artisan::call('storage:link', [])) {
//             return response()->json([], 200);
//         }
//         return response()->json([], 500);
//     });
// });

//Rotas autenticadas
Route::group(['prefix' => '/', 'namespace' => 'Api\\', 'middleware' => ['auth:api']], function ($router) {
    // UNITY
    Route::apiResource('unit-categories', 'UnityCategoryController');
    Route::get('unit-categories/{unity}/load-per-unity', 'UnityCategoryController@loadPerUnity')->name('unit-categories.load-per-unity');
    Route::apiResource('unit-services', 'UnityServiceController');
    Route::post('unit-services/update-status', 'UnityServiceController@updateStatus')->name('unit-services.update-status');
    Route::get('unit-services/{unity}/load-sub-service', 'UnityServiceController@loadSubService')->name('unit-services.load-sub-service');
    Route::get('unit-services/{unity}/load-per-unity', 'UnityServiceController@loadPerUnity')->name('unit-services.load-per-unity');
    Route::get('unit-services/{unity}/load-showers', 'UnityServiceController@loadShowers')->name('unit-services.load-showers');
    Route::get('unit-services/{unity}/load-sub-showers', 'UnityServiceController@loadSubShowers')->name('unit-services.load-sub-showers');
    Route::get('unit-services/{unity}/load-transports', 'UnityServiceController@loadTransports')->name('unit-services.load-transports');
    Route::get('unit-services/{unity}/load-pet-sitters', 'UnityServiceController@loadPetSitters')->name('unit-services.load-pet-sitters');
    Route::get('unit-services/{unity}/load-day-cares', 'UnityServiceController@loadDayCares')->name('unit-services.load-day-cares');
    Route::get('unit-services/{unity}/load-hotels', 'UnityServiceController@loadHotels')->name('unit-services.load-hotels');
    Route::get('unit-services/{unity}/load-others', 'UnityServiceController@loadOthers')->name('unit-services.load-others');
    Route::get('unit-services/{service}/{size}', 'UnityServiceController@expectedTimeService')->name('unit-services.expected-time-service');
    Route::apiResource('unit-rooms', 'UnityRoomController');
    Route::apiResource('unit-districts', 'UnityDistrictController');
    Route::apiResource('unit-regions', 'UnityRegionController');
    Route::apiResource('unit-checks', 'UnityCheckController');
    Route::apiResource('unit-exception-dates', 'UnityExceptionDateController');
    Route::apiResource('unit-card-flags', 'UnityCardFlagController');
    Route::get('unit-checks/{unity}/load-per-unity', 'UnityCheckController@loadPerUnity')->name('unit-checks.load-per-unity');
    Route::apiResource('unit-price-variations', 'UnityPriceVariationController');
    Route::get('unit-price-variations/{unity}/load-per-unity', 'UnityPriceVariationController@loadPerUnity')->name('unit-price-variations.load-per-unity');
    Route::apiResource('units', 'UnityController');
    Route::post('units/disable', 'UnityController@disable')->name('units.disable');
    Route::get('units/{unity}/rest-days', 'UnityController@restDays')->name('units.rest-days');
    // CLOSE UNITY

    // TUTORS AND USERS
    Route::get('users/{unity}/load-per-admin', 'UserController@loadPerAdmin')->name('users.load-per-admin');
    Route::get('users/{unity}/load-per-admin-unity', 'UserController@loadPerAdminUnity')->name('users.load-per-admin-unity');
    Route::post('users/update-unity', 'UserController@updateUnity')->name('users.update-unity');
    Route::get('users/search/term', 'UserController@search')->name('users.search.term');
    Route::apiResource('useradresses', 'UserAdressController');
    // CLOSE TUTORS AND USERS

    // PERMISSIONS
    Route::apiResource('permissions', 'PermissionController');
    // CLOSE PERMISSIONS

    // PETS
    Route::apiResource('pet-behaviors', 'PetBehaviorController');
    Route::apiResource('pet-breeds', 'PetBreedController');
    Route::apiResource('pet-sizes', 'PetSizeController');
    Route::apiResource('pet-type-furs', 'PetTypeFurController');
    Route::apiResource('pet-types', 'PetTypeController');
    Route::apiResource('pet-evaluation', 'PetEvaluationController');
    Route::get('pet-evaluation/{pet}/load-per-pet', 'PetEvaluationController@loadPerPet')->name('pets.load-per-pet');
    Route::apiResource('pet-packages', 'PetPackageController');
    Route::apiResource('pet-diseases', 'PetDiseaseController');
    Route::apiResource('pet-vaccines', 'PetVaccineController');
    Route::apiResource('pet-medicines', 'PetMedicineController');
    Route::apiResource('pets', 'PetController');
    Route::get('pets/{user}/load-per-tutor', 'PetController@loadPerTutor')->name('pets.load-per-tutor');

    // CLOSE PETS

    // SCHEDULE
    Route::apiResource('schedules', 'ScheduleController');
    Route::post('schedules/store-app', 'ScheduleController@storeApp')->name('schedules.store-app');
    Route::get('schedules/{unity}/daycare', 'ScheduleController@daycare')->name('schedules.daycare');
    Route::get('schedules/{service}/service', 'ScheduleController@service')->name('schedules.service');
    Route::get('schedules/{id}/finished', 'ScheduleController@finished')->name('schedules.finished');
    Route::apiResource('daycares', 'DaycareController');
    Route::post('schedules/update-daycare', 'DaycareController@update')->name('schedules.update-daycare');
    Route::post('schedules/update-all', 'DaycareController@updateAll')->name('schedules.update-all');
    Route::get('schedules/{id}/destroy-daycare', 'DaycareController@destroy')->name('schedules.destroy-daycare');
    // CLOSE SCHEDULES

    // ORDER
    Route::apiResource('unit-orders', 'UnityOrderController');
    Route::post('unit-orders/destroy', 'UnityOrderController@destroy')->name('unit-orders.destroy');
    Route::post('unit-orders/update-discount', 'UnityOrderController@updateDiscount')->name('unit-orders.update-discount');
    Route::post('unit-orders/create-receivables', 'UnityOrderController@createReceivables')->name('unit-orders.create-receivables');
    // CLOSE ORDER

    // CASHIER
    Route::apiResource('unit-cashiers', 'UnityCashierController');
    Route::apiResource('unit-receivables', 'UnityReceivableController');
    Route::post('unit-receivables/totals', 'UnityReceivableController@totals')->name('unit-receivables.totals');
    Route::apiResource('unit-payables', 'UnityPayableController');
    // CLOSE CASHIER

    // CONSULTATIONS
    Route::apiResource('consultations', 'ConsultationController');
    // CLOSE CONSULTATIONS

    // HOLIDAYS
    Route::get('holidays', 'HolidayController@index');
    Route::get('holidays/load-unity', 'HolidayController@loadPerUnity');
    Route::post('holidays', 'HolidayController@store');
    // CLOSE HOLIDAYS

    // CITIES AND PROVINCES
    Route::apiResource('cities', 'CityController');
    Route::apiResource('provinces', 'ProvinceController');
    // CLOSE CITIES AND PROVINCES

    // PRODUCTS
    Route::apiResource('product-categories', 'ProductCategoryController');
    Route::apiResource('product-providers', 'ProductProviderController');
    Route::post('products-providers-csv-import', 'ProductProviderController@products_providers_csv_import');
    Route::apiResource('products', 'ProductController');

    Route::post('products-csv-import', 'ProductController@products_csv_import');
    Route::post('products-products-providers-csv-import', 'ProductController@products_products_providers_csv_import');
    // CLOSE PRODUCTS

    // DRE
    Route::apiResource('dres', 'DreController');
    Route::get('pdf-dre/{date}', 'DreController@pdfDre');
    // CLOSE DRE

    // PACKAGES
    Route::get('packages/services', 'PackageController@getServiceTypes');
    Route::apiResource('packages', 'PackageController');
    // CLOSE PACKAGES

    // INVOICE
    Route::post('invoice/find', 'InvoiceController@index');
    Route::post('invoice', 'InvoiceController@store');
    Route::post('invoice/send', 'InvoiceController@sendNFe');
    Route::get('invoice', 'InvoiceController@consultas');
    Route::get('invoice/{invoice_id}', 'InvoiceController@show');
    // CLOSE INVOICE

    // CLIENT
    Route::post('clients-csv-import', 'UserController@import_csv');
    // Contacts of clients
    Route::post('contacts-csv-import', 'UserController@contact_csv_import');
    // Pets of clients
    Route::post('pets-csv-import', 'UserController@pets_csv_import');
    // CLOSE CLIENT
});

//Rotas Sem autenticaçao
Route::group(['prefix' => '/', 'namespace' => 'Api\\', 'middleware' => ['api']], function ($router) {
    // DATE INTERVALS
    Route::post('date-intervals', 'DateIntervalController@index');
    Route::post('daily-calcs', 'DailyCalculationController@index');
    // CLOSE DATE INTERVALS

    // TUTORS AND USERS
    Route::apiResource('users', 'UserController');
    // CLOSE TUTORS AND USERS

    // RULES AND TERMS
    Route::apiResource('rules-manual', 'RulesManualController');
    Route::apiResource('terms', 'TermsController');
    // CLOSE RULES AND TERMS

    // UPLOAD
    Route::post('upload-image', 'UploadImageController@uploadImage');
    Route::post('upload-xml', 'UploadXmlController@uploadXml');
    // CLOSE UPLOAD

    // VIA CEP
    Route::get('cep/{cep}', 'ViaCepController@index');
    // CLOSE VIA CEP

    Route::get('units/app-units', 'UnityController@indexApp')->name('units.app-units');
});
