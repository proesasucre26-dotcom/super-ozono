export type ProductId =
  | 'biocida-super-ozono'
  | 'super-star'
  | 'super-bacterias'
  | 'super-suelos'
  | 'super-insectos';

export interface AffiliatePrices {
  platino: number;
  gold: number;
  diamante: number;
}

export interface Product {
  id: ProductId;
  name: string;
  shortSubtitle: string;
  category: string;
  isFlagship?: boolean;
  pricePublic: number;
  affiliatePrices?: AffiliatePrices;
  yieldLiters: number; // e.g., 400 or 200 L per 1 L bottle
  yieldNote: string;
  includesActivator?: boolean;
  composition?: string;
  image: string;
  imageAlt: string;
  detailImage: string;
  detailImageAlt: string;
  summary: string;
  technicalDescription: string;
  benefits: string[];
  mechanism: string;
  targetGroups?: { label: string; items: string }[];
  dosagePer200L: number; // in ml for calculator (standard or intensive)
  applicationMethod: string;
  preparationSteps: string[];
  keyRecommendations: string[];
}

export type PriceTier = 'publico' | 'platino' | 'gold' | 'diamante';

export const PRICE_TIER_LABELS: Record<PriceTier, string> = {
  publico: 'Público',
  platino: 'Platino',
  gold: 'Gold',
  diamante: 'Diamante',
};

export interface CartItem {
  product: Product;
  tier: PriceTier;
  quantity: number;
}

export function getProductUnitPrice(product: Product, tier: PriceTier): number {
  if (tier === 'publico') return product.pricePublic;
  return product.affiliatePrices?.[tier] ?? product.pricePublic;
}

