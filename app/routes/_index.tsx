import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SimpleGrid, Title, Text, Group, TextInput, Select } from '@mantine/core';
import { useState } from 'react';
import Layout from '~/components/Layout';
import ToolCard from '~/components/ToolCard';
import { getAITools, type AITool } from '~/utils/supabase.server';

export const loader = async () => {
  const tools = await getAITools();
  return json({ tools });
};

export default function Index() {
  const { tools } = useLoaderData<typeof loader>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string | null>('newest');

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <Layout>
      <Title order={1} mb="md">AI Tools Directory</Title>
      <Text mb="xl">Discover the latest and greatest AI tools for various use cases.</Text>
      
      <Group mb="xl">
        <TextInput
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Select
          placeholder="Sort by"
          value={sortBy}
          onChange={setSortBy}
          data={[
            { value: 'newest', label: 'Newest First' },
            { value: 'oldest', label: 'Oldest First' },
            { value: 'name', label: 'Name (A-Z)' },
          ]}
          style={{ width: 200 }}
        />
      </Group>

      {sortedTools.length === 0 ? (
        <Text ta="center" fz="lg" mt="xl">No tools found. Try a different search term.</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {sortedTools.map((tool: AITool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </SimpleGrid>
      )}
    </Layout>
  );
}
