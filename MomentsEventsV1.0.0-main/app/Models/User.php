<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'idPersonne';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'idPersonne',
        'personneLogin',
        'password',
        'personneNom',
        'personnePrenom',
        'personneDateNaissance',
        'clientRue',
        'clientCodePostal',
        'clientVille',
        'prestaireType',
        'prestataireDescription',
        'prestatairePhotos',
        'prestataireEntrepriseNom',
        'prestataireEntrepriseRue',
        'prestataireEntrepriseCP',
        'prestataireEntrepriseVille',
        'prestataireNoTVA',
        'prestataireBanque',
        'prestataireBanqueRue',
        'prestataireBanqueCP',
        'prestataireBanqueVille',
        'prestataireSWIFT',
        'prestataireIBAN',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // 'email_verified_at' => 'datetime',
    ];

    public function professions()
    {
        return $this->belongsToMany(Profession::class);
    }

    /*
    * La relation avec la classe Notification.
    * MomentEvent
    */
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'idPersonne');
    }
}
