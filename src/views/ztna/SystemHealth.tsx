import { Card, Badge } from "flowbite-react";

const SystemHealth = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        System Health
      </h1>
      <p className="text-sm text-gray-500">
        This view will provide a quick overview of the ZTNA platform
        status: backend API, database, Suricata ingest, and policy
        engine.
      </p>

      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Component Status (static placeholder)
        </h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center justify-between">
            <span>Backend API (NestJS)</span>
            <Badge color="success">OK</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>MySQL Database</span>
            <Badge color="success">OK</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Suricata Ingest Endpoint</span>
            <Badge color="warning">Simulated</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Policy Engine</span>
            <Badge color="success">Loaded</Badge>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Later we can connect this to a real health-check endpoint on
          the backend to display live status.
        </p>
      </Card>
    </div>
  );
};

export default SystemHealth;
