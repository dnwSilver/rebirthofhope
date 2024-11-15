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
  progress: IStep[];
}

type StepName =
  | "deep-dive"
  | "research"
  | "secret-materials"
  | "need-more-gold"
  | "reunion"
  | "maundy-thursday"
  | "restoration";

type StepIcon = "🤿" | "🥸" | "🗝️" | "💰" | "🧹" | "🔗" | "🖼️";

const steps: Record<StepName, StepIcon> = {
  "deep-dive": "🤿",
  research: "🥸",
  "secret-materials": "🗝️",
  "need-more-gold": "💰",
  reunion: "🧹",
  "maundy-thursday": "🔗",
  restoration: "🖼️",
};

export const EXAMPLE_TIME_AVAILABLE = 2 * 60 * 60 * 1_000;

export const stepNames = Object.keys(steps) as Array<StepName>;

export const stepIcons = Object.values(steps) as Array<StepIcon>;
