import { useEffect, useState } from "react";
import { Card, Table, Button, Badge, Spinner } from "flowbite-react";
import { SuricataAlert, getRecentSuricata } from "./backend";

const SuricataAlerts = () => {
  const [alerts, setAlerts] = useState<SuricataAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      setLoading(true);
      const data = await getRecentSuricata(200);
      setAlerts(data);
    } catch (e) {
      console.error(e);
      setErr("Failed to load Suricata alerts from backend.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function sevBadgeColor(sev: number | null) {
    if (sev === 1) return "failure";
    if (sev === 2) return "warning";
    if (sev === 3) return "pink";
    return "gray";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Suricata Alerts</h1>
          <p className="text-sm text-gray-500">
            IDS alerts ingested from backend endpoint <span className="font-mono">/logs/suricata/recent</span>.
          </p>
        </div>
        <Button onClick={() => void load()} size="sm">
          Refresh
        </Button>
      </div>

      <Card>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Spinner size="sm" />
            Loading alerts...
          </div>
        ) : err ? (
          <p className="text-sm text-red-600">{err}</p>
        ) : (
          <div className="max-h-[520px] overflow-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>Src → Dst</Table.HeadCell>
                <Table.HeadCell>Signature</Table.HeadCell>
                <Table.HeadCell>Severity</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {alerts.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={4} className="text-sm text-gray-500">
                      No alerts yet.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  alerts.map((a) => (
                    <Table.Row key={a.id}>
                      <Table.Cell className="text-sm">
                        {a.eventTime ? new Date(a.eventTime).toLocaleString() : "-"}
                      </Table.Cell>
                      <Table.Cell className="text-sm">
                        {a.srcIp}
                        {a.srcPort ? `:${a.srcPort}` : ""} → {a.destIp}
                        {a.destPort ? `:${a.destPort}` : ""}
                      </Table.Cell>
                      <Table.Cell className="text-sm">
                        {a.signature}
                        {a.signatureId ? (
                          <span className="text-xs text-gray-400"> (sid: {a.signatureId})</span>
                        ) : null}
                      </Table.Cell>
                      <Table.Cell className="text-sm">
                        <Badge color={sevBadgeColor(a.severity)}>
                          {a.severity ?? "-"}
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SuricataAlerts;
