import { MockMessageTemplate } from '@/mock/messageTemplate';
import type { MessageTemplate } from '@/types/messageTemplate';
import { create } from 'zustand';

type TemplateMode = 'CREATE' | 'UPDATE';
type FormField = 'title' | 'content';

interface MessageTemplateForm {
  title: string;
  content: string;
}

interface MessageTemplateStore {
  templates: MessageTemplate[];
  selectedTemplateId: number | null;
  mode: TemplateMode;
  form: MessageTemplateForm;
  menuOpenId: number | null;
  selectTemplate: (id: number) => void;
  setFormField: (field: FormField, value: string) => void;
  openCreateMode: () => void;
  toggleMenu: (id: number) => void;
  closeMenu: () => void;
  addTemplate: () => void;
  updateTemplate: () => void;
  deleteTemplate: (id: number) => void;
}

const STORAGE_KEY = 'message-template-list';

const getNowString = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

const getEmptyForm = (): MessageTemplateForm => ({
  title: '',
  content: '',
});

const saveTemplates = (templates: MessageTemplate[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
};

const getInitialTemplates = (): MessageTemplate[] => {
  if (typeof window === 'undefined') return MockMessageTemplate;

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    saveTemplates(MockMessageTemplate);
    return MockMessageTemplate;
  }

  try {
    const parsed = JSON.parse(stored) as MessageTemplate[];
    if (!Array.isArray(parsed)) return MockMessageTemplate;
    return parsed;
  } catch {
    return MockMessageTemplate;
  }
};

const initialTemplates = getInitialTemplates();

export const useMessageTemplateStore = create<MessageTemplateStore>(
  (set, get) => ({
    templates: initialTemplates,
    selectedTemplateId: null,
    mode: 'CREATE',
    form: getEmptyForm(),
    menuOpenId: null,

    selectTemplate: (id) => {
      const selectedTemplate = get().templates.find((template) => template.id === id);
      if (!selectedTemplate) return;

      set({
        selectedTemplateId: selectedTemplate.id,
        mode: 'UPDATE',
        form: {
          title: selectedTemplate.title,
          content: selectedTemplate.content,
        },
        menuOpenId: null,
      });
    },

    setFormField: (field, value) =>
      set((state) => ({
        form: {
          ...state.form,
          [field]: value,
        },
      })),

    openCreateMode: () =>
      set({
        selectedTemplateId: null,
        mode: 'CREATE',
        form: getEmptyForm(),
        menuOpenId: null,
      }),

    toggleMenu: (id) =>
      set((state) => ({
        menuOpenId: state.menuOpenId === id ? null : id,
      })),

    closeMenu: () =>
      set({
        menuOpenId: null,
      }),

    addTemplate: () => {
      const { form, templates } = get();
      const title = form.title.trim();
      const content = form.content.trim();

      if (!title || !content) return;

      const nextId = templates.length
        ? Math.max(...templates.map((template) => template.id)) + 1
        : 1;
      const now = getNowString();
      const newTemplate: MessageTemplate = {
        id: nextId,
        title,
        content,
        created_at: now,
        updated_at: now,
      };
      const nextTemplates = [newTemplate, ...templates];

      saveTemplates(nextTemplates);

      set({
        templates: nextTemplates,
        selectedTemplateId: newTemplate.id,
        mode: 'UPDATE',
        form: {
          title: newTemplate.title,
          content: newTemplate.content,
        },
      });
    },

    updateTemplate: () => {
      const { selectedTemplateId, form, templates } = get();
      if (!selectedTemplateId) return;

      const title = form.title.trim();
      const content = form.content.trim();
      if (!title || !content) return;

      const now = getNowString();
      const nextTemplates = templates.map((template) =>
        template.id === selectedTemplateId
          ? {
              ...template,
              title,
              content,
              updated_at: now,
            }
          : template,
      );

      saveTemplates(nextTemplates);
      set({
        templates: nextTemplates,
      });
    },

    deleteTemplate: (id) => {
      const { templates, selectedTemplateId } = get();
      const nextTemplates = templates.filter((template) => template.id !== id);
      saveTemplates(nextTemplates);

      if (!nextTemplates.length) {
        set({
          templates: [],
          selectedTemplateId: null,
          mode: 'CREATE',
          form: getEmptyForm(),
          menuOpenId: null,
        });
        return;
      }

      if (selectedTemplateId === id) {
        set({
          templates: nextTemplates,
          selectedTemplateId: null,
          mode: 'CREATE',
          form: getEmptyForm(),
          menuOpenId: null,
        });
        return;
      }

      set({
        templates: nextTemplates,
        menuOpenId: null,
      });
    },
  }),
);
