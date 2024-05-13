<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pack extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nom',
        'description',
        'prix_fixe',
        'unite',
        'prix_unite',
        #MomentsEvent
        'unite_max'

    ];

    public function prestations(): BelongsToMany
    {
        return $this->belongsToMany(Prestation::class);
    }
}
