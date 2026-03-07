<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reparacion;
use Inertia\Inertia;

class ReparacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reparaciones = Reparacion::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Reparaciones/Index', [
            'reparaciones' => $reparaciones
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'imagen_url' => 'nullable|url|max:255',
            'coste_estimado' => 'nullable|numeric|min:0',
            'destacado' => 'boolean'
        ]);

        Reparacion::create($validated);

        return redirect()->back()->with('success', 'Reparación añadida correctamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reparacion $reparacion)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'imagen_url' => 'nullable|url|max:255',
            'coste_estimado' => 'nullable|numeric|min:0',
            'destacado' => 'boolean'
        ]);

        $reparacion->update($validated);

        return redirect()->back()->with('success', 'Reparación actualizada.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reparacion $reparacion)
    {
        $reparacion->delete();
        return redirect()->back()->with('success', 'Reparación eliminada.');
    }
}
