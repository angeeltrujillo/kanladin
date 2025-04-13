import type { Meta, StoryObj } from '@storybook/react';
import '../index.css'

import { Card } from '../features/card';

const meta = {
  title: 'Kanban/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    onEdit: { action: 'edited' },
    onDelete: { action: 'deleted' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { 
    id: '1',
    title: 'New task', 
    description: '' 
  },
};

export const WithDescription: Story = {
  args: { 
    id: '2',
    title: 'Research API options', 
    description: 'Look into REST vs GraphQL for our new project. Consider performance, ease of implementation, and client requirements.' 
  },
};

export const LongContent: Story = {
  args: { 
    id: '3',
    title: 'This is a very long card title that might wrap to multiple lines in the UI',
    description: 'This card has a very long description that demonstrates how the card handles overflow content. It should wrap properly and maintain readability while still looking good in the UI. We want to make sure that even with a lot of content, the card remains usable and visually appealing.'
  },
};
