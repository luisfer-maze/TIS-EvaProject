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
        'ID_GRUPO',
        'ID_PROYECTO', // Añadir aquí si falta
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
    public function proyecto()
    {
        return $this->belongsTo(Proyectos::class, 'ID_PROYECTO', 'ID_PROYECTO');
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'ID_GRUPO', 'ID_GRUPO');
    }
}
