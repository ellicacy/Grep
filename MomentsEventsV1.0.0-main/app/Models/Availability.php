<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    use HasFactory;
    protected $dates = ['dateTime'];
    protected $fillable = [
        'id',
        'idPrestataire',
        'dateTime',
        'idPrestation',
        'created_at',
        'updated_at'
    ];

    /**
     * La relation avec la classe User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'idPersonne');
    }

    /**
     * La relation avec la classe Prestation.
     */
    public function prestation(){
        return $this->belongsTo(Prestation::class, 'idPrestation');
    }
}
