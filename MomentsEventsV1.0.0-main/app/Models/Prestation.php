<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prestation extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'nom',
        'description',
        'photo',
        'contrainte',
        'type_facturation',
        'prix_type_facturation',
        'duree',
        'personne_min',
        'personne_max',
        'heure_min',
        'heure_max',
        'created_at',
        'updated_at'
    ];

    public function categories() {
        return $this->belongsToMany(Categorie::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'id_prestation');
    }

    public function packs()
    {
        return $this->belongsToMany(Pack::class);
    }

    public function evenements()
    {
        return $this->belongsToMany(Evenement::class);
    }
}
