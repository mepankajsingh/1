import { TextInput, Textarea, Button, Group, Select, MultiSelect, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import type { AITool } from '~/utils/supabase.server';

interface ToolFormProps {
  initialValues?: Partial<AITool>;
  onSubmit: (values: Partial<AITool>) => void;
  isSubmitting?: boolean;
}

const CATEGORIES = [
  { value: 'chatbots', label: 'Chatbots' },
  { value: 'image-generation', label: 'Image Generation' },
  { value: 'text-to-speech', label: 'Text to Speech' },
  { value: 'code-assistants', label: 'Code Assistants' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'other', label: 'Other' },
];

const PRICING_OPTIONS = [
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
  { value: 'subscription', label: 'Subscription' },
];

const FEATURE_OPTIONS = [
  { value: 'api', label: 'API Access' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'desktop', label: 'Desktop App' },
  { value: 'browser-extension', label: 'Browser Extension' },
  { value: 'offline', label: 'Offline Support' },
  { value: 'customization', label: 'Customization' },
];

export default function ToolForm({ initialValues = {}, onSubmit, isSubmitting = false }: ToolFormProps) {
  const form = useForm({
    initialValues: {
      name: initialValues.name || '',
      description: initialValues.description || '',
      url: initialValues.url || '',
      image_url: initialValues.image_url || '',
      category: initialValues.category || '',
      pricing: initialValues.pricing || '',
      features: initialValues.features || [],
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      description: (value) => (value ? null : 'Description is required'),
      url: (value) => (/^https?:\/\//.test(value) ? null : 'URL must start with http:// or https://'),
      category: (value) => (value ? null : 'Category is required'),
    },
  });

  return (
    <Box maw={600} mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Name"
          placeholder="Tool name"
          required
          {...form.getInputProps('name')}
          mb="md"
        />

        <Textarea
          label="Description"
          placeholder="Describe what this AI tool does"
          required
          minRows={3}
          {...form.getInputProps('description')}
          mb="md"
        />

        <TextInput
          label="URL"
          placeholder="https://example.com"
          required
          {...form.getInputProps('url')}
          mb="md"
        />

        <TextInput
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          {...form.getInputProps('image_url')}
          mb="md"
        />

        <Select
          label="Category"
          placeholder="Select a category"
          data={CATEGORIES}
          required
          {...form.getInputProps('category')}
          mb="md"
        />

        <Select
          label="Pricing"
          placeholder="Select pricing model"
          data={PRICING_OPTIONS}
          {...form.getInputProps('pricing')}
          mb="md"
        />

        <MultiSelect
          label="Features"
          placeholder="Select features"
          data={FEATURE_OPTIONS}
          {...form.getInputProps('features')}
          mb="md"
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={isSubmitting}>
            {initialValues.id ? 'Update Tool' : 'Add Tool'}
          </Button>
        </Group>
      </form>
    </Box>
  );
}
