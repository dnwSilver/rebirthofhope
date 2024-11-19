export interface ICall {
  call: string;
}

export interface IStep {
  step: string;
  giveUp: Date | null;
  finish: Date | null;
}

export interface ISavior {
  name: string;
  call: string;
  country: string;
  joining: Date;
  linting: boolean;
  metrics: boolean;
  resources: boolean;
  logs: boolean;
  secrets: boolean;
  replicas: boolean;
  envs: boolean;
  cors: boolean;
  ingress: boolean;
  volume: boolean;
  features: boolean;
  progress: IStep[];
}

export type StepName =
  | "deep-dive"
  | "research"
  | "need-more-gold" // Выдаем память
  | "sort-wheat-from-chaff" // Чистим логи
  | "secret-materials" // Правим секреты
  | "attack-of-the-clones" // Увеличиваем реплики
  | "reunion" // Правим переменную окружения
  | "scenario-armor" // Настраиваем CORS
  | "maundy-thursday" // Избавляемся от CORS
  | "restoration" // Восстанавливаем volume
  | "watchdog"; // Восстанавливаем volume

type StepIcon = "🤿" | "🔬" | "🗝️" | "💰" | "🧹" | "🔗" | "🖼️" | "👯‍♀️" | "🌾" | "🛡️" | "🐶";

export const previousSteps: Record<StepName, StepName | null> = {
  "deep-dive": null,
  research: "deep-dive",
  "need-more-gold": "research",
  "sort-wheat-from-chaff": "need-more-gold",
  "secret-materials": "sort-wheat-from-chaff",
  "attack-of-the-clones": "secret-materials",
  reunion: "attack-of-the-clones",
  "scenario-armor": "reunion",
  "maundy-thursday": "scenario-armor",
  restoration: "maundy-thursday",
  watchdog: null,
};

export const steps: Record<StepName, StepIcon> = {
  "deep-dive": "🤿",
  research: "🔬",
  "need-more-gold": "💰",
  "sort-wheat-from-chaff": "🌾",
  "secret-materials": "🗝️",
  "attack-of-the-clones": "👯‍♀️",
  reunion: "🔗",
  "scenario-armor": "🛡️",
  "maundy-thursday": "🧹",
  restoration: "🖼️",
  watchdog: "🐶",
};

export const stepsRU: Record<StepName, string> = {
  "deep-dive": "Двадцать тысяч лье под водой",
  research: "В поисках истины",
  "need-more-gold": "Нужно больше золота",
  "sort-wheat-from-chaff": "Отделение зёрен от плевел",
  "secret-materials": "Секретные материалы",
  "attack-of-the-clones": "Атака клонов",
  reunion: "Вместе навсегда",
  "scenario-armor": "Сценарная броня",
  "maundy-thursday": "Чистый четверг",
  restoration: "Реставрация",
  watchdog: "Руководитель посадки"
};

export const stepValidators: Record<StepName, string> = {
  "deep-dive": "linting",
  research: "metrics",
  "need-more-gold": "resources",
  "sort-wheat-from-chaff": "logs",
  "secret-materials": "secrets",
  "attack-of-the-clones": "replicas",
  reunion: "envs",
  "scenario-armor": "cors",
  "maundy-thursday": "ingress",
  restoration: "volume",
  watchdog: "features"
};

export const EXAMPLE_TIME_AVAILABLE = 3 * 60 * 60 * 1_000;

export const SHORT_POLLING_INTERVAL = 60 * 60 * 1_000;

export const stepNames = Object.keys(steps) as Array<StepName>;

export const stepIcons = Object.values(steps) as Array<StepIcon>;
