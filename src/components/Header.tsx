import { ShieldCheck, ShoppingCart } from 'lucide-react';
import { PROESA_LOGO_PATH } from '../data/catalog';

export type TabId = 'inicio' | 'preparacion' | 'consultas' | 'contactos';

interface HeaderProps {
  onSelectHome: () => void;
  onOpenAiAssistant: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export function Header({
  onSelectHome,
  onOpenAiAssistant,
  onOpenCart,
  cartCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-3">
        {/* Proesa logo (distribuidora2.png) next to red Proesa Distribuidora + black Distribuidor oficial below */}
        <button
          type="button"
          onClick={onSelectHome}
          className="flex items-center gap-2 text-left min-w-0 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E60000] rounded-lg cursor-pointer"
          aria-label="Ir al inicio de Proesa Distribuidora"
        >
          <img
            src={PROESA_LOGO_PATH}
            alt="Logotipo Proesa"
            referrerPolicy="no-referrer"
            className="h-8 w-8 object-contain shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-display text-[14px] sm:text-base font-extrabold text-[#E60000] leading-tight whitespace-nowrap">
              Proesa Distribuidora
            </span>
            <span className="inline-flex items-center gap-1 text-[12px] font-bold text-black leading-tight whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0" aria-hidden="true" />
              Distribuidor oficial
            </span>
          </div>
        </button>

        {/* Primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="hidden sm:inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-white bg-[#064E24] hover:bg-[#08632E] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer"
          >
            Asistente IA
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir carrito de pedidos (${cartCount} productos)`}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-extrabold text-white bg-[#E60000] hover:bg-[#C70000] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[40px] shadow-xs cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Pedidos</span>
            {cartCount > 0 && (
              <span className="ml-0.5 min-w-[20px] h-5 px-1.5 rounded-full bg-white text-[#E60000] font-mono text-[12px] font-extrabold inline-flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
