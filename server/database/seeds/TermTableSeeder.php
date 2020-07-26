<?php

use App\Models\Term;
use Illuminate\Database\Seeder;

class TermTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Term::create([
            'text' => '<p>Nulla aliquet turpis non ultricies varius. Mauris molestie faucibus cursus. Morbi pharetra, erat posuere porttitor ultrices, dui ante euismod neque, ac varius orci quam non nisi. Ut euismod vehicula mi, ut gravida justo vulputate eget. Nam ac ultricies sem, ut venenatis turpis. Etiam ac leo turpis. Duis lacinia orci sit amet purus euismod sodales in ut est.</p><p>Fusce non euismod erat. Donec quis mi sit amet sapien feugiat laoreet non ut sem. Maecenas eleifend laoreet metus, sit amet molestie nulla porta at. Nam finibus dapibus sodales. Pellentesque nisl mauris, lobortis ut orci in, aliquam tempor turpis. Cras tempor et urna vitae sodales. Ut non nunc vehicula metus sagittis congue eget placerat mauris.</p>'
        ]);
    }
}
