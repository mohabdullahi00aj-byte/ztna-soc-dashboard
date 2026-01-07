import { useEffect, useMemo, useState } from "react";
import { Card, Table, Button, TextInput, Badge, Spinner } from "flowbite-react";
// ✅ Changed: Import both the function AND the Type from the backend file
import { getRecentDecisions, AccessDecision } from "./backend";

const AccessDecisions = () => {
  // TypeScript now uses the AccessDecision definition from your backend.ts
  const [data, setData] = useState<AccessDecision[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [qSubject, setQSubject] = useState("");
  const [qZone, setQZone] = useState("");
  const [qResource, setQResource] = useState("");
  const [qDecision, setQDecision] = useState("");

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const res = await getRecentDecisions(200);
      setData(res);
    } catch (e) {
      console.error(e);
      setError("Failed to load access decisions from backend.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return data.filter((d) => {
      const subjectOk = qSubject
        ? d.subjectId.toLowerCase().includes(qSubject.toLowerCase())
        : true;

      const zoneOk = qZone
        ? (d.zone ?? "").toLowerCase().includes(qZone.toLowerCase())
        : true;

      const resourceOk = qResource
        ? d.resource.toLowerCase().includes(qResource.toLowerCase())
        : true;

      const decisionOk = qDecision
        ? d.decision.toLowerCase() === qDecision.toLowerCase()
        : true;

      return subjectOk && zoneOk && resourceOk && decisionOk;
    });
  }, [data, qSubject, qZone, qResource, qDecision]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Access Decisions
        </h1>
        <p className="text-sm text-gray-500">
          Full history of Zero Trust PDP decisions (PERMIT / DENY)
        </p>
      </div>

      <Card>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="grid gap-3 md:grid-cols-4 w-full">
            <TextInput
              placeholder="Subject"
              value={qSubject}
              onChange={(e) => setQSubject(e.target.value)}
            />
            <TextInput
              placeholder="Zone"
              value={qZone}
              onChange={(e) => setQZone(e.target.value)}
            />
            <TextInput
              placeholder="Resource"
              value={qResource}
              onChange={(e) => setQResource(e.target.value)}
            />
            <TextInput
              placeholder="PERMIT / DENY"
              value={qDecision}
              onChange={(e) => setQDecision(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={() => void load()}>
              Refresh
            </Button>
            <Button
              size="sm"
              color="light"
              onClick={() => {
                setQSubject("");
                setQZone("");
                setQResource("");
                setQDecision("");
              }}
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="mt-4">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Spinner size="sm" />
              Loading decisions…
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}

          <div className="mt-3 max-h-[520px] overflow-auto text-sm">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell>Subject</Table.HeadCell>
                <Table.HeadCell>Zone</Table.HeadCell>
                <Table.HeadCell>Source IP</Table.HeadCell>
                <Table.HeadCell>Resource</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
                <Table.HeadCell>Decision</Table.HeadCell>
                <Table.HeadCell>Reason</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {!loading && filtered.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={8} className="text-gray-400">
                      No decisions found.
                    </Table.Cell>
                  </Table.Row>
                )}

                {filtered.map((d) => (
                  <Table.Row key={d.id}>
                    <Table.Cell>
                      {new Date(d.createdAt).toLocaleString()}
                    </Table.Cell>
                    <Table.Cell className="font-medium">
                      {d.subjectId}
                    </Table.Cell>
                    <Table.Cell>{d.zone ?? "-"}</Table.Cell>
                    <Table.Cell>{d.sourceIp ?? "-"}</Table.Cell>
                    <Table.Cell>{d.resource}</Table.Cell>
                    <Table.Cell>{d.action}</Table.Cell>
                    <Table.Cell>
                      <Badge
                        color={
                          d.decision === "PERMIT"
                            ? "success"
                            : "failure"
                        }
                      >
                        {d.decision}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="text-gray-600">
                      {d.reason ?? "-"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccessDecisions;