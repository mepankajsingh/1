import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { SimpleGrid, Title, Text, Group, TextInput, Select } from '@mantine/core';
import { useState } from 'react';
import Layout from '~/components/Layout';
import ToolCard from '~/components/ToolCard';
import { getAITools, type AITool } from '~/utils/supabase.server';
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const allTools = await getAITools();
  const categoryId = params.categoryId;
  
  const tools = allTools.filter(tool => 
    tool.category.toLowerCase() === categoryId?.toLowerCase()
  );
  
  return json({ tools, category: categoryId });
};

export default function CategoryPage() {
  const { tools, category } = useLoaderData<typeof loader>();
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

  // Format category name for display
  const formattedCategory = category
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Layout>
      <Title order={1} mb="md">{formattedCategory} AI Tools</Title>
      <Text mb="xl">Browse AI tools in the {formattedCategory} category.</Text>
      
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
        <Text ta="center" fz="lg" mt="xl">No tools found in this category.</Text>
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
