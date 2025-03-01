import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import { Title, Paper } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Layout from '~/components/Layout';
import ToolForm from '~/components/ToolForm';
import { getAIToolById, updateAITool } from '~/utils/supabase.server';
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
  const toolData = Object.fromEntries(formData);
  
  // Convert features from string to array if it exists
  if (typeof toolData.features === 'string') {
    toolData.features = JSON.parse(toolData.features);
  }
  
  const updatedTool = await updateAITool(params.id as string, toolData);
  
  if (!updatedTool) {
    return json({ error: "Failed to update tool" }, { status: 400 });
  }
  
  return redirect(`/tools/${params.id}`);
};

export default function EditTool() {
  const { tool } = useLoaderData<typeof loader>();
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
      <Title order={1} mb="xl">Edit AI Tool</Title>
      
      <Paper shadow="xs" p="md">
        <ToolForm 
          initialValues={tool} 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Paper>
    </Layout>
  );
}