export const WHATSAPP_NUMBER = '59172853351';
export const WHATSAPP_DISPLAY = '+591 72853351';
export const OFFICIAL_EMAIL = 'proesasucre26@gmail.com';
export const BRAND_LOGO_PATH = '/assets/aistudio/ozon_d09fd79c.png';
export const PROESA_LOGO_PATH = '/assets/aistudio/distribuidora_2_991d1ae6.png';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const AFFILIATION_TIERS = [
  { name: 'Platino', fee: 140 },
  { name: 'Gold', fee: 350 },
  { name: 'Diamante', fee: 700 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'biocida-super-ozono',
    name: 'Biocida Super Ozono',
    shortSubtitle: 'Producto Estrella · Interfaz Agua-Aceite',
    category: 'Acaricida, Nematicida, Bactericida, Fungicida y Viricida',
    isFlagship: true,
    pricePublic: 250,
    affiliatePrices: {
      platino: 215,
      gold: 193,
      diamante: 172,
    },
    yieldLiters: 400,
    yieldNote: '1 L rinde hasta 400 L de agua',
    image: '/assets/aistudio/biocida_1_c4fcb3ce.webp',
    imageAlt: 'Botella oficial de 1 litro Biocida Super Ozono',
    detailImage: '/assets/aistudio/biocida_2_73afce42.webp',
    detailImageAlt: 'Características e espectro de control de Biocida Super Ozono',
    summary:
      'Triple acción y bioestimulante para todo tipo de cultivo. Combate eficazmente hongos y virus aéreos con 0% residuo químico.',
    technicalDescription:
      'Fórmula insignia con interfaz agua-aceite diseñada para controlar eficazmente enfermedades causadas por hongos y virus en la parte aérea de cítricos, frutas tropicales, hortalizas, granos, tubérculos, frutillas, café, cacao, flores y oleaginosas.',
    benefits: [
      'Acaricida, nematicida, bactericida, fungicida y viricida con triple acción bioestimulante.',
      'Botella de 1 litro que rinde para mezclar hasta con 400 litros de agua.',
      'Efectivo contra Antracnosis, Alternaria, Mildiu velloso, Oídio, Roya, Botrytis y Fusarium foliar.',
      'Controla virus del mosaico (TMV/CMV), TYLCV en tomate, RSV en arroz y mancha anular en papaya.',
    ],
    mechanism:
      'Aceites ozonizados en interfaz agua-aceite que liberan ozono activo (O₃) al contacto foliar, oxidando esporas de hongos y partículas virales sin dejar residuos tóxicos ni generar resistencia.',
    targetGroups: [
      {
        label: 'Hongos aéreos',
        items:
          'Antracnosis (Colletotrichum spp.), Alternaria, Mildiu velloso (Peronospora spp.), Oídio (Erysiphe spp.), Roya (Puccinia spp.), Botrytis (moho gris) y Fusarium en hojas y flores.',
      },
      {
        label: 'Virus agrícolas',
        items:
          'Virus del mosaico (tabaco, tomate, fríjol), enrollamiento amarillo del tomate (TYLCV), estriado del arroz (RSV), mancha anular (papaya) y mosaico del pepino (CMV).',
      },
    ],
    dosagePer200L: 500,
    applicationMethod: 'Aspersión foliar uniforme (y radicular en tratamiento curativo de choque).',
    preparationSteps: [
      'Verifica que el agua tenga pH entre 5.5 y 7.5 (si usas regulador de pH, aplícalo al agua 24 horas antes).',
      'Agita bien la botella de 1 L de Biocida Super Ozono antes de dosificar.',
      'En uso preventivo aplica 500 ml por tanque de 200 L (1 L rinde 400 L de agua).',
      'Para tratamiento curativo de choque inicia con 1 L en 200 L de agua el Día 1.',
    ],
    keyRecommendations: [
      'Mantener alejado de cualquier fuente de nitrógeno con concentración superior al 6%.',
      'Aplicar en ciclo corto cada 8 días y en ciclo largo cada 15 a 25 días.',
      'Grabar video del antes y después de la aplicación para respaldar la garantía del 100%.',
    ],
  },
  {
    id: 'super-star',
    name: 'Super Star',
    shortSubtitle: 'Bioestimulante a Base de Algas Marinas',
    category: 'Bioestimulación, Floración y Cuaje',
    pricePublic: 260,
    affiliatePrices: {
      platino: 220,
      gold: 198,
      diamante: 166,
    },
    yieldLiters: 400,
    yieldNote: '1 L rinde hasta 400 L de agua',
    includesActivator: true,
    image: '/assets/aistudio/star_1_0a600c0a.webp',
    imageAlt: 'Botella oficial de 1 litro Super Star',
    detailImage: '/assets/aistudio/star_2_7be64b3d.webp',
    detailImageAlt: 'Beneficios de floración, cuajado y tamaño de fruto de Super Star',
    summary:
      'Bioestimulante a base de algas marinas con activador que aumenta floración, tamaño del fruto y producción del 20% al 100%.',
    technicalDescription:
      'Complejo bioestimulante a base de algas marinas y aceite ozonizado con activador incluido. Diseñado para optimizar el metabolismo vegetal, desestresar cultivos intoxicados y elevar drásticamente la productividad.',
    benefits: [
      'Incrementa la producción del cultivo en un 20% a 100%.',
      'Mejora la conductividad eléctrica de la planta, aumenta la floración y sostiene las flores.',
      'Mejora el equilibrio, calibre y tamaño del fruto junto con su apariencia física.',
      'Desestresa las plantas después de intoxicaciones químicas y promueve desarrollo foliar vía radicular o foliar.',
    ],
    mechanism:
      'Sinergia de extractos puros de algas marinas activadas con ozono que potencian la conductividad eléctrica celular, movilizan nutrientes hacia flores y frutos, e incrementan la longevidad y sostenibilidad del cultivo.',
    targetGroups: [
      {
        label: 'Acción fisiológica',
        items:
          'Retención y cuaje floral, recuperación tras intoxicación por agroquímicos, mayor vigor foliar y radicular, y aumento de longevidad productiva.',
      },
    ],
    dosagePer200L: 500,
    applicationMethod: 'Aplicación tanto radicular (drench/riego) como foliar en etapas de crecimiento, floración y llenado.',
    preparationSteps: [
      'Usa agua limpia con pH entre 5.5 y 7.5.',
      'Incorpora el activador incluido según indicación técnica y agita suavemente.',
      'Dosifica 500 ml por tanque de 200 L (1 botella de 1 L rinde para 400 L de agua).',
      'Aplica en cobertura foliar o en zona radicular en horas frescas del día.',
    ],
    keyRecommendations: [
      'No mezclar con fuentes de nitrógeno superiores al 6%.',
      'Ideal tras estrés térmico, granizadas o intoxicaciones por pesticidas sintéticos.',
      'Aplicar cada 8 días en ciclo corto o cada 15 a 25 días en ciclo largo.',
    ],
  },
  {
    id: 'super-bacterias',
    name: 'Super Bacterias',
    shortSubtitle: 'Bactericida de Amplio Espectro · Aceite 2.0',
    category: 'Control Bacteriano en Suelo y Parte Aérea',
    pricePublic: 230,
    affiliatePrices: {
      platino: 193,
      gold: 171,
      diamante: 152,
    },
    yieldLiters: 200,
    yieldNote: '1 L rinde para 200 L de agua',
    includesActivator: true,
    composition: 'Aceite de soja (98%), Ozono O₃ (2 ppm), Emulsionante (2%) + Activador de 30 ml.',
    image: '/assets/aistudio/bacterias_1_4a054727.webp',
    imageAlt: 'Botella oficial de 1 litro Super Bacterias',
    detailImage: '/assets/aistudio/bacterias_2_d1f67631.webp',
    detailImageAlt: 'Características y beneficios de Super Bacterias en suelo y follaje',
    summary:
      'Bactericida de amplio espectro (Segunda Generación Aceite 2.0) que elimina bacterias radiculares y aéreas en cualquier cultivo.',
    technicalDescription:
      'Formulación especializada de Segunda Generación (Aceite 2.0) compuesta por aceite de soja al 98%, ozono O₃ (2 ppm), emulsionante (2%) y activador de 30 ml. Actúa de forma contundente contra bacterias vasculares del suelo y follaje.',
    benefits: [
      'Elimina todo tipo de bacteria, aplicable en cualquier cultivo sin antibióticos sintéticos.',
      'Controla bacterias radiculares: Ralstonia solanacearum (marchitez bacteriana) y Agrobacterium tumefaciens (tumores de raíz).',
      'Combate bacterias aéreas: Xanthomonas spp., Erwinia spp., Pseudomonas syringae, Clavibacter michiganensis y Dickeya spp.',
      'Botella de 1 litro + activador de 30 ml: rinde para mezclar con 200 litros de agua.',
    ],
    mechanism:
      'Aceite de soja hiper-ozonizado de segunda generación activado al momento de la mezcla para destruir membranas bacterianas tanto en tejido foliar como en el sistema vascular de la raíz.',
    targetGroups: [
      {
        label: 'Bacterias radiculares',
        items:
          'Ralstonia solanacearum (marchitez bacteriana) y Agrobacterium tumefaciens (tumores de raíz).',
      },
      {
        label: 'Bacterias aéreas',
        items:
          'Xanthomonas spp. (mancha bacteriana, cancros), Erwinia spp. (podredumbre blanda), Pseudomonas syringae (tizón bacteriano), Clavibacter michiganensis (cancro bacteriano del tomate) y Dickeya spp. (pudrición basal en hortalizas).',
      },
    ],
    dosagePer200L: 1000,
    applicationMethod: 'Aplicación en suelo/cuello para marchitez y aspersión foliar para manchas y cancros.',
    preparationSteps: [
      'Prepara el tanque con 200 L de agua limpia (pH 5.5 a 7.5).',
      'Combina el contenido del activador de 30 ml con la botella de 1 L de Super Bacterias.',
      'Vierte 1 litro por cada 200 litros de agua (100 ml por mochila de 20 L) y mezcla homogéneamente.',
      'Aplica dirigiendo el caldo a hojas, tallos con cancros y cuello de la planta.',
    ],
    keyRecommendations: [
      'Evitar contacto con fuentes de nitrógeno > 6% en el tanque de mezcla.',
      'Si el agua requiere regulador de pH, aplicarlo 24 horas antes.',
      'Excelente tras podas, lluvias intensas o primeros síntomas de podredumbre blanda.',
    ],
  },
  {
    id: 'super-suelos',
    name: 'Super Suelos 2.0',
    shortSubtitle: 'Segunda Generación Aceite 2.0 · Activador Incluido',
    category: 'Fungicida, Bactericida, Nematicida e Insecticida de Suelo',
    pricePublic: 230,
    affiliatePrices: {
      platino: 190,
      gold: 171,
      diamante: 152,
    },
    yieldLiters: 400,
    yieldNote: '1 L rinde de 200 a 400 L de agua',
    includesActivator: true,
    image: '/assets/aistudio/suelos_1_c1d715cf.webp',
    imageAlt: 'Botella oficial de 1 litro Super Suelos 2.0',
    detailImage: '/assets/aistudio/suelos_2_84ca0dc6.webp',
    detailImageAlt: 'Características y beneficios de Super Suelos 2.0 para raíces y suelo',
    summary:
      'Controla hongos, bacterias, virus transmitidos por nematodos y nematodos agalladores; hiperoxigena y cicatriza las raíces.',
    technicalDescription:
      'Solución edáfica integral de Segunda Generación (Aceite 2.0) con activador incluido. Combate patógenos radiculares complejos mientras hiperoxigena el suelo, actúa como enraizante y libera materia orgánica bloqueada.',
    benefits: [
      'Controla hongos del suelo: Fusarium oxysporum, Rhizoctonia solani, Pythium spp. y Sclerotium rolfsii.',
      'Elimina nematodos (Meloidogyne spp., Pratylenchus spp., Radopholus spp.) y virus transmitidos por nematodos.',
      'Combate bacterias del suelo (Ralstonia solanacearum, Agrobacterium spp.).',
      'Hiperoxigena la zona radicular, desinfecta y cicatriza raíces, actúa como enraizante y acelera la oxidación de materia orgánica bloqueada.',
    ],
    mechanism:
      'Libera oxígeno activo directamente en la rizosfera para suprimir patógenos anaerobios, nematodos y hongos vasculares, transformando materia orgánica bloqueada en nutrientes asimilables para nuevas raíces.',
    targetGroups: [
      {
        label: 'Hongos y bacterias de suelo',
        items:
          'Fusarium oxysporum, Rhizoctonia solani, Pythium spp., Sclerotium rolfsii, Ralstonia solanacearum y Agrobacterium spp.',
      },
      {
        label: 'Nematodos y virus edáficos',
        items:
          'Meloidogyne spp. (nematodo agallador), Pratylenchus spp., Radopholus spp. y virus transmitidos por nematodos.',
      },
    ],
    dosagePer200L: 1000,
    applicationMethod: 'Aplicación en drench directo a la raíz o inyección en sistema de fertirriego.',
    preparationSteps: [
      'Humedece el suelo previamente y verifica pH del agua entre 5.5 y 7.5.',
      'Mezcla el activador incluido con Super Suelos 2.0.',
      'Diluye 1 L en 200 L de agua (tratamiento intensivo de raíz) hasta 400 L de agua (mantenimiento edáfico).',
      'Aplica en drench dirigido al cuello/raíz o vía riego por goteo.',
    ],
    keyRecommendations: [
      'No combinar con fertilizantes nitrogenados > 6% en la misma aplicación.',
      'Aplicar en horas frescas de la mañana o tarde con humedad adecuada en suelo.',
      'Ideal para papa, tubérculos, hortalizas y frutales con fatiga de suelo o agallas radiculares.',
    ],
  },
  {
    id: 'super-insectos',
    name: 'Super Insectos',
    shortSubtitle: 'Tratamiento Integral de Plagas y Enfermedades',
    category: 'Insecticida Botánico (Limonoide / Azadiractina)',
    pricePublic: 250,
    affiliatePrices: {
      platino: 215,
      gold: 193,
      diamante: 172,
    },
    yieldLiters: 400,
    yieldNote: '1 L rinde hasta 400 L de agua',
    includesActivator: true,
    composition: 'Principio activo natural Limonoide (Azadiractina) + Aceites ozonizados + Activador.',
    image: '/assets/aistudio/insectos_1_6f190bf2.webp',
    imageAlt: 'Botella oficial de 1 litro Super Insectos',
    detailImage: '/assets/aistudio/insectos_2_2c251000.webp',
    detailImageAlt: 'Plagas controladas por Super Insectos: mosca blanca, pulgón, trips, minador y cochinilla',
    summary:
      'Tratamiento integral a base de Limonoide (Azadiractina) y aceites ozonizados contra mosca blanca, pulgones, trips, ácaros, minadores y gusanos.',
    technicalDescription:
      'Formulación bioestimulante y anabólica natural que combina el principio activo botánico Limonoide (Azadiractina) con aceites ozonizados y activador para un control limpio de insectos chupadores y masticadores.',
    benefits: [
      'Combate insectos como pulgones, cochinilla, minadores, trips, orugas, ácaros y mosca blanca.',
      'Principio activo natural Limonoide (Azadiractina) potenciado con ozono y activador.',
      'Efecto repelente, antialimentario y regulador del crecimiento de larvas y ninfas.',
      '0% residuos químicos dañinos: apto para hortalizas, frutales y cultivos de cosecha continua.',
    ],
    mechanism:
      'El Limonoide (Azadiractina) interrumpe la muda y alimentación de larvas e insectos chupadores mientras el aceite ozonizado disuelve la cutícula protectora al contacto.',
    targetGroups: [
      {
        label: 'Plagas controladas',
        items:
          'Mosca blanca, pulgones, cochinilla, minadores de hoja, trips, orugas/gusanos y ácaros.',
      },
    ],
    dosagePer200L: 500,
    applicationMethod: 'Aspersión foliar dirigida especialmente al envés de las hojas.',
    preparationSteps: [
      'Asegura agua limpia con pH entre 5.5 y 7.5.',
      'Combina el activador incluido con Super Insectos y agita bien.',
      'Dosifica 500 ml por tanque de 200 L (1 L rinde hasta 400 L de agua; 50 ml por mochila de 20 L).',
      'Rocía cubriendo haz y envés de las hojas donde se refugian plagas y huevos.',
    ],
    keyRecommendations: [
      'Aplicar en horas frescas de la mañana o al caer la tarde para proteger insectos benéficos.',
      'No mezclar con fuentes de nitrógeno superiores al 6%.',
      'En presión alta de plagas, repetir cada 5 a 8 días.',
    ],
  },
];

