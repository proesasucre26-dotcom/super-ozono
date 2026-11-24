import { useState } from 'react';
import {
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Leaf,
  MessageCircle,
  ShoppingCart,
  Check,
} from 'lucide-react';
import { PRODUCTS, BRAND_LOGO_PATH, buildWhatsAppUrl } from '../data/catalog';
import type { Product } from '../data/catalog';

interface CatalogTabProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function CatalogTab({ onSelectProduct, onAddToCart }: CatalogTabProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1400);
  };

  return (
    <div className="space-y-6">
      {/* Large Banner Containing ONLY the Official Super Ozono Logo */}
      <section
        aria-label="Logotipo oficial Super Ozono"
        className="rounded-2xl bg-white border border-emerald-400/30 px-6 py-7 sm:py-10 flex items-center justify-center shadow-md"
      >
        <img
          src={BRAND_LOGO_PATH}
          alt="Super Ozono"
          referrerPolicy="no-referrer"
          className="w-full max-w-[260px] sm:max-w-[340px] h-auto object-contain"
        />
      </section>

      {/* Dark Green Hero Banner */}
      <section className="rounded-2xl bg-[#06371B] border border-emerald-400/25 text-white p-5 sm:p-6 shadow-md">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight">
            Catálogo de productos aceites ozonizados
          </h1>
          <p className="text-sm text-emerald-100 leading-relaxed">
            Biotecnología a base de ozono activo para proteger raíces, frenar bacterias,
            hongos, virus e insectos con{' '}
            <span className="font-bold text-amber-300">0% residuo químico y 100% garantía</span>.
          </p>
        </div>

        {/* Clean unboxed trust strip */}
        <div className="mt-4 pt-3.5 border-t border-emerald-400/20 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-emerald-100">
          <span className="inline-flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            100% Orgánico
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            0% Residuo Químico
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
            Envíos a toda Bolivia
          </span>
        </div>
      </section>

      {/* Section Heading */}
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-lg sm:text-xl font-bold text-white">
          Catálogo Oficial Super Ozono Bolivia
        </h2>
        <span className="text-xs font-mono font-semibold text-emerald-300 tabular-nums shrink-0">
          5 productos
        </span>
      </div>

      {/* Product Cards on Dark Green Background with High-Contrast Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCTS.map((product) => {
          const hasImageError = failedImages[product.id];
          const isJustAdded = justAddedId === product.id;
          const orderUrl = buildWhatsAppUrl(
            `Hola Proesa Distribuidora, deseo hacer un pedido de ${product.name} (Botella 1 Litro). Por favor confírmenme disponibilidad y envío.`
          );

          return (
            <article
              key={product.id}
              className="group bg-[#06371B] rounded-2xl border border-emerald-400/25 hover:border-emerald-300/60 transition-all duration-200 overflow-hidden flex flex-col shadow-md"
            >
              {/* Official Catalog Product Image */}
              <div className="relative aspect-square bg-white overflow-hidden">
                {!hasImageError ? (
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [product.id]: true }))
                    }
                    className="w-full h-full object-contain object-center group-hover:scale-[1.03] transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black/30 text-emerald-200 p-6 text-center">
                    <Leaf className="w-10 h-10 text-[#00C853] mb-2" />
                    <span className="font-display font-bold text-base text-white">
                      {product.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-emerald-300">{product.category}</p>
                  <h3 className="font-display text-lg font-bold text-white leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-sm text-emerald-100/90 leading-relaxed line-clamp-2">
                    {product.summary}
                  </p>
                </div>

                {/* High-Contrast Action Buttons */}
                <div className="space-y-2 pt-3 border-t border-emerald-400/20">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Ver Características</span>
                    <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className="flex-1 min-h-[44px] px-3 py-2.5 rounded-xl bg-[#E60000] hover:bg-[#C70000] active:scale-[0.98] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs whitespace-nowrap"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Pedido agregado</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Hacer pedido</span>
                        </>
                      )}
                    </button>

                    <a
                      href={orderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pedir ${product.name} por WhatsApp`}
                      title="Pedir por WhatsApp"
                      className="min-h-[44px] min-w-[44px] px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span className="sr-only sm:not-sr-only">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
