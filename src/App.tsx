import {
  AppShell,
  Navbar,
  Header,
  Group,
  ThemeIcon,
  UnstyledButton,
  Text,
} from "@mantine/core";
import {
  IconUserCircle,
  IconBrandZoom,
  IconBulb,
  IconReceipt,
} from "@tabler/icons-react";
import Profile from "./pages/Profile";
import Meetings from "./pages/Meetings";
import Insights from "./pages/Insights";
import Billing from "./pages/Billing";

import { useState } from "react";
interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  onClick: () => void;
}

type page = "Profile" | "Meetings" | "Insights" | "Billing";

function MainLink({ icon, color, label, onClick }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      onClick={onClick}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

interface data {
  icon: React.ReactNode;
  color: string;
  label: page;
}

const data: data[] = [
  {
    icon: <IconUserCircle size="1rem" />,
    color: "blue",
    label: "Profile",
  },
  {
    icon: <IconBrandZoom size="1rem" />,
    color: "teal",
    label: "Meetings",
  },
  { icon: <IconBulb size="1rem" />, color: "violet", label: "Insights" },
  { icon: <IconReceipt size="1rem" />, color: "grape", label: "Billing" },
];

function App() {
  const [currentPage, setCurrentPage] = useState<page>("Profile");

  const pages = {
    Profile: <Profile />,
    Meetings: <Meetings />,
    Insights: <Insights />,
    Billing: <Billing />,
  };

  function MainLinks() {
    const links = data.map((link) => (
      <MainLink
        {...link}
        key={link.label}
        onClick={() => setCurrentPage(link.label)}
      />
    ));
    return <div>{links}</div>;
  }
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="md">
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          Umm Counter App
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {pages[currentPage]}
    </AppShell>
  );
}

export default App;
