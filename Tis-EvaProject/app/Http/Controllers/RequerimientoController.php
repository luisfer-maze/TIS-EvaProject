<?php

namespace App\Http\Controllers;

use App\Models\Requerimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class RequerimientoController extends Controller
{
    public function index($projectId, $groupId = null)
    {
        $requerimientosProyecto = Requerimiento::where('ID_PROYECTO', $projectId)->get();

        $requerimientosGrupo = [];
        if ($groupId) {
            $requerimientosGrupo = Requerimiento::where('ID_GRUPO', $groupId)->get();
        }

        return response()->json([
            'requerimientosProyecto' => $requerimientosProyecto,
            'requerimientosGrupo' => $requerimientosGrupo
        ]);
    }


    public function store(Request $request)
    {
        Log::info('Datos recibidos en el controlador:', $request->all()); // Añade esta línea

        $request->validate([
            'ID_PROYECTO' => 'required|string|exists:proyecto,ID_PROYECTO',
            'DESCRIPCION_REQ' => 'required|string|max:1000',
        ]);

        $requerimiento = Requerimiento::create($request->all());
        return response()->json($requerimiento, 201);
    }



    public function update(Request $request, $id)
    {
        $request->validate([
            'DESCRIPCION_REQ' => 'required|string|max:1000',
        ]);

        $requerimiento = Requerimiento::findOrFail($id);
        $requerimiento->update([
            'DESCRIPCION_REQ' => $request->DESCRIPCION_REQ,
        ]);

        return response()->json($requerimiento);
    }


    public function destroy($id)
    {
        $user = Auth::user(); // Prueba este método
        if (!$user) {
            return response()->json(['message' => 'Usuario no autenticado'], 403);
        }

        // Log para verificar el usuario autenticado
        Log::info('Usuario autenticado:', ['user' => $user]);

        $requerimiento = Requerimiento::find($id);
        if (!$requerimiento) {
            return response()->json(['message' => 'Requerimiento no encontrado'], 404);
        }

        // Log para verificar el ID_GRUPO del requerimiento
        Log::info('Requerimiento ID_GRUPO:', ['ID_GRUPO' => $requerimiento->ID_GRUPO]);

        // Verifica si el usuario es un estudiante y es dueño del requerimiento, o si es un docente
        if ($user->role === 'estudiante' && $requerimiento->ID_GRUPO !== $user->ID_GRUPO) {
            return response()->json(['message' => 'No autorizado para eliminar este requerimiento'], 403);
        }

        // Log para confirmar que se procederá a eliminar el requerimiento
        Log::info('Procediendo a eliminar el requerimiento:', ['ID' => $requerimiento->id]);

        // Elimina el requerimiento si pasa las verificaciones
        $requerimiento->delete();

        return response()->json(['message' => 'Requerimiento eliminado correctamente']);
    }
    public function crearParaGrupo(Request $request)
    {
        $request->validate([
            'ID_GRUPO' => 'required|string|exists:grupo,ID_GRUPO',
            'DESCRIPCION_REQ' => 'required|string|max:1000',
        ]);

        $requerimiento = new Requerimiento();
        $requerimiento->ID_GRUPO = $request->ID_GRUPO;
        $requerimiento->DESCRIPCION_REQ = $request->DESCRIPCION_REQ;
        $requerimiento->ID_PROYECTO = null; // Si es necesario, establece este campo en `null` o maneja de acuerdo a tu lógica

        $requerimiento->save();

        return response()->json($requerimiento, 201);
    }
}
