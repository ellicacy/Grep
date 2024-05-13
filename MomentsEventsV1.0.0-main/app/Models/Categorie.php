<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nom',
        'image',
        'score',
        'created_at',
        'updated_at'
    ];

    public function prestations() {
        return $this->belongsToMany(Prestation::class);
    }
}
