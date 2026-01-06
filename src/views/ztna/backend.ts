// src/ztna/backend.ts
import axios from "axios";

// ✅ Env-based backend URL (local + production safe)
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

export const api = axios.create({
  baseURL: BASE_URL,
});

export type Decision = "PERMIT" | "DENY";

export interface AccessDecision {
  id: number;
  subjectId: string;
  roles: string;
  resource: string;
  action: string;
  decision: Decision;
  reason: string;
  sourceIp?: string | null;
  zone?: string | null;
  createdAt: string;
  policyId?: number | null;
}

export interface SuricataAlert {
  id: number;
  eventTime: string | null;
  srcIp: string;
  destIp: string;
  srcPort: number | null;
  destPort: number | null;
  proto: string | null;
  signature: string;
  signatureId: number | null;
  severity: number | null;
  engine: string | null;
  zone: string | null;
  raw: string;
  timestamp?: string;
  createdAt: string;
}

export interface AuthzRequestDto {
  subjectId: string;
  roles: string[];
  resource: string;
  action: string;
  sourceIp?: string;
  zone?: string;
}

export async function testAuthz(
  body: AuthzRequestDto
): Promise<{ decision: string; reason: string; createdAt: string }> {
  const res = await api.post("/authz/permit", body);
  return res.data;
}

export async function getRecentDecisions(
  limit = 50
): Promise<AccessDecision[]> {
  const res = await api.get<AccessDecision[]>("/decisions/recent", {
    params: { limit },
  });
  return res.data;
}

export async function getRecentSuricata(
  limit = 50
): Promise<SuricataAlert[]> {
  const res = await api.get<SuricataAlert[]>("/logs/suricata/recent", {
    params: { limit },
  });
  return res.data;
}
