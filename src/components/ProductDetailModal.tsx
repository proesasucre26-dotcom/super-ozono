import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  X,
  CheckCircle2,
  Atom,
  MessageCircle,
  FlaskConical,
  Minus,
  Plus,
  ShoppingCart,
} from 'lucide-react';
import { buildWhatsAppUrl } from '../data/catalog';
import type { PriceTier, Product } from '../data/catalog';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onGoToPreparation: (productId: Product['id']) => void;
  onAddToCart: (product: Product, tier: PriceTier, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onGoToPreparation,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setImgError(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  const unitPrice = product ? product.pricePublic : 0;
  const totalPrice = unitPrice * quantity;
  const totalWaterYield = product ? product.yieldLiters * quantity : 0;

  const whatsappHref = product
    ? buildWhatsAppUrl(
        `Hola Proesa Distribuidora, deseo hacer un pedido:\n• Producto: ${product.name} (Botella 1 Litro)\n• Precio unitario: Bs. ${unitPrice}\n• Cantidad: ${quantity} ${quantity === 1 ? 'botella' : 'botellas'}\n• Rendimiento total: hasta ${totalWaterYield} L de agua\n• Total estimado: Bs. ${totalPrice}\nPor favor confírmenme disponibilidad y envío.`
      )
    : '#';

  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs"
          />

          {/* Bottom Sheet (mobile) / Centered Modal (desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full md:max-w-xl max-h-[90vh] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Mobile Drag Handle */}
            <div className="md:hidden pt-3 pb-1 flex justify-center shrink-0">
              <span className="w-10 h-1.5 rounded-full bg-slate-300" aria-hidden="true" />
            </div>

            {/* Sticky Top Bar inside Modal */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-emerald-700 truncate">
                  {product.category}
                </p>
                <h2
                  id="modal-product-title"
                  className="font-display text-lg font-bold text-slate-900 truncate"
                >
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar detalle del producto"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto px-5 py-4 space-y-5 pb-safe">
              {/* 1. Foto del producto */}
              <div className="w-full max-w-sm mx-auto aspect-square rounded-xl overflow-hidden bg-white border border-slate-200/80">
                {!imgError ? (
                  <img
                    src={product.detailImage}
                    alt={product.detailImageAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-800 p-4 text-center">
                    <Atom className="w-8 h-8 mb-1 text-emerald-600" />
                    <span className="text-xs font-bold">{product.name}</span>
                  </div>
                )}
              </div>

              {/* Banner pequeño amarillo con el precio después de la foto */}
              <div className="px-4 py-2.5 rounded-xl bg-yellow-400 border border-yellow-500/60 text-slate-950 flex items-center justify-between gap-3 shadow-xs">
                <span className="text-xs font-extrabold uppercase tracking-wide">
                  Precio
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xl font-extrabold tabular-nums">
                    Bs. {unitPrice}
                  </span>
                  {quantity > 1 && (
                    <span className="text-xs font-bold bg-black/10 px-2 py-0.5 rounded-md tabular-nums">
                      Total ({quantity}): Bs. {totalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* 2. Botones de compra (Cantidad + Carrito + WhatsApp) */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Cantidad (Botella 1 Litro)
                    </span>
                    {product.includesActivator && (
                      <span className="text-xs font-medium text-emerald-700 block">
                        Incluye frasco activador oficial
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Disminuir cantidad"
                      className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-100 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-9 text-center font-mono text-base font-bold text-slate-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                      aria-label="Aumentar cantidad"
                      className="w-10 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-100 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product, 'publico', quantity);
                      onClose();
                    }}
                    className="w-full sm:flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#E60000] hover:bg-[#C70000] active:scale-[0.99] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Hacer pedido</span>
                  </button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.99] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Pedir por WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* 3. Descripción técnica y beneficios agronómicos */}
              <div className="space-y-2.5">
                <h3 className="font-display text-sm font-bold text-slate-900">
                  Descripción técnica y beneficios agronómicos
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.technicalDescription}
                </p>
                {product.composition && (
                  <p className="text-xs font-mono text-emerald-900 bg-emerald-50 border border-emerald-200/70 rounded-lg px-3 py-2">
                    Composición: {product.composition}
                  </p>
                )}
                <ul className="space-y-2 pt-1">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2
                        className="w-4 h-4 text-[#00A843] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Espectro de control oficial */}
              {product.targetGroups && product.targetGroups.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <h3 className="font-display text-sm font-bold text-slate-900">
                    Espectro de control oficial
                  </h3>
                  {product.targetGroups.map((group) => (
                    <div key={group.label} className="space-y-0.5">
                      <span className="text-xs font-bold text-[#00A843] block">
                        {group.label}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{group.items}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. Mecanismo de acción biotecnológica */}
              <div className="p-4 rounded-xl bg-[#E8F5E9]/70 border border-emerald-200/70 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-900">
                  <Atom className="w-4 h-4 text-[#00A843] shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-sm font-bold">
                    Mecanismo de acción biotecnológica
                  </h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{product.mechanism}</p>
              </div>

              {/* 6. Rendimiento y dosificación */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">
                    Rendimiento y dosificación
                  </span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums block mt-0.5">
                    {product.yieldNote} ({product.dosagePer200L} ml / tanque 200 L)
                  </span>
                  <span className="text-xs font-semibold text-[#00A843] tabular-nums block mt-0.5">
                    Para {quantity} {quantity === 1 ? 'botella' : 'botellas'}: rinde hasta{' '}
                    {totalWaterYield} L de agua
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onGoToPreparation(product.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#064E24] hover:bg-[#08632E] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
                  Ver guía de mezcla
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
