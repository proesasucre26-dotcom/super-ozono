import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import {
  PRODUCTS,
  WHATSAPP_DISPLAY,
  OFFICIAL_EMAIL,
  buildWhatsAppUrl,
} from '../data/catalog';

const CITIES = [
  'Santa Cruz',
  'Cochabamba',
  'Chuquisaca (Sucre)',
  'Tarija',
  'La Paz',
  'Potosí / Oruro / Beni / Pando',
];

export function ContactsTab() {
  // Quick Contact & Order Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Santa Cruz');
  const [crop, setCrop] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].name);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [formError, setFormError] = useState('');
  const [submittedQuoteUrl, setSubmittedQuoteUrl] = useState<string | null>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim() || !crop.trim()) {
      setFormError('Por favor completa tu nombre, teléfono y cultivo para enviar tu pedido.');
      return;
    }

    const message = `Hola Proesa Distribuidora, quiero hacer un pedido por WhatsApp:\n• Nombre: ${fullName.trim()}\n• Teléfono: ${phone.trim()}\n• Ciudad: ${city}\n• Cultivo: ${crop.trim()}\n• Producto: ${selectedProduct}\n• Cantidad: ${orderQuantity} ${orderQuantity === 1 ? 'unidad' : 'unidades'}`;
    setSubmittedQuoteUrl(buildWhatsAppUrl(message));
  };

  const directWhatsAppUrl = buildWhatsAppUrl(
    'Hola Proesa Distribuidora, necesito atención al cliente y hacer un pedido de Super Ozono.'
  );

  return (
    <div className="space-y-6">
      {/* Direct Official Channels + WhatsApp Primary CTA */}
      <section className="rounded-2xl bg-[#06371B] border border-emerald-400/25 text-white p-5 sm:p-6 space-y-4 shadow-md">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-emerald-300">
            Atención al Cliente y Pedidos
          </p>
          <h1 className="font-display text-xl sm:text-2xl font-bold">
            Proesa Distribuidora · Bolivia
          </h1>
          <p className="text-sm text-emerald-100/90">
            Pedidos directos por WhatsApp, asesoría técnica en campo y despachos inmediatos a todo el país.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3.5 rounded-xl bg-black/35 border border-emerald-400/20 flex items-center gap-3">
            <Phone className="w-5 h-5 text-emerald-300 shrink-0" aria-hidden="true" />
            <div>
              <span className="text-xs text-emerald-200 block">WhatsApp y Pedidos</span>
              <span className="font-mono font-bold text-white tabular-nums">
                {WHATSAPP_DISPLAY}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/35 border border-emerald-400/20 flex items-center gap-3">
            <Mail className="w-5 h-5 text-amber-300 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <span className="text-xs text-emerald-200 block">Correo Oficial</span>
              <span className="font-medium text-white truncate block">{OFFICIAL_EMAIL}</span>
            </div>
          </div>
        </div>

        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#00C853] hover:bg-[#10E066] active:scale-[0.99] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Hacer pedido directo por WhatsApp ({WHATSAPP_DISPLAY})</span>
        </a>
      </section>

      {/* Quick Order & Contact Form */}
      <section className="rounded-2xl bg-[#06371B] border border-emerald-400/25 text-white p-5 space-y-4 shadow-md">
        <div className="space-y-1">
          <h2 className="font-display text-lg font-bold text-white">
            Formulario de pedido rápido por WhatsApp
          </h2>
          <p className="text-xs text-emerald-100/90">
            Elige tu producto y envía tu pedido directo al WhatsApp oficial de Proesa Distribuidora.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label
                htmlFor="contact-name"
                className="text-xs font-semibold text-emerald-200 block mb-1"
              >
                Nombre y Apellido
              </label>
              <input
                id="contact-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-emerald-200/40 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="text-xs font-semibold text-emerald-200 block mb-1"
              >
                Teléfono / WhatsApp
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej. 72853351"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-emerald-200/40 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label
                htmlFor="contact-city"
                className="text-xs font-semibold text-emerald-200 block mb-1"
              >
                Ciudad / Departamento
              </label>
              <select
                id="contact-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-emerald-200/40 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-crop"
                className="text-xs font-semibold text-emerald-200 block mb-1"
              >
                Cultivo principal
              </label>
              <input
                id="contact-crop"
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="Ej. Aguacate, Tomate, Durazno"
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-emerald-200/40 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            <div className="sm:col-span-9">
              <label
                htmlFor="contact-product"
                className="text-xs font-semibold text-emerald-200 block mb-1"
              >
                Producto de interés
              </label>
              <select
                id="contact-product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-emerald-200/40 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Línea completa Super Ozono (5 productos)">
                  Línea completa Super Ozono (5 productos)
                </option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="contact-qty"
                className="text-xs font-semibold text-emerald-200 block mb-1"
              >
                Cantidad
              </label>
              <input
                id="contact-qty"
                type="number"
                min={1}
                max={99}
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-emerald-200/40 text-sm font-mono font-bold text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {formError && (
            <p className="text-xs font-semibold text-amber-300" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-extrabold text-sm transition-all cursor-pointer shadow-xs"
          >
            Preparar pedido para WhatsApp
          </button>
        </form>

        {submittedQuoteUrl && (
          <div className="p-4 rounded-xl bg-black/35 border border-emerald-400/30 space-y-3">
            <div className="flex items-start gap-2.5 text-white">
              <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-display text-sm font-bold">
                  ¡Pedido listo para enviar por WhatsApp!
                </p>
                <p className="text-xs text-emerald-100/90 mt-0.5">
                  Presiona el botón para abrir WhatsApp con tu pedido completo y coordinar el envío.
                </p>
              </div>
            </div>
            <a
              href={submittedQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#00C853] hover:bg-[#10E066] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Enviar pedido por WhatsApp</span>
            </a>
          </div>
        )}
      </section>

      {/* Shipping & Bolivia-Wide Coverage */}
      <section className="rounded-2xl bg-[#06371B] border border-emerald-400/25 text-white p-5 flex items-start gap-3.5 shadow-md">
        <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="font-display text-base font-bold text-white">
            Envíos y cobertura a los 9 departamentos de Bolivia
          </h2>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Despachos diarios garantizados desde nuestras sedes de <strong>Santa Cruz</strong>,{' '}
            <strong>Cochabamba</strong> y <strong>Chuquisaca</strong> mediante transporte terrestre
            y encomienda segura hacia Tarija, La Paz, Potosí, Oruro, Beni y Pando. Entregas directas
            en comunidades productivas y fincas coordinadas vía WhatsApp.
          </p>
        </div>
      </section>
    </div>
  );
}