export const USAGE_PROTOCOLS = {
  preventive: [
    {
      title: 'Cultivos de Ciclo Corto',
      dosage: '500 ml por tanque de 200 litros',
      frequency: 'Aplicaciones preventivas cada 8 días',
      crops:
        'Coca, arroz, soja, lechuga, espinaca, rábano, zanahoria, cilantro, fríjol, pepino, tomate cherry, pimiento, calabacín, sandía, melón, cebolla de rama, acelga y fresa.',
    },
    {
      title: 'Cultivos de Ciclo Largo',
      dosage: '500 ml por tanque de 200 litros',
      frequency: 'Aplicaciones preventivas cada 15 a 25 días',
      crops:
        'Palta (aguacate), mango, cítricos (naranja, limón, mandarina), uva, café, cacao, caña de azúcar, plátano, banano, piña, aguaymanto, granadilla, maracuyá, papaya, durazno y manzana.',
    },
  ],
  curativeShock: [
    {
      day: 'Día 1 · Primera aplicación',
      dose: '1 litro de Super Ozono por tanque de 200 L + 5 litros de Coca-Cola',
      method: 'Aplicar tanto radicular como foliar para choque inicial.',
    },
    {
      day: 'Día 3 · Segunda aplicación',
      dose: '700 ml de Super Ozono por tanque de 200 L (sin Coca-Cola)',
      method: 'Aplicar radicular y foliar para consolidar control.',
    },
    {
      day: 'Día 6 · Tercera aplicación',
      dose: '500 ml de Super Ozono por tanque de 200 L (sin Coca-Cola)',
      method: 'Aplicar radicular y foliar; luego continuar cada 8 días (ciclo corto) o 15 días (ciclo largo) por 2 meses.',
    },
  ],
  waterAndCompatibility: [
    'pH del agua entre 5.5 y 7.5 para asegurar el óptimo funcionamiento del producto.',
    'Si es necesario usar un regulador de pH, aplicarlo al agua 24 horas antes de preparar la mezcla con Super Ozono.',
    'Nota importante: mantener el producto alejado de cualquier fuente de nitrógeno con concentración superior al 6% de nitrógeno.',
    'Garantía 100%: grabar un video durante la preparación y captura del antes y después para avalar la eficacia oficial.',
  ],
};

