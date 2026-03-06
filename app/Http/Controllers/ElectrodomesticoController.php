<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Electrodomestico; // Importamos el Modelo
use Inertia\Inertia;

class ElectrodomesticoController extends Controller
{
    /**
     * Muestra el catálogo de todos los electrodomésticos en venta.
     */
    public function index()
    {
        // Accedemos a todos los electrodomésticos disponibles (Modelo)
        $electrodomesticos = Electrodomestico::all();

        // Los pasamos a la vista correspondiente en React (resources/js/Pages/Electrodomesticos/Index.jsx)
        return Inertia::render('Electrodomesticos/Index', [
            'electrodomesticos' => $electrodomesticos
        ]);
    }

    /**
     * Muestra los detalles de un electrodoméstico específico.
     * @param Electrodomestico $electrodomestico Inyección de dependencias de Laravel
     */
    public function show(Electrodomestico $electrodomestico)
    {
        // Pasamos el electrodoméstico encontrado a su vista de detalle en React
        return Inertia::render('Electrodomesticos/Show', [
            'electrodomestico' => $electrodomestico
        ]);
    }

    // --- MÉTODOS DE ADMINISTRACIÓN (CRUD) --- //

    public function adminIndex()
    {
        return Inertia::render('Admin/Electrodomesticos/Index', [
            'electrodomesticos' => Electrodomestico::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Electrodomesticos/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'eficiencia_energetica' => 'nullable|string|max:10',
            'stock' => 'required|integer|min:0',
        ]);

        Electrodomestico::create($validated);

        return redirect()->route('admin.electrodomesticos.index')->with('message', 'Electrodoméstico creado con éxito.');
    }

    public function edit(Electrodomestico $electrodomestico)
    {
        return Inertia::render('Admin/Electrodomesticos/Edit', [
            'electrodomestico' => $electrodomestico
        ]);
    }

    public function update(Request $request, Electrodomestico $electrodomestico)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'eficiencia_energetica' => 'nullable|string|max:10',
            'stock' => 'required|integer|min:0',
        ]);

        $electrodomestico->update($validated);

        return redirect()->route('admin.electrodomesticos.index')->with('message', 'Electrodoméstico actualizado con éxito.');
    }

    public function destroy(Electrodomestico $electrodomestico)
    {
        $electrodomestico->delete();

        return redirect()->route('admin.electrodomesticos.index')->with('message', 'Electrodoméstico eliminado con éxito.');
    }
}
