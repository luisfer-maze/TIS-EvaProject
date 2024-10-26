<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required|in:Docente,Estudiante',
        ]);

        $credentials = $request->only('email', 'password');
        $role = $request->input('role');

        if ($role == 'Docente') {
            if (Auth::guard('docente')->attempt(['EMAIL_DOCENTE' => $credentials['email'], 'password' => $credentials['password']])) {
                // Inicio de sesión exitoso para docente
                return response()->json(['role' => 'Docente', 'message' => 'Login exitoso']);
            } else {
                return response()->json(['error' => 'Credenciales inválidas'], 401);
            }
        } elseif ($role == 'Estudiante') {
            if (Auth::guard('estudiante')->attempt(['EMAIL_EST' => $credentials['email'], 'password' => $credentials['password']])) {
                // Inicio de sesión exitoso para estudiante
                return response()->json(['role' => 'Estudiante', 'message' => 'Login exitoso']);
            } else {
                return response()->json(['error' => 'Credenciales inválidas'], 401);
            }
        }

        return response()->json(['error' => 'El rol no es válido'], 400);
    }

    public function logout(Request $request)
    {
        $role = $request->input('role');

        if ($role == 'Docente') {
            Auth::guard('docente')->logout();
        } elseif ($role == 'Estudiante') {
            Auth::guard('estudiante')->logout();
        }

        return response()->json(['message' => 'Cierre de sesión exitoso']);
    }

    public function getLoggedUser()
{
    if (Auth::guard('docente')->check()) {
        $user = Auth::guard('docente')->user();
        return response()->json([
            'nombre' => $user->NOMBRE_DOCENTE,
            'apellido' => $user->APELLIDO_DOCENTE,
            'email' => $user->EMAIL_DOCENTE,
            'foto' => $user->FOTO_DOCENTE ?? 'https://via.placeholder.com/50'
        ]);
    } elseif (Auth::guard('estudiante')->check()) {
        $user = Auth::guard('estudiante')->user();
        return response()->json([
            'nombre' => $user->NOMBRE_EST,
            'apellido' => $user->APELLIDO_EST,
            'email' => $user->EMAIL_EST,
            'foto' => $user->FOTO_EST ?? 'https://via.placeholder.com/50'
        ]);
    }

    return response()->json(['error' => 'No autenticado'], 401);
}
}
