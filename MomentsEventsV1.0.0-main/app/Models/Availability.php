<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    use HasFactory;
    protected $dates = ['availability'];
    protected $fillable = [
        'id',
        'idPersonne',
        'availability',
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
}
