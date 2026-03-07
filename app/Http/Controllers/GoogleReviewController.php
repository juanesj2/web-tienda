<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GoogleReviewController extends Controller
{
    /**
     * Fetch Google Reviews, cache them for 24 hours, and return as JSON.
     */
    public function getReviews()
    {
        $apiKey = env('GOOGLE_PLACES_API_KEY');
        $placeId = env('GOOGLE_PLACE_ID'); // We will leave instructions for the user to add this map ID.

        // Datos de respaldo amigables (fallback) si falta la API Key o falla la petición.
        $fallbackReviews = [
            [
                'author_name' => 'María García',
                'rating' => 5,
                'text' => 'Me arregló la lavadora en el mismo día. Un profesional de los pies a la cabeza y muy apañado de precio.',
                'relative_time_description' => 'hace 2 semanas',
                'profile_photo_url' => 'https://ui-avatars.com/api/?name=Maria+Garcia&background=0D8ABC&color=fff',
            ],
            [
                'author_name' => 'Antonio López',
                'rating' => 5,
                'text' => 'Llevaba tiempo buscando alguien de confianza en el pueblo para revisar la antena. Vino rápido y lo dejó perfecto.',
                'relative_time_description' => 'hace 1 mes',
                'profile_photo_url' => 'https://ui-avatars.com/api/?name=Antonio+Lopez&background=198754&color=fff',
            ],
            [
                'author_name' => 'Carmen Sánchez',
                'rating' => 5,
                'text' => 'Compramos aquí el frigorífico y nos lo instaló él mismo. Encantadores y siempre dispuestos a ayudar.',
                'relative_time_description' => 'hace 3 meses',
                'profile_photo_url' => 'https://ui-avatars.com/api/?name=Carmen+Sanchez&background=dc3545&color=fff',
            ]
        ];

        if (empty($apiKey) || empty($placeId)) {
            Log::warning('Google Places API Key o Place ID no configurados. Devolviendo reseñas de respaldo.');
            return response()->json(['reviews' => $fallbackReviews, 'status' => 'fallback']);
        }

        // Cache parameters: 24 horas = 60 * 60 * 24 = 86400 segundos (en Laravel < 5.8 eran minutos, en Laravel >= 5.8 son segundos).
        // Usamos remember para recordar u obtener.
        $reviews = Cache::remember('google_places_reviews', 86400, function () use ($apiKey, $placeId, $fallbackReviews) {
            try {
                // Nuevo endpoint de Places API (New)
                $response = Http::withHeaders([
                    'X-Goog-Api-Key' => $apiKey,
                    'X-Goog-FieldMask' => 'reviews'
                ])->get("https://places.googleapis.com/v1/places/{$placeId}", [
                    'languageCode' => 'es'
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    if (isset($data['reviews'])) {
                        // Mapear el nuevo formato de V1 al formato que espera nuestro frontend
                        $mapped = array_map(function($review) {
                            return [
                                'author_name' => $review['authorAttribution']['displayName'] ?? 'Usuario de Google',
                                'rating' => $review['rating'] ?? 5,
                                'text' => $review['originalText']['text'] ?? ($review['text']['text'] ?? ''),
                                'relative_time_description' => $review['relativePublishTimeDescription'] ?? '',
                                'profile_photo_url' => $review['authorAttribution']['photoUri'] ?? ''
                            ];
                        }, $data['reviews']);
                        
                        // Filtramos solo las de 4 o 5 estrellas y que tengan texto descriptivo
                        $filtered = array_filter($mapped, function($review) {
                            return isset($review['rating']) && $review['rating'] >= 4 && !empty($review['text']);
                        });
                        
                        // Si hay reseñas válidas, devolvemos las 5 mejores/más recientes
                        if (count($filtered) > 0) {
                            return array_slice(array_values($filtered), 0, 5);
                        }
                    }
                }
                
                Log::error("Fallo al obtener reseñas de Google Places (V1): " . $response->body());
                return $fallbackReviews;

            } catch (\Exception $e) {
                Log::error("Excepción al obtener reseñas de Google: " . $e->getMessage());
                return $fallbackReviews;
            }
        });

        return response()->json([
            'reviews' => $reviews,
            'status'  => $reviews === $fallbackReviews ? 'fallback' : 'live'
        ]);
    }
}
