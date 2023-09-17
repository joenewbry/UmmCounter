import { Table } from "@mantine/core";
import { AppShell } from "@/components/shell/AppShell";
import { PageTitle } from "@/components/shell/PageTitle";

const meetings = [
  { id: 6, date: "12/7", length: "27 min", ummCount: "7" },
  { id: 5, date: "12/6", length: "32 min", ummCount: "8" },
  { id: 4, date: "12/5", length: "29 min", ummCount: "6" },
  { id: 3, date: "12/4", length: "31 min", ummCount: "9" },
];

export const Meetings = () => {
  const rows = meetings.map((meeting) => (
    <tr key={meeting.id}>
      <td>{meeting.id}</td>
      <td>{meeting.date}</td>
      <td>{meeting.length}</td>
      <td>{meeting.ummCount}</td>
    </tr>
  ));

  return (
    <AppShell>
      <PageTitle content="Meetings" />
      <Table>
        <thead>
          <tr>
            <th>Meeting ID</th>
            <th>Date</th>
            <th>Length</th>
            <th>Umm Count</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </AppShell>
  );
};