export interface RegionalCoverage {
  department: string;
  zoneFocus: string;
  keyCrops: string;
  supportModel: string;
}

export const REGIONAL_COVERAGE: RegionalCoverage[] = [
  {
    department: 'Santa Cruz',
    zoneFocus: 'Valles Cruceños, Norte Integrado y Zona Este',
    keyCrops: 'Aguacate Hass, soya, cítricos, caña de azúcar y hortalizas',
    supportModel: 'Stock inmediato y asesoría en campo',
  },
  {
    department: 'Cochabamba',
    zoneFocus: 'Valle Alto, Valle Central y Trópico',
    keyCrops: 'Tomate, pimentón, papa, cebolla, banano y piña',
    supportModel: 'Despacho diario y visitas técnicas',
  },
  {
    department: 'Chuquisaca',
    zoneFocus: 'Sede Sucre, Cintis y Valles Mesotérmicos',
    keyCrops: 'Durazno, manzana, uva, papa, ají y hortalizas',
    supportModel: 'Oficina Proesa y entrega directa',
  },
];

export interface Testimonial {
  id: string;
  farmerName: string;
  initials: string;
  crop: string;
  department: string;
  quote: string;
  detail: string;
  productsUsed: string;
  accentBg: string;
  accentText: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    farmerName: 'Ing. Carlos Mendoza',
    initials: 'CM',
    crop: 'Aguacate Hass',
    department: 'Santa Cruz',
    quote: 'Logramos cero residuos químicos y eliminamos la Phytophthora de la raíz.',
    detail:
      'En 14 hectáreas de aguacate Hass aplicamos Super Suelos 2.0 en drench y Biocida Super Ozono foliar siguiendo el protocolo de choque, recuperando el sistema radicular en 3 semanas.',
    productsUsed: 'Super Suelos 2.0 · Biocida Super Ozono',
    accentBg: 'bg-emerald-100',
    accentText: 'text-emerald-800',
  },
  {
    id: 't2',
    farmerName: 'Sra. Elena Morales',
    initials: 'EM',
    crop: 'Frutales (Durazno y Manzana)',
    department: 'Chuquisaca',
    quote: 'Super Star aumentó el cuaje y la calidad del fruto cosechado.',
    detail:
      'Con el bioestimulante a base de algas marinas Super Star en pre-floración y cuaje en los Cintis logramos mayor retención floral, mejor calibre y un incremento notable en producción.',
    productsUsed: 'Super Star · Biocida Super Ozono',
    accentBg: 'bg-amber-100',
    accentText: 'text-amber-800',
  },
  {
    id: 't3',
    farmerName: 'Don Ramiro Quispe',
    initials: 'RQ',
    crop: 'Hortalizas (Tomate y Pimentón)',
    department: 'Cochabamba',
    quote: 'Super Suelos controló el nematodo sin dañar la biología de la tierra.',
    detail:
      'En invernaderos del Valle Central detuvimos el nematodo agallador (Meloidogyne) y bacterias de pudrición basal manteniendo la fertilidad viva e hiperoxigenando la raíz.',
    productsUsed: 'Super Suelos 2.0 · Super Bacterias · Super Insectos',
    accentBg: 'bg-teal-100',
    accentText: 'text-teal-800',
  },
];
