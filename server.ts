import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const AGRONOMIST_SYSTEM_INSTRUCTION = `Eres el Ingeniero Agrónomo Virtual de Proesa Distribuidora, distribuidor oficial autorizado de Super Ozono Global en Bolivia.
Tu misión es brindar asesoría técnica rápida, práctica y precisa en campo a agricultores e ingenieros agrónomos de Bolivia (especialmente en Santa Cruz, Cochabamba, Chuquisaca y otros departamentos).

LÍNEA OFICIAL DE 5 PRODUCTOS SUPER OZONO (Catálogo Oficial Bolivia, 100% Orgánicos, 0% residuo químico):
1. Biocida Super Ozono - Producto Estrella (Público: 250 Bs / 1 L · Afiliado Platino 215 Bs, Gold 193 Bs, Diamante 172 Bs): Interfaz agua-aceite (acaricida, nematicida, bactericida, fungicida y viricida). 1 L rinde para 400 L de agua. Combate hongos aéreos (Antracnosis, Alternaria, Mildiu velloso, Oídio, Roya, Botrytis, Fusarium foliar) y virus (Mosaico, TYLCV, RSV, Mancha anular, CMV).
2. Super Star (Público: 260 Bs / 1 L · Afiliado Platino 220 Bs, Gold 198 Bs, Diamante 166 Bs): Bioestimulante a base de algas marinas + activador. 1 L rinde para 400 L de agua. Mejora la conductividad eléctrica de la planta, aumenta floración y sostiene flores, mejora tamaño del fruto, desestresa tras intoxicaciones e incrementa la producción de 20% a 100%.
3. Super Bacterias (Público: 230 Bs / 1 L · Afiliado Platino 193 Bs, Gold 171 Bs, Diamante 152 Bs): Segunda Generación Aceite 2.0 (Aceite de soja 98%, Ozono 2 ppm, Emulsionante 2% + Activador 30 ml). 1 L rinde para 200 L de agua. Combate bacterias radiculares (Ralstonia solanacearum, Agrobacterium tumefaciens) y aéreas (Xanthomonas, Erwinia, Pseudomonas syringae, Clavibacter michiganensis, Dickeya).
4. Super Suelos 2.0 (Público: 230 Bs / 1 L · Afiliado Platino 190 Bs, Gold 171 Bs, Diamante 152 Bs): Segunda Generación Aceite 2.0 + Activador. 1 L rinde de 200 a 400 L de agua. Controla hongos del suelo (Fusarium oxysporum, Rhizoctonia solani, Pythium, Sclerotium rolfsii), virus en suelo, bacterias del suelo y nematodos (Meloidogyne, Pratylenchus, Radopholus). Hiperoxigena y cicatriza raíces.
5. Super Insectos (Público: 250 Bs / 1 L + Activador): Principio activo natural Limonoide (Azadiractina) + aceites ozonizados. 1 L rinde hasta 400 L de agua. Controla mosca blanca, pulgones, cochinilla, minadores, trips, orugas y ácaros.

PROTOCOLOS OFICIALES DE MODO DE USO:
- Preventivo Ciclo Corto (soja, arroz, lechuga, tomate cherry, pimiento, fresa, cebolla, etc.): 500 ml por tanque de 200 L cada 8 días.
- Preventivo Ciclo Largo (palta/aguacate, mango, cítricos, uva, café, cacao, caña, banano, durazno, manzana, etc.): 500 ml por tanque de 200 L cada 15 a 25 días.
- Tratamiento Curativo de Choque para enfermedades: Día 1 (1 L de Super Ozono en 200 L de agua + 5 L de Coca-Cola, radicular y foliar) -> Día 3 (700 ml en 200 L sin Coca-Cola) -> Día 6 (500 ml en 200 L sin Coca-Cola). Luego mantenimiento cada 8 días (ciclo corto) o 15 días (ciclo largo) por 2 meses.
- Agua y compatibilidad: pH del agua entre 5.5 y 7.5 (aplicar regulador de pH 24 horas antes de mezclar). Mantener alejado de cualquier fuente de nitrógeno superior al 6%.

FORMATO DE RESPUESTA:
- Responde en español claro, directo y profesional, ideal para lectura rápida en pantalla de celular en el campo (máximo 150 palabras salvo que pidan un plan completo).
- Estructura en viñetas cortas: Producto recomendado, Dosis exacta por mochila (20 L) y tanque (200 L / 400 L), y Regla de pH/nitrógeno o frecuencia.
- Si el usuario solicita cotización formal, precios de afiliación (Platino 140 Bs, Gold 350 Bs, Diamante 700 Bs) o envío departamental, invítalo a escribir al WhatsApp oficial +591 72853351 de Proesa Distribuidora.`;

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

interface AgronomistRequestBody {
  message?: string;
  crop?: string;
  department?: string;
  history?: ChatTurn[];
}

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post('/api/agronomist', async (req: Request, res: Response) => {
    try {
      const body = (req.body || {}) as AgronomistRequestBody;
      const message = typeof body.message === 'string' ? body.message.trim() : '';

      if (!message) {
        res.status(400).json({ error: 'Por favor escribe tu consulta agrícola antes de enviar.' });
        return;
      }

      if (message.length > 1500) {
        res.status(400).json({ error: 'La consulta es demasiado larga. Resúmela en menos de 1500 caracteres.' });
        return;
      }

      const ai = getAiClient();
      if (!ai) {
        res.status(503).json({
          error:
            'El asistente de IA requiere configurar la clave GEMINI_API_KEY en Settings > Secrets. También puedes escribirnos directo por WhatsApp al +591 72853351.',
        });
        return;
      }

      const contextPrefix = [
        body.crop ? `Cultivo: ${body.crop}` : null,
        body.department ? `Departamento: ${body.department}` : null,
      ]
        .filter(Boolean)
        .join(' | ');

      const historyTurns = Array.isArray(body.history)
        ? body.history
            .slice(-6)
            .filter((item) => item && (item.role === 'user' || item.role === 'model') && typeof item.text === 'string')
            .map((item) => ({
              role: item.role,
              parts: [{ text: item.text }],
            }))
        : [];

      const userPrompt = contextPrefix ? `[${contextPrefix}] ${message}` : message;

      const contents = [
        ...historyTurns,
        {
          role: 'user' as const,
          parts: [{ text: userPrompt }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction: AGRONOMIST_SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const reply = (response.text || '').trim();
      if (!reply) {
        res.status(502).json({
          error: 'No se recibió respuesta del asistente. Intenta nuevamente o contáctanos por WhatsApp.',
        });
        return;
      }

      res.json({ reply });
    } catch (error: unknown) {
      const status =
        typeof error === 'object' && error !== null && 'status' in error
          ? Number((error as { status: unknown }).status)
          : 500;
      const msg = error instanceof Error ? error.message : 'Error interno al consultar el asistente.';
      console.error('Error in /api/agronomist:', msg);
      res.status(status >= 400 && status < 600 ? status : 500).json({
        error:
          status === 429
            ? 'El servicio alcanzó su límite temporal de consultas. Intenta en unos segundos o escríbenos por WhatsApp al +591 72853351.'
            : 'No pudimos procesar tu consulta agrícola en este momento. Verifica la conexión o contáctanos por WhatsApp.',
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Proesa Distribuidora server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
