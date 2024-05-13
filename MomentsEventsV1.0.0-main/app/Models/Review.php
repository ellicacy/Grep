<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'id_prestation',
        'note',
        'commentaire'
    ];

    public function prestation(): BelongsTo
    {
        return $this->belongsTo(Prestation::class);
    }
}
