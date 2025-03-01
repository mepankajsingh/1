import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://srfzoifcvqckpxqfiuau.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZnpvaWZjdnFja3B4cWZpdWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzNTIwMTMsImV4cCI6MjA1NTkyODAxM30.leqQMCLOzdDzfnTGi4DXBuYhdzg4ULSVer38SGI5NL0';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type AITool = {
  id: string;
  name: string;
  description: string;
  url: string;
  image_url: string;
  category: string;
  pricing: string;
  features: string[];
  created_at: string;
};

export async function getAITools() {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching AI tools:', error);
    return [];
  }
  
  return data as AITool[];
}

export async function getAIToolById(id: string) {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching AI tool:', error);
    return null;
  }
  
  return data as AITool;
}

export async function createAITool(tool: Omit<AITool, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('ai_tools')
    .insert([tool])
    .select();
  
  if (error) {
    console.error('Error creating AI tool:', error);
    return null;
  }
  
  return data[0] as AITool;
}

export async function updateAITool(id: string, tool: Partial<AITool>) {
  const { data, error } = await supabase
    .from('ai_tools')
    .update(tool)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating AI tool:', error);
    return null;
  }
  
  return data[0] as AITool;
}

export async function deleteAITool(id: string) {
  const { error } = await supabase
    .from('ai_tools')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting AI tool:', error);
    return false;
  }
  
  return true;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('category')
    .order('category');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  // Extract unique categories
  const categories = [...new Set(data.map(item => item.category))];
  return categories;
}
