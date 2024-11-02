<?php

namespace App\Http\Controllers;

use App\Models\Requerimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RequerimientoController extends Controller
{
    public function index($projectId)
    {
        $requerimientos = Requerimiento::where('ID_PROYECTO', $projectId)->get();
        return response()->json($requerimientos);
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
        $requerimiento = Requerimiento::findOrFail($id);
        $requerimiento->delete();

        return response()->json(['message' => 'Requerimiento eliminado correctamente']);
    }
}
