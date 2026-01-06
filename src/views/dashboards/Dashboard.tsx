import { FormEvent, useEffect, useState } from "react";
import {
  AccessDecision,
  AuthzRequestDto,
  SuricataAlert,
  getRecentDecisions,
  getRecentSuricata,
  testAuthz,
}  from "../ztna/backend";

import { Card, Table, TextInput, Button, Badge } from "flowbite-react";

const initialForm: AuthzRequestDto = {
  subjectId: "hassan",
  roles: ["user"],
  resource: "dashboard",
  action: "read",
  sourceIp: "192.168.1.10",
  zone: "USER",
};

const Dashboard = () => {
  const [form, setForm] = useState<AuthzRequestDto>(initialForm);
  const [pdpResult, setPdpResult] = useState<{
    decision: string;
    reason: string;
    createdAt: string;
  } | null>(null);
  const [pdpLoading, setPdpLoading] = useState(false);

  const [decisions, setDecisions] = useState<AccessDecision[]>([]);
  const [alerts, setAlerts] = useState<SuricataAlert[]>([]);
  const [total, setTotal] = useState(0);
  const [permitRate, setPermitRate] = useState(0);
  const [alertsCount, setAlertsCount] = useState(0);

  useEffect(() => {
    void refreshData();
  }, []);

  async function refreshData() {
    try {
      const [d, a] = await Promise.all([
        getRecentDecisions(50),
        getRecentSuricata(50),
      ]);
      setDecisions(d);
      setAlerts(a);

      const t = d.length;
      const p = d.filter((x) => x.decision === "PERMIT").length;
      setTotal(t);
      setPermitRate(t ? Math.round((p / t) * 100) : 0);
      setAlertsCount(a.length);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      setPdpLoading(true);
      const res = await testAuthz(form);
      setPdpResult(res);
      await refreshData();
    } catch (err) {
      console.error(err);
      setPdpResult({
        decision: "ERROR",
        reason: "Failed to contact PDP",
        createdAt: new Date().toISOString(),
      });
    } finally {
      setPdpLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Security Operation Center
        </h1>
        <p className="text-sm text-slate-500">
          Zero Trust Policy Decisions &amp; Suricata Alerts
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-slate-400">
                Total Access Requests
              </p>
              <p className="mt-2 text-2xl font-semibold">{total}</p>
              <p className="mt-1 text-xs text-slate-500">
                From all zones (USER, DMZ, APP, SOC)
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
              🔐
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-slate-400">
                Permit Rate
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {permitRate}% PERMIT
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Percentage of PERMIT vs DENY decisions
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-lg">
              ✅
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-slate-400">
                Suricata Alerts (24h)
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {alertsCount}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                All severities from IDS
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
              ⚠️
            </div>
          </div>
        </Card>
      </div>

      {/* PDP FORM + DECISION */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-2 text-sm font-semibold">
            Test <span className="text-emerald-600">/authz/permit</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-slate-500">Subject ID</label>
              <TextInput
                value={form.subjectId}
                onChange={(e) =>
                  setForm({ ...form, subjectId: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">
                Roles (comma separated)
              </label>
              <TextInput
                value={form.roles.join(",")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    roles: e.target.value
                      .split(",")
                      .map((r) => r.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-500">Resource</label>
                <TextInput
                  value={form.resource}
                  onChange={(e) =>
                    setForm({ ...form, resource: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Action</label>
                <TextInput
                  value={form.action}
                  onChange={(e) =>
                    setForm({ ...form, action: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-500">Source IP</label>
                <TextInput
                  value={form.sourceIp ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, sourceIp: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Zone</label>
                <TextInput
                  value={form.zone ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, zone: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              type="submit"
              color="success"
              isProcessing={pdpLoading}
              className="mt-2"
            >
              {pdpLoading ? "Checking…" : "Check access"}
            </Button>
          </form>
        </Card>

        <Card>
          <h2 className="mb-2 text-sm font-semibold">Decision</h2>
          {pdpResult ? (
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">Decision: </span>
                <Badge
                  color={
                    pdpResult.decision === "PERMIT" ? "success" : "failure"
                  }
                  className="ml-1"
                >
                  {pdpResult.decision}
                </Badge>
              </p>
              <p>
                <span className="font-semibold">Reason: </span>
                {pdpResult.reason}
              </p>
              <p className="text-xs text-slate-500">
                at {new Date(pdpResult.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Submit the form to see a decision.
            </p>
          )}
        </Card>
      </div>

      {/* TABLES */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Access Decisions */}
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Recent Access Decisions</h2>
            <Button size="xs" onClick={() => void refreshData()}>
              Refresh
            </Button>
          </div>
          <div className="max-h-64 overflow-auto text-xs">
            <Table>
              <Table.Head>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>Subject</Table.HeadCell>
                <Table.HeadCell>Res</Table.HeadCell>
                <Table.HeadCell>Act</Table.HeadCell>
                <Table.HeadCell>Dec</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {decisions.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={5}>
                      <span className="text-slate-400">
                        No decisions yet.
                      </span>
                    </Table.Cell>
                  </Table.Row>
                )}
                {decisions.map((d) => (
                  <Table.Row key={d.id}>
                    <Table.Cell>
                      {new Date(d.createdAt).toLocaleTimeString()}
                    </Table.Cell>
                    <Table.Cell>{d.subjectId}</Table.Cell>
                    <Table.Cell>{d.resource}</Table.Cell>
                    <Table.Cell>{d.action}</Table.Cell>
                    <Table.Cell>
                      <span
                        className={
                          d.decision === "PERMIT"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {d.decision}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>

        {/* Suricata Alerts */}
        <Card>
          <h2 className="mb-2 text-sm font-semibold">
            Recent Suricata Alerts
          </h2>
          <div className="max-h-64 overflow-auto text-xs">
            <Table>
              <Table.Head>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>Src → Dst</Table.HeadCell>
                <Table.HeadCell>Severity</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {alerts.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={3}>
                      <span className="text-slate-400">
                        No alerts yet.
                      </span>
                    </Table.Cell>
                  </Table.Row>
                )}
                {alerts.map((a) => {
                  let sevColor: "gray" | "failure" | "warning" | "pink" =
                    "gray";
                  if (a.severity === 1) sevColor = "failure";
                  else if (a.severity === 2) sevColor = "warning";
                  else if (a.severity === 3) sevColor = "pink";

                  return (
                    <Table.Row key={a.id}>
                      <Table.Cell>
                        {a.eventTime
                          ? new Date(a.eventTime).toLocaleTimeString()
                          : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        {a.srcIp} ➜ {a.destIp}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge color={sevColor}>{a.severity ?? "-"}</Badge>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
