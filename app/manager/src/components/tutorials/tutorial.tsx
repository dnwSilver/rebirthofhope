"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

export type Tutorial = "k9s" | "git" | "helmfile" | "editors" | "bat" | "httpie";

export type Chapter =
  | "namespace"
  | "ingress"
  | "pods"
  | "commit"
  | "deploy"
  | "linting"
  | "nano"
  | "vim"
  | "sops"
  | "read"
  | "GET"
  | "POST";

const Tutorial = ({ theme, chapter, children }: { theme: Tutorial; chapter: Chapter } & PropsWithChildren) => (
  <Link href={`/tutorials/${theme}#${chapter}`} target="_blank">
    {children}
  </Link>
);

export default Tutorial;
