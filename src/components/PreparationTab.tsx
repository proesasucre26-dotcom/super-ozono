import { useState, useEffect } from 'react';
import {
  ChevronDown,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Video,
  MessageCircle,
  ShoppingCart,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PRODUCTS, USAGE_PROTOCOLS } from '../data/catalog';
import type { Product, ProductId } from '../data/catalog';

interface PreparationTabProps {
  focusedProductId?: ProductId | null;
  onAddToCart: (product: Product) => void;
}

const TANK_VOLUMES = [
  { liters: 20, label: '20 L (Mochila)' },
  { liters: 200, label: '200 L (Tanque)' },
  { liters: 400, label: '400 L (Turril x2)' },
  { liters: 1000, label: '1000 L (Cisterna)' },
];

export function PreparationTab({ focusedProductId, onAddToCart }: PreparationTabProps) {
  const [openId, setOpenId] = useState<ProductId>(focusedProductId || 'biocida-super-ozono');
  const [tankLiters, setTankLiters] = useState<number>(200);
  const [protocolMode, setProtocolMode] = useState<'preventivo' | 'choque'>('preventivo');

  useEffect(() => {
    if (focusedProductId) {
      setOpenId(focusedProductId);
    }
  }, [focusedProductId]);

  const formatDose = (dosagePer200L: number, volumeLiters: number) => {
    const mlNeeded = (dosagePer200L * volumeLiters) / 200;
    if (mlNeeded < 1000) {
      return `${Math.round(mlNeeded)} ml`;
    }
    const litersNeeded = mlNeeded / 1000;
    const rounded = Number.isInteger(litersNeeded)
      ? litersNeeded.toString()
      : litersNeeded.toFixed(2).replace(/\.?0+$/, '');
    return `${rounded} L`;
  };

  return (
    <div className="space-y-6">
      {/* Header & Tank Volume Calculator */}
      <section className="rounded-2xl bg-[#06371B] border border-emerald-400/25 text-white p-5 space-y-4 shadow-md">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-emerald-300">
            Modo de Uso Oficial · Catálogo Super Ozono Bolivia
          </p>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
            Preparación, dosis y plan de aplicaciones
          </h1>
          <p className="text-sm text-emerald-100/90">
            Calcula la dosis exacta según la capacidad de tu equipo y consulta los protocolos
            oficiales preventivos y de choque.
          </p>
        </div>

        {/* Tank Volume Selector */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-emerald-200 block">
            Capacidad de tu tanque o mochila:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TANK_VOLUMES.map((tank) => {
              const active = tankLiters === tank.liters;
              return (
                <button
                  key={tank.liters}
                  type="button"
                  onClick={() => setTankLiters(tank.liters)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer tabular-nums ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-black/35 text-white border border-white/15 hover:bg-black/50'
                  }`}
                >
                  {tank.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accordion List for the 5 Products */}
      <div className="space-y-3">
        {PRODUCTS.map((product) => {
          const isOpen = openId === product.id;
          const calculatedDose = formatDose(product.dosagePer200L, tankLiters);

          return (
            <div
              key={product.id}
              className={`rounded-2xl bg-[#06371B] border transition-colors overflow-hidden shadow-md ${
                isOpen ? 'border-emerald-300/60' : 'border-emerald-400/25'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? ('' as ProductId) : product.id)}
                aria-expanded={isOpen}
                className="w-full min-h-[64px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="min-w-0 space-y-0.5">
                  <span className="font-display text-base font-bold text-white block">
                    {product.name}
                  </span>
                  <p className="text-xs text-emerald-200/85 truncate">{product.shortSubtitle}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-emerald-200 block leading-none">
                      Dosis ({tankLiters} L)
                    </span>
                    <span className="font-mono text-sm font-bold text-amber-300 tabular-nums">
                      {calculatedDose}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.18 }}
                    className="w-8 h-8 rounded-lg bg-black/35 border border-white/15 flex items-center justify-center text-white"
                  >
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-emerald-400/20"
                  >
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Dose Highlight Box */}
                      <div className="p-4 rounded-xl bg-black/35 border border-emerald-400/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs font-semibold text-emerald-300 block">
                            Dosis calculada para {tankLiters} L de agua
                          </span>
                          <span className="font-mono text-2xl font-bold text-amber-300 tabular-nums">
                            {calculatedDose}
                          </span>
                          <span className="text-xs text-emerald-100 block mt-0.5 tabular-nums">
                            Referencia: {product.dosagePer200L} ml por tanque de 200 L
                          </span>
                        </div>
                        <div className="sm:border-l sm:border-emerald-400/20 sm:pl-4 flex flex-col justify-center">
                          <span className="text-xs font-semibold text-emerald-300 block">
                            Vía de aplicación recomendada
                          </span>
                          <span className="text-sm font-medium text-white mt-0.5">
                            {product.applicationMethod}
                          </span>
                        </div>
                      </div>

                      {/* Step-by-step instructions */}
                      <div className="space-y-2.5">
                        <h3 className="font-display text-sm font-bold text-white">
                          Instrucciones de mezcla paso a paso
                        </h3>
                        <ol className="space-y-2">
                          {product.preparationSteps.map((step, index) => (
                            <li
                              key={step}
                              className="flex items-start gap-3 text-sm text-emerald-50"
                            >
                              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-mono text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                                {index + 1}
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Key Recommendations */}
                      <div className="pt-2 border-t border-emerald-400/20 space-y-2">
                        <h3 className="font-display text-sm font-bold text-white">
                          Recomendaciones clave en campo
                        </h3>
                        <ul className="space-y-1.5">
                          {product.keyRecommendations.map((rec) => (
                            <li
                              key={rec}
                              className="flex items-start gap-2 text-sm text-emerald-100/90"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Add to cart & Order via WhatsApp */}
                      <div className="pt-3 border-t border-emerald-400/20 flex flex-col sm:flex-row justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl bg-[#E60000] hover:bg-[#C70000] text-white font-extrabold text-xs inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                        >
                          <ShoppingCart className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Hacer pedido</span>
                        </button>
                        <a
                          href={`https://wa.me/59172853351?text=${encodeURIComponent(
                            `Hola Proesa Distribuidora, deseo pedir ${product.name} (1 Litro) para mi equipo de ${tankLiters} L.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-extrabold text-xs inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-xs"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Hacer pedido por WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Official Application Plans (Pages 10-13) */}
      <section className="rounded-2xl bg-[#06371B] border border-emerald-400/25 text-white p-5 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-white">
              Plan Oficial de Aplicaciones
            </h2>
            <p className="text-xs text-emerald-200">
              Cultivos de ciclo corto, ciclo largo y tratamiento curativo de choque
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/35 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setProtocolMode('preventivo')}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                protocolMode === 'preventivo'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              Uso Preventivo
            </button>
            <button
              type="button"
              onClick={() => setProtocolMode('choque')}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                protocolMode === 'choque'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              Tratamiento Choque
            </button>
          </div>
        </div>

        {protocolMode === 'preventivo' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {USAGE_PROTOCOLS.preventive.map((plan) => (
              <div
                key={plan.title}
                className="p-4 rounded-xl bg-black/35 border border-emerald-400/20 space-y-2"
              >
                <h3 className="font-display text-base font-bold text-white">{plan.title}</h3>
                <p className="font-mono text-xs font-bold text-amber-300 tabular-nums">
                  {plan.dosage} · {plan.frequency}
                </p>
                <p className="text-xs text-emerald-100/90 leading-relaxed">{plan.crops}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2.5">
            {USAGE_PROTOCOLS.curativeShock.map((step) => (
              <div
                key={step.day}
                className="p-4 rounded-xl bg-black/35 border border-amber-400/30 space-y-1"
              >
                <span className="text-xs font-bold text-amber-300 block">{step.day}</span>
                <p className="font-display text-sm font-bold text-white">{step.dose}</p>
                <p className="text-xs text-emerald-100/90">{step.method}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Water pH, Nitrogen Rule & 100% Guarantee Strip */}
      <section className="rounded-2xl bg-[#06371B] border border-emerald-400/25 text-white p-5 space-y-3 shadow-md">
        <h2 className="font-display text-base font-bold text-amber-300">
          Requisitos técnicos de mezcla y garantía 100%
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2.5">
            <Droplets className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-white">pH 5.5 a 7.5</p>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Si usas regulador de pH, aplícalo al agua 24 horas antes de mezclar con Super Ozono.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-white">Cero Nitrógeno &gt; 6%</p>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Mantén el producto alejado de fuentes con más de 6% de nitrógeno para no perder eficacia.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Video className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold text-white">Garantía 100%</p>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Graba un video corto del antes y después siguiendo el protocolo para respaldar la garantía.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-emerald-400/20 flex items-center gap-2 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>0% residuo químico · Apto para agricultura orgánica y de exportación</span>
        </div>
      </section>
    </div>
  );
}
