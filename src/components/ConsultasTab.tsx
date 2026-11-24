import { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { buildWhatsAppUrl } from '../data/catalog';

interface ConsultasTabProps {
  focusAiAssistant?: boolean;
  onResetFocusAi?: () => void;
}

interface AiMessage {
  role: 'user' | 'model';
  text: string;
}

const QUICK_AI_PROMPTS = [
  '¿Cómo trato Antracnosis u Oídio con Biocida Super Ozono?',
  '¿Cómo aplicar el tratamiento curativo de choque (Día 1, 3 y 6)?',
  'Dosis de Super Suelos 2.0 contra nematodos en papa',
  '¿Cómo usar Super Star para aumentar floración y cuaje?',
];

export function ConsultasTab({ focusAiAssistant, onResetFocusAi }: ConsultasTabProps) {
  const aiSectionRef = useRef<HTMLElement | null>(null);

  const [aiInput, setAiInput] = useState('');
  const [aiCropContext, setAiCropContext] = useState('');
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([
    {
      role: 'model',
      text: 'Soy el Ingeniero Agrónomo Virtual de Proesa Distribuidora. Cuéntame qué cultivo manejas y qué problema o meta tienes en campo para recomendarte el protocolo exacto con Super Ozono.',
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (focusAiAssistant && aiSectionRef.current) {
      aiSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onResetFocusAi?.();
    }
  }, [focusAiAssistant, onResetFocusAi]);

  const handleAskAgronomist = async (questionText?: string) => {
    const query = (questionText ?? aiInput).trim();
    if (!query || aiLoading) return;

    setAiError('');
    const nextHistory: AiMessage[] = [...aiMessages, { role: 'user', text: query }];
    setAiMessages(nextHistory);
    if (!questionText) setAiInput('');
    setAiLoading(true);

    try {
      const response = await fetch('/api/agronomist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          crop: aiCropContext.trim() || undefined,
          history: aiMessages.slice(1), // skip initial greeting
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        setAiError(
          data.error ||
            'No pudimos obtener respuesta en este momento. Escríbenos directo por WhatsApp.'
        );
        return;
      }

      setAiMessages((prev) => [...prev, { role: 'model', text: data.reply! }]);
    } catch {
      setAiError(
        'Error de conexión con el servidor. Verifica tu señal en campo o contáctanos por WhatsApp.'
      );
    } finally {
      setAiLoading(false);
    }
  };

  const lastAiReply = [...aiMessages].reverse().find((m) => m.role === 'model')?.text;

  return (
    <div className="space-y-6">
      {/* Gemini AI Agronomist Assistant - Consulta Técnica Banner */}
      <section
        ref={aiSectionRef}
        className="rounded-2xl bg-[#06371B] border border-emerald-400/25 text-white p-5 space-y-4 shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold">Asistente de IA y Asesoría Agrícola</span>
            </div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-white">
              Consulta técnica instantánea en campo
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90">
              Pregunta sobre plagas, enfermedades radiculares, dosis exactas o compatibilidad para tu cultivo.
            </p>
          </div>
        </div>

        {/* Optional Crop Input */}
        <div>
          <label htmlFor="ai-crop" className="text-xs font-semibold text-emerald-200 block mb-1">
            Tu cultivo actual (opcional)
          </label>
          <input
            id="ai-crop"
            type="text"
            value={aiCropContext}
            onChange={(e) => setAiCropContext(e.target.value)}
            placeholder="Ej. Aguacate Hass, Tomate, Durazno, Soya..."
            className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-white border border-emerald-200/40 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Quick-Tap Field Prompts */}
        <div className="flex flex-wrap gap-2">
          {QUICK_AI_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              disabled={aiLoading}
              onClick={() => handleAskAgronomist(prompt)}
              className="px-3 py-2 rounded-xl bg-black/35 hover:bg-black/55 border border-emerald-400/25 text-emerald-100 text-xs font-semibold transition-colors text-left cursor-pointer disabled:opacity-60 min-h-[38px]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Conversation Feed */}
        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {aiMessages.map((msg, idx) => (
            <div
              key={`${msg.role}-${idx}`}
              className={`p-3.5 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-amber-400 text-slate-950 font-medium ml-6'
                  : 'bg-black/40 border border-emerald-400/20 text-emerald-50 mr-2'
              }`}
            >
              {msg.text}
            </div>
          ))}

          {aiLoading && (
            <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-400/20 text-emerald-100 text-sm flex items-center gap-2 mr-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-300" aria-hidden="true" />
              <span>Analizando protocolo Super Ozono...</span>
            </div>
          )}
        </div>

        {aiError && (
          <div className="p-3 rounded-xl bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" aria-hidden="true" />
            <span>{aiError}</span>
          </div>
        )}

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskAgronomist();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Escribe tu consulta agronómica..."
            aria-label="Escribe tu consulta agronómica"
            className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-emerald-200/40 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            disabled={aiLoading || !aiInput.trim()}
            aria-label="Enviar consulta al asistente"
            className="min-h-[44px] min-w-[44px] px-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Consultar</span>
          </button>
        </form>

        {aiMessages.length > 1 && lastAiReply && (
          <div className="pt-2 border-t border-emerald-400/20 flex items-center justify-between gap-3">
            <span className="text-xs text-emerald-200">
              ¿Deseas pedir los productos recomendados?
            </span>
            <a
              href={buildWhatsAppUrl(
                `Hola Proesa Distribuidora, consulté con su asistente agrícola sobre "${aiCropContext || 'mi cultivo'}" y deseo hacer un pedido de los productos Super Ozono recomendados.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-300 hover:underline whitespace-nowrap"
            >
              Hacer pedido por WhatsApp →
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
