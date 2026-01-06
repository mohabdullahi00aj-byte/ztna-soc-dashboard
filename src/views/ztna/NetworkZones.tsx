import { Card } from "flowbite-react";

const NetworkZones = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Network Zones
      </h1>
      <p className="text-sm text-gray-500">
        This view documents the segmented Zero Trust network: USER, DMZ,
        APP, and SOC zones, with their IP ranges and example hosts.
      </p>

      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Zone Overview
        </h2>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>
            <strong>USER</strong> – 192.168.1.0/24 (clients, laptops, Kali)
          </li>
          <li>
            <strong>DMZ</strong> – 192.168.20.0/24 (reverse proxy, public
            services)
          </li>
          <li>
            <strong>APP</strong> – 192.168.30.0/24 (application servers,
            PDP backend)
          </li>
          <li>
            <strong>SOC</strong> – 192.168.40.0/24 (Suricata, SIEM,
            monitoring tools)
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-500">
          Later you can add a diagram or embed an image here to show the
          full GNS3 topology for your FYP presentation.
        </p>
      </Card>
    </div>
  );
};

export default NetworkZones;
