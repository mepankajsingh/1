import { Card, Image, Text, Badge, Group, Button, Title } from '@mantine/core';
import { Link } from '@remix-run/react';
import type { AITool } from '~/utils/supabase.server';

interface ToolCardProps {
  tool: AITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={tool.image_url || 'https://placehold.co/600x400?text=AI+Tool'}
          height={160}
          alt={tool.name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Title order={4}>{tool.name}</Title>
        <Badge color="blue">{tool.category}</Badge>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={3}>
        {tool.description}
      </Text>

      <Text size="sm" mt="md">
        <strong>Pricing:</strong> {tool.pricing}
      </Text>

      <Group mt="md">
        <Button component={Link} to={`/tools/${tool.id}`} variant="light" color="blue" fullWidth>
          View Details
        </Button>
      </Group>
    </Card>
  );
}
