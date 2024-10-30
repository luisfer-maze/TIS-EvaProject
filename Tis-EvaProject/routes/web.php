<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProyectosController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\CheckAdmin;

// Ruta de login para cargar la aplicación React
Route::get('/login', function () {
    return view('welcome'); // Carga tu aplicación React
})->name('login');

// Rutas de autenticación
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/api/usuario-logueado', [AuthController::class, 'getLoggedUser']);

// Rutas de la API para proyectos, con autenticación para docentes
Route::prefix('api')->middleware(['auth:docente'])->group(function () {
    Route::get('/proyectos', [ProyectosController::class, 'index']);
    Route::post('/proyectos', [ProyectosController::class, 'store']);
    Route::put('/proyectos/{id}', [ProyectosController::class, 'update']);
    Route::delete('/proyectos/{id}', [ProyectosController::class, 'destroy']);
});

// Rutas protegidas por autenticación de docente y estudiante para actualizar perfil y cambiar contraseña
Route::post('/api/usuario-logueado/update', [AuthController::class, 'updateProfile'])
    ->middleware('auth:docente,estudiante');

Route::post('/api/usuario-logueado/change-password', [AuthController::class, 'changePassword'])
    ->middleware('auth:docente,estudiante');

// Rutas para la administración de usuarios (solo accesibles para administradores)
// Rutas de administración protegidas por autenticación y verificación de administrador
Route::middleware(['auth:docente', CheckAdmin::class])->prefix('api')->group(function () {
    Route::get('/pending-users', [AuthController::class, 'getPendingUsers']);
    Route::post('/approve-user/{id}', [AuthController::class, 'approveUser']);
    Route::post('/assign-admin/{id}', [AuthController::class, 'assignAdmin']);
    Route::get('/all-users', [AuthController::class, 'getAllUsers']);
});

// Ruta para el registro de usuarios
Route::post('/api/register', [AuthController::class, 'register']);

// Ruta de prueba para verificar funcionamiento del backend
Route::get('/test', function () {
    return response()->json(['message' => 'Ruta de prueba funcionando']);
});

// Ruta comodín para manejar todas las rutas frontend con React
Route::get('/{any}', function () {
    return view('welcome');  // Carga la vista de React
})->where('any', '.*');
