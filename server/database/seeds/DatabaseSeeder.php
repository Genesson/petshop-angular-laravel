<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            // USER
            UsersTableSeeder::class,
            // CLOSE USER

            // UNITY
            UnityCategoryTableSeeder::class,
            UnityServiceTableSeeder::class,
            UnityRoomTableSeeder::class,
            UnityDistrictTableSeeder::class,
            UnityRegionTableSeeder::class,
            UnityCheckTableSeeder::class,
            UnityPriceVariationTableSeeder::class,
            UnityExceptionDateTableSeeder::class,
            UnityCardFlagTableSeeder::class,
            PermissionTableSeeder::class,
            UnityTableSeeder::class,
            // CLOSE UNITY

            // CASHIER
            CashierTableSeeder::class,
            // CLOSE CASHIER

            // PRODUCT
            ProductCategoryTableSeeder::class,
            ProductProviderTableSeeder::class,
            ProductTableSeeder::class,
            // CLOSE PRODUCT

            // PET
            PetBehaviorTableSeeder::class,
            PetBreedTableSeeder::class,
            PetSizeTableSeeder::class,
            PetTypeFurTableSeeder::class,
            PetTypeTableSeeder::class,
            PetTableSeeder::class,
            // CLOSE PET

            // HOLIDAY
            HolidayTableSeeder::class,
            // CLOSE HOLIDAY

            // RULES AND TERM
            RulesManualTableSeeder::class,
            TermTableSeeder::class,
            // CLOSE RULES AND TERM
        ]);

        $path = 'app/developer_docs/provinces-and-cities.sql';
        DB::unprepared(file_get_contents($path));
        $this->command->info('Provinces and cities tables seeded!');
    }
}
