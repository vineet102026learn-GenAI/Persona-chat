'use client';

const PERSONAS = {
  hitesh: {
    label: 'Hitesh Choudhary',
    tagline: 'Pragmatic builder · Hinglish mentor',
    accent: 'bg-amber-500',
    accentLight: 'bg-amber-50 border-amber-200 text-amber-900',
    bubble: 'bg-amber-100 text-amber-950',
  },
  piyush: {
    label: 'Piyush Garg',
    tagline: 'Production-grade engineer · System design',
    accent: 'bg-sky-500',
    accentLight: 'bg-sky-50 border-sky-200 text-sky-900',
    bubble: 'bg-sky-100 text-sky-950',
  },
};

export default function PersonaToggle({ persona, onChange, disabled }) {
  return (
    <div className="flex gap-2 p-1 bg-zinc-100 rounded-xl">
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
                ? `${config.accent} text-white shadow-sm`
                : 'text-zinc-600 hover:bg-white hover:text-zinc-900'
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
