import { redirect, json } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { Title, Paper } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Layout from '~/components/Layout';
import ToolForm from '~/components/ToolForm';
import { createAITool } from '~/utils/supabase.server';
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const toolData = Object.fromEntries(formData);
  
  // Convert features from string to array if it exists
  if (typeof toolData.features === 'string') {
    toolData.features = JSON.parse(toolData.features);
  }
  
  const newTool = await createAITool(toolData);
  
  if (!newTool) {
    return json({ error: "Failed to create tool" }, { status: 400 });
  }
  
  return redirect(`/tools/${newTool.id}`);
};

export default function NewTool() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const handleSubmit = (values: any) => {
    const formData = new FormData();
    
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'features' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as string);
      }
    });
    
    return formData;
  };
  
  return (
    <Layout>
      <Title order={1} mb="xl">Add New AI Tool</Title>
      
      <Paper shadow="xs" p="md">
        <ToolForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Paper>
    </Layout>
  );
}
