<?php
/*
* File:    app/Models/Availability.php
* Description: MomentsEvent Model
*/

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    use HasFactory;
    protected $dates = ['dateTime'];
    protected $fillable = [
        'id',
        'dateTime',
        'idPrestation',
        'created_at',
        'updated_at'
    ];

    /**
     * La relation avec la classe Prestation.
     */
    public function prestation(){
        return $this->belongsTo(Prestation::class, 'idPrestation');
    }
}
