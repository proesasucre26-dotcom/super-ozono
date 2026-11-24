import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  PackagePlus,
} from 'lucide-react';
import {
  PRODUCTS,
  buildWhatsAppUrl,
  getProductUnitPrice,
} from '../data/catalog';
import type { CartItem, PriceTier, Product, ProductId } from '../data/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onAddProduct: (product: Product, tier?: PriceTier, quantity?: number) => void;
  onUpdateQuantity: (productId: ProductId, quantity: number) => void;
  onRemoveItem: (productId: ProductId) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onAddProduct,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [city, setCity] = useState('Santa Cruz');
  const [crop, setCrop] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const totalBottles = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + getProductUnitPrice(item.product, item.tier) * item.quantity,
    0
  );
  const totalYieldLiters = items.reduce(
    (sum, item) => sum + item.product.yieldLiters * item.quantity,
    0
  );

  const productsNotInCart = PRODUCTS.filter(
    (p) => !items.some((item) => item.product.id === p.id)
  );

  const orderLines = items
    .map((item) => {
      const unitPrice = getProductUnitPrice(item.product, item.tier);
      const subtotal = unitPrice * item.quantity;
      return `• ${item.quantity}x ${item.product.name} (1 L) — Bs. ${unitPrice} c/u = Bs. ${subtotal}`;
    })
    .join('\n');

  const whatsappMessage = [
    'Hola Proesa Distribuidora, deseo confirmar el siguiente pedido de productos Super Ozono:',
    '',
    orderLines,
    '',
    `Total botellas: ${totalBottles}`,
    `Rendimiento total estimado: hasta ${totalYieldLiters} L de agua`,
    `Total estimado: Bs. ${totalAmount}`,
    customerName.trim() ? `Cliente: ${customerName.trim()}` : null,
    `Ciudad/Departamento: ${city}`,
    crop.trim() ? `Cultivo: ${crop.trim()}` : null,
    '',
    'Por favor confírmenme disponibilidad, pago y envío.',
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#06371B] text-white border-l border-emerald-400/25 shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="px-4 sm:px-5 py-3.5 bg-white text-slate-900 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-9 h-9 rounded-xl bg-[#E60000] text-white flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2
                    id="cart-drawer-title"
                    className="font-display text-base font-extrabold text-[#E60000] truncate"
                  >
                    Pedidos de Productos
                  </h2>
                  <p className="text-xs font-semibold text-black tabular-nums">
                    {totalBottles === 0
                      ? 'Sin productos agregados'
                      : `${totalBottles} ${totalBottles === 1 ? 'botella' : 'botellas'} · Bs. ${totalAmount}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar carrito de pedidos"
                className="min-h-[42px] min-w-[42px] rounded-xl flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              {items.length === 0 ? (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-black/35 border border-emerald-400/20 p-5 text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#E60000]/15 border border-[#E60000]/40 text-[#FF4D4D] mx-auto flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-base font-bold text-white">
                      Tu carrito de pedidos está vacío
                    </h3>
                    <p className="text-xs text-emerald-100/90 leading-relaxed">
                      Agrega uno o varios productos Super Ozono (botella de 1 litro) para calcular
                      tu pedido y enviarlo directo a Proesa Distribuidora por WhatsApp.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-amber-300 block">
                      Agregar productos rápido al pedido:
                    </span>
                    {PRODUCTS.map((product) => (
                      <div
                        key={product.id}
                        className="p-3 rounded-xl bg-black/35 border border-emerald-400/20 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.image}
                            alt={product.imageAlt}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-contain bg-white shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-display text-sm font-bold text-white truncate">
                              {product.name}
                            </p>
                            <p className="text-xs font-mono text-amber-300 tabular-nums">
                              Bs. {product.pricePublic} · {product.yieldNote}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAddProduct(product, 'publico', 1)}
                          className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#E60000] hover:bg-[#C70000] text-white text-xs font-extrabold inline-flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Agregar</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Ordered Items */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-200">
                        Productos seleccionados
                      </span>
                      <button
                        type="button"
                        onClick={onClearCart}
                        className="text-xs font-semibold text-red-300 hover:text-red-200 underline underline-offset-2 cursor-pointer"
                      >
                        Vaciar carrito
                      </button>
                    </div>

                    {items.map((item) => {
                      const unitPrice = getProductUnitPrice(item.product, item.tier);
                      const subtotal = unitPrice * item.quantity;
                      const itemYield = item.product.yieldLiters * item.quantity;

                      return (
                        <div
                          key={item.product.id}
                          className="p-3.5 rounded-2xl bg-black/40 border border-emerald-400/25 space-y-3"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={item.product.image}
                              alt={item.product.imageAlt}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 rounded-xl object-contain bg-white shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-display text-sm font-bold text-white leading-snug">
                                  {item.product.name}
                                </h3>
                                <button
                                  type="button"
                                  onClick={() => onRemoveItem(item.product.id)}
                                  aria-label={`Quitar ${item.product.name}`}
                                  className="p-1.5 rounded-lg text-emerald-200/70 hover:text-red-300 hover:bg-white/5 cursor-pointer shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-emerald-200 font-mono tabular-nums mt-0.5">
                                Bs. {unitPrice} c/u · rinde hasta {itemYield} L
                              </p>
                            </div>
                          </div>

                          {/* Quantity Stepper & Subtotal */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  item.quantity <= 1
                                    ? onRemoveItem(item.product.id)
                                    : onUpdateQuantity(item.product.id, item.quantity - 1)
                                }
                                aria-label="Disminuir cantidad"
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center font-mono text-sm font-bold text-white tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, Math.min(99, item.quantity + 1))
                                }
                                aria-label="Aumentar cantidad"
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="font-mono text-base font-extrabold text-amber-300 tabular-nums">
                              Bs. {subtotal}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick-Add Remaining Products */}
                  {productsNotInCart.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200">
                        <PackagePlus className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                        Agregar otro producto al pedido:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {productsNotInCart.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => onAddProduct(p, 'publico', 1)}
                            className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-emerald-400/25 hover:border-amber-300 text-xs font-semibold text-white inline-flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3 h-3 text-amber-300" aria-hidden="true" />
                            <span>{p.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optional Delivery Info */}
                  <div className="p-3.5 rounded-2xl bg-black/35 border border-emerald-400/20 space-y-2.5">
                    <span className="text-xs font-bold text-emerald-200 block">
                      Datos de envío (opcional)
                    </span>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nombre y Apellido"
                      className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-white/15 bg-black/40 text-xs text-white placeholder:text-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        aria-label="Departamento de envío"
                        className="w-full min-h-[40px] px-2.5 py-2 rounded-xl border border-white/15 bg-black/60 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="Cochabamba">Cochabamba</option>
                        <option value="Chuquisaca">Chuquisaca</option>
                        <option value="La Paz">La Paz</option>
                        <option value="Tarija">Tarija</option>
                        <option value="Potosí">Potosí</option>
                        <option value="Oruro">Oruro</option>
                        <option value="Beni">Beni</option>
                        <option value="Pando">Pando</option>
                      </select>
                      <input
                        type="text"
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        placeholder="Cultivo (ej. Papa)"
                        className="w-full min-h-[40px] px-3 py-2 rounded-xl border border-white/15 bg-black/40 text-xs text-white placeholder:text-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Checkout Bar */}
            {items.length > 0 && (
              <div className="p-4 bg-black/60 border-t border-emerald-400/25 space-y-3 shrink-0 pb-safe">
                <div className="flex items-baseline justify-between text-sm">
                  <div>
                    <span className="text-xs text-emerald-200 block">
                      Rendimiento total: hasta {totalYieldLiters} L de agua
                    </span>
                    <span className="text-xs font-bold text-white">
                      Total del pedido ({totalBottles}{' '}
                      {totalBottles === 1 ? 'botella' : 'botellas'})
                    </span>
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-amber-300 tabular-nums">
                    Bs. {totalAmount}
                  </span>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#00C853] hover:bg-[#10E066] active:scale-[0.99] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Enviar pedido por WhatsApp · Bs. {totalAmount}</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
