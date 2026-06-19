/**
 * Casa Palm — Catálogo
 * Rutas corregidas para el repo patagonia360estudio/Patagonia360-spatial-models
 *
 * Carpeta real de modelos  → models/
 * Carpeta real thumbnails  → thumbnails/
 *
 * Campos en inglés para compatibilidad con viewer.html:
 *   name, priceFormatted, categoryLabel, thumbnail, glb, usdz, specs
 */

export const CATALOG = [
  {
    id:             'mueble',
    name:           'Armario Clásico',
    subtitle:       'Colección Heritage',
    category:       'mobiliario',
    categoryLabel:  'Mobiliario',
    price:          1290,
    priceFormatted: '$1.290',
    description:    'Armario vintage en madera maciza. Herrajes de latón envejecido forjados a mano.',
    specs: [
      { label: 'Material',  value: 'Madera maciza + latón' },
      { label: 'Acabado',   value: 'Natural cera'           },
      { label: 'Garantía',  value: '5 años'                 },
    ],
    glb:       'models/antique_wardrobe.glb',
    usdz:      'models/Antique_Wardrobe.usdz',
    thumbnail: 'thumbnails/mueble.svg',
    badge:     'Nuevo',
    arReady:   true,
  },
  {
    id:             'silla-vintage',
    name:           'Silla Vintage',
    subtitle:       'Colección Atelier',
    category:       'sillas',
    categoryLabel:  'Sillas',
    price:          490,
    priceFormatted: '$490',
    description:    'Estructura de roble macizo con tapicería bouclé artesanal.',
    specs: [
      { label: 'Material',  value: 'Roble + bouclé'   },
      { label: 'Acabado',   value: 'Aceite natural'    },
      { label: 'Garantía',  value: '3 años'            },
    ],
    glb:       'models/vintage_chair.glb',
    usdz:      'models/Vintage_Chair.usdz',
    thumbnail: 'thumbnails/silla-vintage.svg',
    arReady:   true,
  },
  {
    id:             'lavabo',
    name:           'Lavabo Minimal',
    subtitle:       'Colección Baños',
    category:       'banos',
    categoryLabel:  'Baños',
    price:          890,
    priceFormatted: '$890',
    description:    'Porcelana de alta resistencia, geometría pura.',
    specs: [
      { label: 'Material',  value: 'Porcelana vitrificada' },
      { label: 'Acabado',   value: 'Blanco mate'           },
      { label: 'Garantía',  value: '10 años'               },
    ],
    glb:       'models/bathroom_sink__low_poly.glb',
    usdz:      'models/Bathroom_Sink__Low_Poly.usdz',
    thumbnail: 'thumbnails/lavabo.svg',
    arReady:   true,
  },
];

/* ── Lookup por id ─────────────────────────────────────────── */
export function getProduct(id) {
  return CATALOG.find(p => p.id === id) ?? CATALOG[0];
}

/* ── Aliases en español (backward compat) ──────────────────── */
export const CATALOGO   = CATALOG;
export const getProducto = getProduct;
