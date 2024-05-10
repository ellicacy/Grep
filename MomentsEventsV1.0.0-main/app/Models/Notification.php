<?php
/*
* File:    app/Models/Notification.php
* Description: MomentsEvent Model
*/
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'idPersonne',
    ];

    /*
    * La relation avec la classe User.
    */
    public function user(){
        return $this->belongsTo(User::class, 'idPersonne');
    }
}
