import type { Meta, StoryObj } from '@storybook/react';
import '../index.css'

import { Column } from '../features/column';

const meta = {
  title: 'Kanban/Column',
  component: Column,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    cards: { control: 'object' },
    onAddCard: { action: 'add card' },
    onEditCard: { action: 'edit card' },
    onDeleteCard: { action: 'delete card' },
    onEditColumn: { action: 'edit column' },
    onDeleteColumn: { action: 'delete column' },
  },
} satisfies Meta<typeof Column>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { 
    id: 'col1',
    title: 'To Do', 
    cards: [] 
  },
};

export const WithCards: Story = {
  args: { 
    id: 'col2',
    title: 'In Progress', 
    cards: [
      { 
        id: 'card1', 
        title: 'Research API options', 
        description: 'Look into REST vs GraphQL for our new project.' 
      },
      { 
        id: 'card2', 
        title: 'Create wireframes', 
        description: 'Design the initial UI mockups for the dashboard.' 
      },
      { 
        id: 'card3', 
        title: 'Set up CI/CD pipeline', 
        description: 'Configure GitHub Actions for automated testing and deployment.' 
      },
    ] 
  },
};

export const ManyCards: Story = {
  args: { 
    id: 'col3',
    title: 'Backlog', 
    cards: Array(10).fill(null).map((_, i) => ({
      id: `backlog-${i}`,
      title: `Backlog Item ${i + 1}`,
      description: i % 2 === 0 ? `This is a detailed description for backlog item ${i + 1}` : ''
    }))
  },
};
