-- This is the schema for the Supabase database
-- You can run this in the Supabase SQL editor to set up your tables

-- Create the ai_tools table
CREATE TABLE ai_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  pricing TEXT,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_tools_updated_at
BEFORE UPDATE ON ai_tools
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Insert some sample data
INSERT INTO ai_tools (name, description, url, image_url, category, pricing, features) VALUES
('ChatGPT', 'Advanced language model that can generate human-like text responses.', 'https://chat.openai.com', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png', 'chatbots', 'freemium', ARRAY['api', 'mobile']),
('DALL-E', 'AI system that can create realistic images and art from natural language descriptions.', 'https://openai.com/dall-e-2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Dall-E_2_logo.svg/1200px-Dall-E_2_logo.svg.png', 'image-generation', 'paid', ARRAY['api', 'customization']),
('GitHub Copilot', 'AI pair programmer that helps you write code faster with less work.', 'https://github.com/features/copilot', 'https://github.githubassets.com/images/modules/site/copilot/copilot.png', 'code-assistants', 'subscription', ARRAY['desktop', 'browser-extension']),
('Midjourney', 'AI art generator that creates images from textual descriptions.', 'https://www.midjourney.com', 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png', 'image-generation', 'subscription', ARRAY['customization']),
('Eleven Labs', 'AI voice generator with realistic text-to-speech capabilities.', 'https://elevenlabs.io', 'https://assets-global.website-files.com/646218c67da47160c64a84d5/6462e59c4a9c1581f9d73c25_favicon-256.png', 'text-to-speech', 'freemium', ARRAY['api', 'customization']);
