/**
 * Casa Palm — Catálogo
 * Rutas exactas del repositorio patagonia360estudio/Patagonia360-spatial-models
 *
 * Carpeta modelos/  → antique_wardrobe.glb / vintage_chair.glb / bathroom_sink__low_poly.glb
 * Carpeta miniaturas/ → mueble.svg / silla-vintage.svg / lavabo.svg
 *
 * ⚠️  Si el nombre del bathroom_sink GLB difiere, ajustarlo aquí.
 */

export const CATALOGO = [
  {
    id:             'mueble',
    nombre:         'Armario Clásico',
    subtitulo:      'Colección Heritage',
    categoria:      'mobiliario',
    categoriaLabel: 'Mobiliario',
    precio:         1290,
    precioFormato:  '$1.290',
    descripcion:    'Armario vintage en madera maciza. Herrajes de latón envejecido. Diseñado para durar generaciones.',
    specs: [
      { label: 'Material',  value: 'Madera maciza + latón' },
      { label: 'Acabado',   value: 'Natural cera'           },
      { label: 'Garantía',  value: '5 años'                 },
    ],
    glb:       'modelos/antique_wardrobe.glb',
    usdz:      'modelos/Antique_Wardrobe.usdz',
    miniatura: 'miniaturas/mueble.svg',
    badge:     'Nuevo',
    arListo:   true,
  },
  {
    id:             'silla-vintage',
    nombre:         'Silla Vintage',
    subtitulo:      'Colección Atelier',
    categoria:      'sillas',
    categoriaLabel: 'Sillas',
    precio:         490,
    precioFormato:  '$490',
    descripcion:    'Estructura de roble macizo con tapicería bouclé. Un clásico reinterpretado para el espacio contemporáneo.',
    specs: [
      { label: 'Material',  value: 'Roble + bouclé'   },
      { label: 'Acabado',   value: 'Aceite natural'    },
      { label: 'Garantía',  value: '3 años'            },
    ],
    glb:       'modelos/vintage_chair.glb',
    usdz:      'modelos/Vintage_Chair.usdz',
    miniatura: 'miniaturas/silla-vintage.svg',
    arListo:   true,
  },
  {
    id:             'lavabo',
    nombre:         'Lavabo Minimal',
    subtitulo:      'Colección Baños',
    categoria:      'banos',
    categoriaLabel: 'Baños',
    precio:         890,
    precioFormato:  '$890',
    descripcion:    'Porcelana de alta resistencia, geometría pura. Minimalismo que transforma el ritual del baño.',
    specs: [
      { label: 'Material',  value: 'Porcelana vitrificada' },
      { label: 'Acabado',   value: 'Blanco mate'           },
      { label: 'Garantía',  value: '10 años'               },
    ],
    // ⚠️  Verificar nombre exacto del archivo en el repo
    glb:       'modelos/bathroom_sink__low_poly.glb',
    usdz:      'modelos/Bathroom_Sink__Low_Poly.usdz',
    miniatura: 'miniaturas/lavabo.svg',
    arListo:   true,
  },
];

/** Buscar producto por id, fallback al primero */
export function getProducto(id) {
  return CATALOGO.find(p => p.id === id) ?? CATALOGO[0];
}
