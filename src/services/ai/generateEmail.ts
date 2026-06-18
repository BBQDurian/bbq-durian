import type { Email, ExtractedInfo } from "../../data/types";
import { apiFetch } from "../api";

export type AgentStep = {
  agentName: string;
  to: string;
  message: string;
};

export type GenerateEmailResult = {
  email: Email;
  validationIssues: string[];
  validationMode: "live_ai" | "rules_only";
  validationFailure?: string;
  roomId?: string;
};

const STEPS: AgentStep[] = [
  { agentName: "Deal Extractor", to: "Pricing Analyst", message: "Analyzing conversation for key business terms …" },
  { agentName: "Deal Extractor", to: "Pricing Analyst", message: "Extracted company: TechVanguard Technology Co., Ltd." },
  { agentName: "Pricing Analyst", to: "Compliance Agent", message: "TVG-M5 × 50 units @ ¥4,200 = ¥210,000 — master agreement pricing applies" },
  { agentName: "Pricing Analyst", to: "Compliance Agent", message: "No discount override found" },
  { agentName: "Compliance Agent", to: "Proposal Writer", message: "All policy rules passed, compliance score nominal" },
  { agentName: "Proposal Writer", to: "Quality Assurance", message: "Drafting commercial proposal email …" },
  { agentName: "Proposal Writer", to: "Quality Assurance", message: "Deal summary formatted for business review" },
  { agentName: "Quality Assurance", to: "Proposal Assistant", message: "Proposal validated — ready for submission" },
];

export async function generateEmail(
  info: ExtractedInfo,
  rawConversation = "",
  onStep: (step: AgentStep) => void = () => {},
): Promise<GenerateEmailResult> {
  for (const step of STEPS) {
    onStep(step);
    await new Promise((r) => setTimeout(r, 350 + Math.random() * 250));
  }
  return apiFetch<GenerateEmailResult>("/api/agents/generate-email", {
    method: "POST",
    body: JSON.stringify({ info, rawConversation }),
  });
}
