import { AppShell, Burger, Group, Title, Button, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from '@remix-run/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3}>AI Directory</Title>
          </Group>
          <Group>
            <Button component={Link} to="/tools/new" variant="filled" color="blue">
              Add New Tool
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Title order={4} mb="md">Categories</Title>
        <Button component={Link} to="/" variant="subtle" fullWidth mb="xs">
          All Tools
        </Button>
        <Button component={Link} to="/category/chatbots" variant="subtle" fullWidth mb="xs">
          Chatbots
        </Button>
        <Button component={Link} to="/category/image-generation" variant="subtle" fullWidth mb="xs">
          Image Generation
        </Button>
        <Button component={Link} to="/category/text-to-speech" variant="subtle" fullWidth mb="xs">
          Text to Speech
        </Button>
        <Button component={Link} to="/category/code-assistants" variant="subtle" fullWidth mb="xs">
          Code Assistants
        </Button>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
