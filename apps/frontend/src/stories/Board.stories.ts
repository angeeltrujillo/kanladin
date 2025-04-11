import type { Meta, StoryObj } from '@storybook/react';
import '../index.css'

import { Board } from '../components/Board';

const meta = {
  title: 'Kanban/Board',
  component: Board,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    columns: { control: 'object' },
    onAddColumn: { action: 'add column' },
    onEditColumn: { action: 'edit column' },
    onDeleteColumn: { action: 'delete column' },
    onAddCard: { action: 'add card' },
    onEditCard: { action: 'edit card' },
    onDeleteCard: { action: 'delete card' },
  },
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { 
    id: 'board1',
    title: 'Project Kanban', 
    columns: [] 
  },
};

export const WithColumns: Story = {
  args: { 
    id: 'board2',
    title: 'Development Workflow', 
    columns: [
      { 
        id: 'col1', 
        title: 'Backlog', 
        cards: [
          { id: 'card1', title: 'Research competitors', description: 'Analyze top 3 competitor products' },
          { id: 'card2', title: 'User interviews', description: 'Schedule interviews with 5 potential users' },
          { id: 'card3', title: 'Define MVP scope', description: '' },
        ] 
      },
      { 
        id: 'col2', 
        title: 'To Do', 
        cards: [
          { id: 'card4', title: 'Setup project repository', description: 'Initialize Git repo and configure CI/CD' },
          { id: 'card5', title: 'Create component library', description: 'Build reusable UI components with Storybook' },
        ] 
      },
      { 
        id: 'col3', 
        title: 'In Progress', 
        cards: [
          { id: 'card6', title: 'Implement authentication', description: 'Add login/signup flows with JWT' },
        ] 
      },
      { 
        id: 'col4', 
        title: 'Review', 
        cards: [] 
      },
      { 
        id: 'col5', 
        title: 'Done', 
        cards: [
          { id: 'card7', title: 'Project kickoff', description: 'Initial planning and team allocation' },
          { id: 'card8', title: 'Wireframes', description: 'Create low-fidelity wireframes for key screens' },
        ] 
      },
    ] 
  },
};
