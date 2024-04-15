<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'personneLogin' => 'admin@admin.com',
                'password' => Hash::make('admin'),
                'personneNom' => 'admin',
                'personneEmail' => 'admin@admin.com',
                'role' => 'admin',
            ]
        );
        DB::table('users')->insert([
            'personneLogin' => 'julian@example.com',
            'password' => Hash::make('passwordDeJulian123!'),
            'personneNom' => 'Julian',
            'personneEmail' => 'julian@example.com',
            'role' => 'prestataire'
        ]);
        DB::table('users')->insert(
            [
                'personneLogin' => 'margot@example.com',
                'password' => Hash::make('passwordDeMargot123!'),
                'personneNom' => 'Margot',
                'personneEmail' => 'margot@example.com',
                'role' => 'user',
            ]
        );
    }
}
