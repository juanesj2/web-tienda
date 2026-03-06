<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Servicio; // Importamos el Modelo
use Inertia\Inertia;

class ServicioController extends Controller
{
    /**
     * Muestra la lista de servicios de reparación.
     * Este método interactúa con el Modelo 'Servicio' para obtener datos
     * y se los pasa a la Vista para que sean renderizados.
     */
    public function index()
    {
        // Modelo: Obtenemos todos los registros de servicios de la base de datos
        $servicios = Servicio::all();

        // Enviamos los datos al componente de React ubicado en resources/js/Pages/Servicios/Index.jsx
        return Inertia::render('Servicios/Index', [
            'servicios' => $servicios
        ]);
    }

    // --- MÉTODOS DE ADMINISTRACIÓN (CRUD) --- //

    public function adminIndex()
    {
        return Inertia::render('Admin/Servicios/Index', [
            'servicios' => Servicio::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Servicios/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio_estimado' => 'required|numeric|min:0',
        ]);

        Servicio::create($validated);

        return redirect()->route('admin.servicios.index')->with('message', 'Servicio creado con éxito.');
    }

    public function edit(Servicio $servicio)
    {
        return Inertia::render('Admin/Servicios/Edit', [
            'servicio' => $servicio
        ]);
    }

    public function update(Request $request, Servicio $servicio)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio_estimado' => 'required|numeric|min:0',
        ]);

        $servicio->update($validated);

        return redirect()->route('admin.servicios.index')->with('message', 'Servicio actualizado con éxito.');
    }

    public function destroy(Servicio $servicio)
    {
        $servicio->delete();

        return redirect()->route('admin.servicios.index')->with('message', 'Servicio eliminado con éxito.');
    }
}
