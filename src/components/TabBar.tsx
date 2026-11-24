import { Store, FlaskConical, MessageSquareText, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import type { TabId } from './Header';

interface TabBarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: typeof Store }[] = [
  { id: 'inicio', label: 'Inicio', icon: Store },
  { id: 'preparacion', label: 'Preparación', icon: FlaskConical },
  { id: 'consultas', label: 'Consultas', icon: MessageSquareText },
  { id: 'contactos', label: 'Contactos', icon: PhoneCall },
];

export function TabBar({ activeTab, onSelectTab }: TabBarProps) {
  return (
    <nav
      aria-label="Barra de pestañas principal"
      className="sticky top-14 z-20 bg-black border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-4 h-12 sm:h-13">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 min-h-[44px] px-1 sm:px-3 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#00C853] ${
                isActive ? 'text-[#00C853]' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Icon
                className="w-4 h-4 shrink-0"
                strokeWidth={isActive ? 2.4 : 1.9}
                aria-hidden="true"
              />
              <span
                className={`text-xs sm:text-sm leading-none whitespace-nowrap ${
                  isActive ? 'font-bold text-[#00C853]' : 'font-medium text-slate-300'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="top-black-tab-indicator"
                  transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                  className="absolute bottom-0 left-2 right-2 sm:left-4 sm:right-4 h-0.5 bg-[#00C853] rounded-t-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
