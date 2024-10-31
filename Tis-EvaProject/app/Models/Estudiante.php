<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\ResetPasswordNotification;

class Estudiante extends Authenticatable
{
    protected $table = 'ESTUDIANTE'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_EST'; // Clave primaria de la tabla

    public $timestamps = false; // Deshabilitar timestamps

    protected $fillable = [
        'NOMBRE_EST',
        'APELLIDO_EST',
        'EMAIL_EST',
        'PASSWORD_EST',
    ];

    protected $hidden = [
        'PASSWORD_EST',
    ];

    public function getAuthPassword()
    {
        return $this->PASSWORD_EST;
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
