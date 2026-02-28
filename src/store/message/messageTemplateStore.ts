import {
  DEFAULT_MESSAGE_TEMPLATE_TYPE,
  type MessageTemplateType,
} from '@/constants/messageTemplate';
import { createMessageTemplate, getMessageTemplates } from '@/shared/api/message';
import type { MessageTemplate } from '@/types/messageTemplate';
import { create } from 'zustand';

type TemplateMode = 'CREATE' | 'UPDATE';
type FormField = 'type' | 'title' | 'content';

interface MessageTemplateForm {
  type: MessageTemplateType;
  title: string;
  content: string;
}

interface MessageTemplateStore {
  templates: MessageTemplate[];
  selectedTemplateId: number | null;
  mode: TemplateMode;
  form: MessageTemplateForm;
  menuOpenId: number | null;
  isLoadingTemplates: boolean;
  hasLoadedTemplates: boolean;
  fetchTemplates: (options?: { page?: number; size?: number; force?: boolean }) => Promise<void>;
  selectTemplate: (id: number) => void;
  setFormField: (field: FormField, value: MessageTemplateForm[FormField]) => void;
  openCreateMode: () => void;
  toggleMenu: (id: number) => void;
  closeMenu: () => void;
  addTemplate: () => Promise<void>;
  updateTemplate: () => void;
  deleteTemplate: (id: number) => void;
}

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

const getNowString = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

const getEmptyForm = (): MessageTemplateForm => ({
  type: DEFAULT_MESSAGE_TEMPLATE_TYPE,
  title: '',
  content: '',
});

export const useMessageTemplateStore = create<MessageTemplateStore>(
  (set, get) => ({
    templates: [],
    selectedTemplateId: null,
    mode: 'CREATE',
    form: getEmptyForm(),
    menuOpenId: null,
    isLoadingTemplates: false,
    hasLoadedTemplates: false,

    fetchTemplates: async (options) => {
      const { hasLoadedTemplates, isLoadingTemplates } = get();
      const page = options?.page ?? DEFAULT_PAGE;
      const size = options?.size ?? DEFAULT_SIZE;
      const force = options?.force ?? false;
      if (!force && (hasLoadedTemplates || isLoadingTemplates)) return;

      set({ isLoadingTemplates: true });
      const { templates } = await getMessageTemplates({ page, size });
      set({
        templates,
        selectedTemplateId: null,
        mode: 'CREATE',
        form: getEmptyForm(),
        menuOpenId: null,
        isLoadingTemplates: false,
        hasLoadedTemplates: true,
      });
    },

    selectTemplate: (id) => {
      const selectedTemplate = get().templates.find((template) => template.id === id);
      if (!selectedTemplate) return;

      set({
        selectedTemplateId: selectedTemplate.id,
        mode: 'UPDATE',
        form: {
          type: selectedTemplate.type ?? DEFAULT_MESSAGE_TEMPLATE_TYPE,
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

    addTemplate: async () => {
      const { form, templates } = get();
      const title = form.title.trim();
      const content = form.content.trim();

      if (!title || !content) return;

      const type = form.type.trim();
      if (!type) return;

      try {
        const createdTemplate = await createMessageTemplate({
          type,
          title,
          content,
        });
        const nextTemplates = [createdTemplate, ...templates];
        set({
          templates: nextTemplates,
          selectedTemplateId: createdTemplate.id,
          mode: 'UPDATE',
          form: {
            type: createdTemplate.type ?? DEFAULT_MESSAGE_TEMPLATE_TYPE,
            title: createdTemplate.title,
            content: createdTemplate.content,
          },
        });
      } catch (error) {
        console.error('Failed to create message template:', error);
      }
    },

    updateTemplate: () => {
      const { selectedTemplateId, form, templates } = get();
      if (!selectedTemplateId) return;

      const title = form.title.trim();
      const content = form.content.trim();
      const type = form.type.trim();
      if (!title || !content || !type) return;

      const now = getNowString();
      const nextTemplates = templates.map((template) =>
        template.id === selectedTemplateId
          ? {
              ...template,
              type,
              title,
              content,
              updated_at: now,
            }
          : template,
      );

      set({
        templates: nextTemplates,
      });
    },

    deleteTemplate: (id) => {
      const { templates, selectedTemplateId } = get();
      const nextTemplates = templates.filter((template) => template.id !== id);

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
