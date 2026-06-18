import type { Evaluation } from "../../data/types";
import { apiFetch } from "../api";

export type BusinessAgentStep = {
  agentName: string;
  to: string;
  message: string;
};

const STEPS: BusinessAgentStep[] = [
  { agentName: "Risk Assessor", to: "Compliance Lead", message: "Profit score: 72 — within acceptable threshold" },
  { agentName: "Compliance Lead", to: "Senior Approver", message: "Compliance score: 88 — no policy violations" },
  { agentName: "Senior Approver", to: "Business Admin", message: "Evaluation complete — recommendation available" },
];

export async function evaluateDealStream(
  dealId: string,
  onStep: (step: BusinessAgentStep) => void = () => {},
): Promise<Evaluation> {
  for (const step of STEPS) {
    onStep(step);
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
  }
  const data = await apiFetch<{ evaluation: Evaluation }>(`/api/deals/${dealId}/evaluate`, {
    method: "POST",
  });
  return data.evaluation;
}
