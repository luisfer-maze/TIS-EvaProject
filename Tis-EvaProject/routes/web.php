<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');  // Esto cargará el componente de React según la ruta
});

Route::get('/login', function () {
    return view('welcome');  // Renderiza el componente Login en React
});

Route::get('/proyectos', function () {
    return view('welcome');  // Renderiza el componente Proyecto en React
});

Route::get('/proyecto-estudiante', function () {
    return view('welcome');  // Renderiza el componente Proyecto en React
});

Route::get('/planificacion-estudiante', function () {
    return view('welcome');  // Renderiza el componente Proyecto en React
});

Route::get('/historia-usuario', function () {
    return view('welcome');  // Renderiza el componente Proyecto en React
});

Route::get('/homepage', function () {
    return view('welcome');  // Renderiza el componente HomePage en React
});

Route::get('/register', function () {
    return view('welcome');  // Renderiza el componente HomePage en React
});

Route::get('/forgot-password', function () {
    return view('welcome');  // Renderiza el componente HomePage en React
});

Route::get('/proyectos', [ProyectoController::class, 'index']);
Route::post('/proyectos', [ProyectoController::class, 'store']);
Route::get('/proyectos/{id}', [ProyectoController::class, 'show']);
Route::put('/proyectos/{id}', [ProyectoController::class, 'update']);
Route::delete('/proyectos/{id}', [ProyectoController::class, 'destroy']);

Route::get('/test', function () {
    return 'Ruta de prueba funcionando';
});

Route::get('/test-controller', [ProyectoController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);