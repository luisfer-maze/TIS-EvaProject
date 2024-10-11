<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');  // Esto cargará el componente de React según la ruta
});

Route::get('/login', function () {
    return view('welcome');  // Renderiza el componente Login en React
});

Route::get('/proyecto', function () {
    return view('welcome');  // Renderiza el componente Proyecto en React
});
