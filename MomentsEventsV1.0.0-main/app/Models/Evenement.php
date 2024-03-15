<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Evenement extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'evenementNom',
        'evenementDescription',
        'evenementDate',
        'evenementRue',
        'evenementCP',
        'evenementVille',
        'evenementNbrPersonne',
        'evenementHeureDebut',
        'evenementHeureFin',
        'evenementStatus',
        'paiementNo',
        'paiementMontant',
        'paiementType',
        'paiementStatus',
        'created_at',
        'updated_at'
    ];

    public function prestations()
    {
        return $this->belongsToMany(Prestation::class);
    }

}
