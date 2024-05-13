<?php

namespace Tests\Feature;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_it_stores_new_user_correct() {
        $this->followingRedirects()->post('/api/signup', [
            "password"=>"user123@",
            "password_confirmation"=>"user123@",
            "personneDateNaissance"=>"1992-04-20",
            "personneLogin"=>"user123@gmail.com",
            "personneNom"=>"user123",
            "personnePrenom"=>"user123"
        ])->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'personneNom' => 'user123',
            'personnePrenom' => 'user123',
            'personneLogin' => 'user123@gmail.com',
            'role' => 'user'
        ]);
    }

    public function test_it_stores_new_user_false() {
        // error 302 means that there is a problem in the request
        // password and password_conf does not match
        $this->post('/api/signup', [
            "password"=>"user123@",
            "password_confirmation"=>"user123444@",
            "personneDateNaissance"=>"1992-04-20",
            "personneLogin"=>"user1234@gmail.com",
            "personneNom"=>"user1234",
            "personnePrenom"=>"user1234"
        ])->assertStatus(302);

        $this->assertDatabaseMissing('users', [
            'personneNom' => 'user1234',
            'personnePrenom' => 'user1234',
            'personneLogin' => 'user1234@gmail.com',
            'role' => 'user'
        ]);
    }

    public function test_login_correct()
    {
        $response = $this->post('/api/login', [
                "personneLogin"=> "user123@gmail.com",
                "password"=> "user123@"
        ]);

        $response->assertStatus(200);
    }

    public function test_login_false()
    {
        $response = $this->post('/api/login', [
            "personneLogin"=> "user123@gmail.com",
            "password"=> "user1234@"
        ]);

        $response->assertStatus(422);
    }


    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_login_admin_post()
    {
        $response = $this->post('/api/loginAdmin', [
            'personneLogin'=>'admin@gmail.com',
            'password'=>'admin123@',
        ]);
        $response->assertStatus(200);
    }

    public function test_login_admin_post_error_not_admin()
    {
        // error 404 because role not equal to admin
        $response = $this->post('/api/loginAdmin', [
            'personneLogin'=>'user@gmail.com',
            'password'=>'user123@',
        ]);
        // var_dump($response);
        $response->assertStatus(404);
    }

    public function test_login_admin_post_error_credentials()
    {
        // error 302 because the credentials are incorrects
        $response = $this->post('/api/loginAdmin', [
            'personneLogin'=>'user1234@gmail.com',
            'password'=>'user123@',
        ]);
        // var_dump($response);
        $response->assertStatus(302);
    }

    public function test_login_post()
    {
        $response = $this->post('/api/login', [
            'personneLogin'=>'user@gmail.com',
            'password'=>'user123@',
        ]);
        $response->assertStatus(200);
    }

    

    // public function test_if_seeders_works() {
    //     $this->seed(); // sees all seeder in the seeders folders
    // }

    // public function test_database_has() {
    //     $this->assertDatabaseHas('users', [
    //         'personneNom'=>'Brunet',
    //         'personnePrenom'=>'Marc',
    //         'personneLogin'=>'marc@gmail.com',
    //         'role'=>'user',
    //     ]);
    // }

    public function test_database_missing() {
        $this->assertDatabaseMissing('users', [
            'personneNom'=>'Brunetti',
            'personnePrenom'=>'Marco',
            'personneLogin'=>'marco@gmail.com',
            'role'=>'user',
        ]);
    }

    

    // public function test_user_duplication()
    // {
    //     $user1 = User::make([
    //         'personneNom'=>'Unit',
    //         'personnePrenom'=>'Test',
    //         'personneLogin'=>'unittest@gmail.com',
    //         'password'=>'unittest123@',
    //     ]);
    //     $user2 = User::make([
    //         'personneNom'=>'Unit',
    //         'personnePrenom'=>'Test',
    //         'personneLogin'=>'unittest@gmail.com',
    //         'password'=>'unittest123@',
    //     ]);

    //     $this->assertTrue($user1->personneNom == $user2->personneNom);

    //     // $response = $this->get('/login');
    //     // $response->assertStatus(200);
    // }

    // public function test_create_user() {
    //     $user = User::make([
    //         'personneNom'=>'Unit',
    //         'personnePrenom'=>'Test',
    //         'personneLogin'=>'unittest@gmail.com',
    //         'password'=>Hash::make('unittest123@'),
    //         'role'=>'user',
    //     ]);

    //     $user->save();

    //     $check = User::select('*')->where('personneLogin',$user->personneLogin)->exists();

    //     $this->assertTrue($check);
    // }

    // public function test_create_admin() {
    //     $user = User::make([
    //         'personneNom'=>'admin2',
    //         'personnePrenom'=>'admin2',
    //         'personneLogin'=>'admin2@gmail.com',
    //         'password'=>Hash::make('admin2123@'),
    //         'role'=>'admin',
    //     ]);
    //     $user->save();
    //     $check = User::select('*')->where('personneLogin',$user->personneLogin)->exists();
    //     $this->assertTrue($check);
    // }

    public function test_delete_user() {
        $user = User::factory()->count(1)->make()->first();
        $user->save();
        $personneLogin = $user->personneLogin;
        $user = User::select('*')->where('personneLogin', $user->personneLogin)->first();
        if ($user) {
            $user->delete();
        }
        $check = User::select('*')->where('personneLogin', $personneLogin)->doesntExist();
        // $this->assertTrue(User::select('*')->where('personneLogin', $personneLogin)->exists());
        $this->assertTrue($check);
    }

    // public function test_delete_user_custom() {
    //     $user = User::where('personneLogin', 'unittest@gmail.com')->first();
    //     $user->delete();
    //     $check = User::select('*')->where('personneLogin', 'unittest@gmail.com')->doesntExist();
    //     $this->assertTrue($check);
    // }

    public function test_to_delete_user123() {
        $user = User::where('personneLogin','user123@gmail.com')->first();
        $user->delete();
        $this->assertDatabaseMissing('users', [
            'personneNom' => 'user123',
            'personnePrenom' => 'user123',
            'personneLogin' => 'user123@gmail.com',
            'role' => 'user'
        ]);
    }
    
}
