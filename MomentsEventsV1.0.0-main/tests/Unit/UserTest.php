<?php

namespace Tests\Unit;

use App\Http\Controllers\Api\AuthController;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    //on un bout de code indépendemment du reste du code
    public function test_signup_correct()
    {
        $request = new SignupRequest();
        $request->setContainer($this->app);

        $request->initialize(
            [
                'personneNom' => 'Doe',
                'personnePrenom' => 'John',
                'personneDateNaissance' => '1990-01-01',
                'personneLogin' => 'johndoe@gmail.com',
                'password' => 'Password123@',
                'password_confirmation' => 'Password123@'
            ]
        );
        $request->setRedirector($this->app['redirect']);
        $request->validateResolved();

        $controller = new AuthController();
        $response = $controller->signup($request);

        $this->assertEquals(200, $response->getStatusCode());

        $responseData = json_decode($response->getContent(), true);

        // var_dump('response data = ');
        // var_dump($responseData);

        $this->assertArrayHasKey('user', $responseData);
        $this->assertArrayHasKey('token', $responseData);

        $user = User::find($responseData['user']['idPersonne']);

        $this->assertEquals('Doe', $user->personneNom);
        $this->assertEquals('John', $user->personnePrenom);
        $this->assertEquals('1990-01-01', $user->personneDateNaissance);
        $this->assertEquals('johndoe@gmail.com', $user->personneLogin);
        $this->assertTrue(Hash::check('Password123@', $user->password));
        $this->assertEquals('user', $user->role);
    }

    // public function test_signup_false()
    // {
    //     $this->expectException(ValidationException::class);
    //     $request = new SignupRequest();
    //     $request->setContainer($this->app);

    //     $request->initialize(
    //         [
    //             'personneNom' => 'Doe',
    //             'personnePrenom' => 'John',
    //             'personneDateNaissance' => '1990-01-01',
    //             'personneLogin' => 'johndoeeee@gmail.com',
    //             'password' => 'Password123@',
    //             'password_confirmation' => 'Password12344@'
    //         ]
    //     );
    //     // $request->setRedirector($this->app['redirect']);
    //     // $request->validateResolved();

    //     // $controller = new AuthController();
    //     // $response = $controller->signup($request);

    //     // $this->assertEquals(422, $response->getStatusCode());

    //     // $responseData = json_decode($response->getContent(), true);

    //     // var_dump('response data = ');
    //     // var_dump($responseData);

    //     // $this->assertArrayHasKey('user', $responseData);
    //     // $this->assertArrayHasKey('token', $responseData);

    //     // $user = User::find($responseData['user']['idPersonne']);

    //     // $this->assertArrayNotHasKey('user', $responseData);
    //     // $this->assertArrayNotHasKey('token', $responseData);

    //     // $this->assertEquals('Doe', $user->personneNom);
    //     // $this->assertEquals('John', $user->personnePrenom);
    //     // $this->assertEquals('1990-01-01', $user->personneDateNaissance);
    //     // $this->assertEquals('johndoeeeee@gmail.com', $user->personneLogin);
    //     // $this->assertTrue(Hash::check('Password123@', $user->password));
    //     // $this->assertEquals('user', $user->role);
    // }
    public function test_delete_user_john_doe() {
        // $user = User::factory()->count(1)->make()->first();
        // $user->save();
        // $personneLogin = $user->personneLogin;
        $user = User::select('*')->where('personneLogin', 'johndoe@gmail.com')->first();
        if ($user) {
            $user->delete();
        }
        $check = User::select('*')->where('personneLogin', $user->personneLogin)->doesntExist();
        // $this->assertTrue(User::select('*')->where('personneLogin', $personneLogin)->exists());
        $this->assertTrue($check);
    }
}

