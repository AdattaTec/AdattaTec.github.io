import type { LucideIcon } from "lucide-react";
import {
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Coins,
  FileSignature,
  FlaskConical,
  MapPin,
  Stethoscope,
  Truck,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

/**
 * Faixa "Nuestras 12 soluciones integradas" acima do carrossel de Productos:
 * mostra de uma vez a suíte inteira; cada item abre o "Saber Más" do produto.
 */

type Lang = "es" | "en";

export interface SuiteItem {
  key: string;
  name: string;
}

const icons: Record<string, LucideIcon> = {
  payroll: Wallet,
  sisgep: Users,
  acm: Truck,
  tools: Wrench,
  daily: ClipboardList,
  tracking: MapPin,
  contract: FileSignature,
  cost: Coins,
  budget: Calculator,
  insp: ClipboardCheck,
  lab: FlaskConical,
  doctor: Stethoscope,
};

const labels = {
  es: {
    title: "Nuestro ecosistema para la construcción",
    subtitle: "Del campo al control: datos que respaldan gestión, decisiones y resultados.",
  },
  en: {
    title: "Our ecosystem for construction",
    subtitle: "From the field to control: data that supports management, decisions and results.",
  },
};

export function SuiteStrip({
  items,
  language,
  onSelect,
}: {
  items: SuiteItem[];
  language: Lang;
  onSelect: (key: string) => void;
}) {
  const l = labels[language];

  return (
    <div className="mb-8">
      {/* Mesma fonte e tamanho do "Tecnología conectada…" da abertura */}
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">{l.title}</h3>
      <p className="text-muted-foreground mb-4">{l.subtitle}</p>
      {/* Sem molduras; só um traço vertical entre os ícones quando cabem numa linha (lg). No celular, sem traços. */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-y-2 lg:divide-x lg:divide-border">
        {items.map((item) => {
          const Icon = icons[item.key];
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              className="flex flex-col items-center justify-center gap-1.5 rounded-md px-2 py-2.5 text-center transition-colors hover:bg-secondary"
            >
              {Icon && <Icon size={24} strokeWidth={1.75} className="text-primary" />}
              <span className="text-xs md:text-sm font-semibold text-foreground leading-tight">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
