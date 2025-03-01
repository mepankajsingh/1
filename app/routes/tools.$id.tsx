import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Card, Image, Text, Badge, Group, Button, Title, Stack, List, ActionIcon, Flex, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Layout from '~/components/Layout';
import { getAIToolById, deleteAITool } from '~/utils/supabase.server';
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tool = await getAIToolById(params.id as string);
  
  if (!tool) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return json({ tool });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  
  if (intent === "delete" && params.id) {
    await deleteAITool(params.id);
    return redirect("/");
  }
  
  return null;
};

export default function ToolDetails() {
  const { tool } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this tool?")) {
      const formData = new FormData();
      formData.append("intent", "delete");
      
      try {
        await fetch(`/tools/${tool.id}`, {
          method: "POST",
          body: formData,
        });
        notifications.show({
          title: 'Success',
          message: 'Tool deleted successfully',
          color: 'green',
        });
        navigate('/');
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete tool',
          color: 'red',
        });
      }
    }
  };
  
  return (
    <Layout>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Flex justify="space-between" align="flex-start">
          <Title order={1}>{tool.name}</Title>
          <Group>
            <Button 
              variant="outline" 
              color="blue"
              onClick={() => navigate(`/tools/${tool.id}/edit`)}
            >
              Edit
            </Button>
            <Button 
              variant="outline" 
              color="red"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Group>
        </Flex>
        
        <Group mt="md">
          <Badge color="blue" size="lg">{tool.category}</Badge>
          <Badge color="gray" size="lg">{tool.pricing}</Badge>
        </Group>
        
        <Card.Section mt="md">
          <Image
            src={tool.image_url || 'https://placehold.co/800x400?text=AI+Tool'}
            height={300}
            alt={tool.name}
          />
        </Card.Section>
        
        <Stack mt="xl" spacing="md">
          <Box>
            <Title order={3}>Description</Title>
            <Text>{tool.description}</Text>
          </Box>
          
          <Box>
            <Title order={3}>Website</Title>
            <Text component="a" href={tool.url} target="_blank" rel="noopener noreferrer" c="blue">
              {tool.url}
            </Text>
          </Box>
          
          {tool.features && tool.features.length > 0 && (
            <Box>
              <Title order={3}>Features</Title>
              <List>
                {tool.features.map((feature, index) => (
                  <List.Item key={index}>{feature}</List.Item>
                ))}
              </List>
            </Box>
          )}
        </Stack>
      </Card>
    </Layout>
  );
}
