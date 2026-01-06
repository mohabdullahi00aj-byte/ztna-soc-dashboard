import { Card, Table } from "flowbite-react";

const Policies = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Policies</h1>
      <p className="text-sm text-gray-500">
        This view will list the active Zero Trust policies from the PDP
        database (roles, resources, actions, zones, time windows).
      </p>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Policy Table
          </h2>
          <span className="text-xs text-gray-400">
            (Coming soon – wired to /policies)
          </span>
        </div>

        <Table>
          <Table.Head>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Resource</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>Zone</Table.HeadCell>
            <Table.HeadCell>Effect</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell className="text-gray-400 text-sm">
                Example
              </Table.Cell>
              <Table.Cell className="text-gray-400 text-sm">
                dashboard
              </Table.Cell>
              <Table.Cell className="text-gray-400 text-sm">
                read
              </Table.Cell>
              <Table.Cell className="text-gray-400 text-sm">
                USER
              </Table.Cell>
              <Table.Cell className="text-gray-400 text-sm">
                PERMIT
              </Table.Cell>
              <Table.Cell className="text-gray-400 text-sm">
                This table will be populated from the backend.
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
};

export default Policies;
