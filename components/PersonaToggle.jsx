'use client';

const PERSONAS = {
  hitesh: {
    label: 'Hitesh Choudhary',
    tagline: 'Pragmatic builder · Hinglish mentor',
    accent: 'bg-amber-500 hover:bg-amber-400',
    accentRing: 'focus-within:ring-amber-500/40',
    accentLight: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    bubble: 'bg-zinc-900 border border-amber-500/25 text-zinc-100',
    avatar: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    glow: 'shadow-amber-500/10',
  },
  piyush: {
    label: 'Piyush Garg',
    tagline: 'Production-grade engineer · System design',
    accent: 'bg-sky-500 hover:bg-sky-400',
    accentRing: 'focus-within:ring-sky-500/40',
    accentLight: 'bg-sky-500/10 border-sky-500/30 text-sky-300',
    bubble: 'bg-zinc-900 border border-sky-500/25 text-zinc-100',
    avatar: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    glow: 'shadow-sky-500/10',
  },
};

export default function PersonaToggle({ persona, onChange, disabled }) {
  return (
    <div className="flex gap-2 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl">
      {Object.entries(PERSONAS).map(([key, config]) => {
        const active = persona === key;
        return (
          <button
            key={key}
            type="button"
            disabled={disabled}
            onClick={() => onChange(key)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all disabled:opacity-50 ${
              active
                ? `${config.accent} text-white shadow-lg ${config.glow}`
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
            }`}
          >
            {config.label.split(' ')[0]}
          </button>
        );
      })}
    </div>
  );
}

export { PERSONAS };
