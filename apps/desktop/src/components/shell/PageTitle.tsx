import { Title } from "@mantine/core";

interface Props {
  content: string;
}

export const PageTitle = ({ content }: Props) => (
  <Title order={1} mb="md">
    {content}
  </Title>
);
