export interface HumorNode {
  id: string;
  text: string;
}

export const humorSchema = {
  title: 'Humor Node',
  type: 'object',
  properties: {
    id: { type: 'string' },
    text: { type: 'string' }
  },
  required: ['id', 'text']
};
