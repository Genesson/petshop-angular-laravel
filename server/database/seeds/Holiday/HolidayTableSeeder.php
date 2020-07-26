<?php

use Illuminate\Database\Seeder;
use App\Models\Holiday;

class HolidayTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Holiday::create(['date' => '2020-01-01', 'name' => 'Ano Novo', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2020-02-24', 'name' => 'Carnaval', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2020-02-25', 'name' => 'Carnaval', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2020-02-26', 'name' => 'Carnaval', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2020-04-01', 'name' => 'Dia da Mentira', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2020-04-10', 'name' => 'Sexta-Feira Santa', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2020-04-12', 'name' => 'Páscoa', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2020-04-21', 'name' => 'Dia de Tiradentes', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2020-05-01', 'name' => 'Dia do Trabalho', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2020-05-10', 'name' => 'Dia das Mães', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2020-06-11', 'name' => 'Corpus Christi', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2020-06-12', 'name' => 'Dia dos Namorados', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2020-08-09', 'name' => 'Dia dos Pais', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2020-09-07', 'name' => 'Independência do Brasil', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2020-10-12', 'name' => 'Nossa Senhora Aparecida', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2020-10-15', 'name' => 'Dia do Professor', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2020-10-17', 'name' => 'Dia do Comércio', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2020-10-28', 'name' => 'Dia do Servidor Público', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2020-11-02', 'name' => 'Dia de Finados', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2020-11-15', 'name' => 'Proclamação da República', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2020-11-20', 'name' => 'Consciência Negra', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2020-12-25', 'name' => 'Natal', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-01-01', 'name' => 'Ano Novo', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-02-15', 'name' => 'Carnaval', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2021-02-16', 'name' => 'Carnaval', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2021-02-17', 'name' => 'Carnaval', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2021-04-01', 'name' => 'Dia da Mentira', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2021-04-02', 'name' => 'Sexta-Feira Santa', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-04-04', 'name' => 'Páscoa', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2021-04-21', 'name' => 'Dia de Tiradentes', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-05-01', 'name' => 'Dia do Trabalho', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-05-09', 'name' => 'Dia das Mães', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2021-06-03', 'name' => 'Corpus Christi', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2021-06-12', 'name' => 'Dia dos Namorados', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2021-08-08', 'name' => 'Dia dos Pais', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2021-09-07', 'name' => 'Independência do Brasil', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-10-12', 'name' => 'Nossa Senhora Aparecida', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-10-15', 'name' => 'Dia do Professor', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2021-10-17', 'name' => 'Dia do Comércio', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2021-10-28', 'name' => 'Dia do Servidor Público', 'type' => 'Facultativo', 'type_code' => 4,]);
        Holiday::create(['date' => '2021-11-02', 'name' => 'Dia de Finados', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-11-15', 'name' => 'Proclamação da República', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
        Holiday::create(['date' => '2021-11-20', 'name' => 'Consciência Negra', 'type' => 'Dia Convencional', 'type_code' => 9,]);
        Holiday::create(['date' => '2021-12-25', 'name' => 'Natal', 'type' => 'Feriado Nacional', 'type_code' => 1,]);
    }
}
