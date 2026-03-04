import {
  DEFAULT_MESSAGE_TEMPLATE_TYPE,
  type MessageTemplateType,
} from '@/constants/messageTemplate';
import {
  createMessageTemplate,
  deleteMessageTemplate,
  getMessageTemplates,
  updateMessageTemplate,
} from '@/shared/api/message';
import { useToastStore } from '@/store/feedback/toastStore';
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
  totalCount: number;
  selectedTemplateId: number | null;
  mode: TemplateMode;
  form: MessageTemplateForm;
  menuOpenId: number | null;
  isLoadingTemplates: boolean;
  hasLoadedTemplates: boolean;
  templatesUpdatedAt: number | null;
  fetchTemplates: (options?: { page?: number; size?: number; force?: boolean }) => Promise<void>;
  selectTemplate: (id: number) => void;
  setFormField: (field: FormField, value: MessageTemplateForm[FormField]) => void;
  openCreateMode: () => void;
  toggleMenu: (id: number) => void;
  closeMenu: () => void;
  addTemplate: () => Promise<void>;
  updateTemplate: () => Promise<void>;
  deleteTemplate: (id: number) => Promise<void>;
}

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;

const getEmptyForm = (): MessageTemplateForm => ({
  type: DEFAULT_MESSAGE_TEMPLATE_TYPE,
  title: '',
  content: '',
});

export const useMessageTemplateStore = create<MessageTemplateStore>(
  (set, get) => ({
    templates: [],
    totalCount: 0,
    selectedTemplateId: null,
    mode: 'CREATE',
    form: getEmptyForm(),
    menuOpenId: null,
    isLoadingTemplates: false,
    hasLoadedTemplates: false,
    templatesUpdatedAt: null,

    fetchTemplates: async (options) => {
      const { hasLoadedTemplates, isLoadingTemplates } = get();
      const page = options?.page ?? DEFAULT_PAGE;
      const size = options?.size ?? DEFAULT_SIZE;
      const force = options?.force ?? false;
      if (!force && (hasLoadedTemplates || isLoadingTemplates)) return;

      set({ isLoadingTemplates: true });
      const { templates, total_count } = await getMessageTemplates({ page, size });
      set({
        templates,
        totalCount: total_count,
        selectedTemplateId: null,
        mode: 'CREATE',
        form: getEmptyForm(),
        menuOpenId: null,
        isLoadingTemplates: false,
        hasLoadedTemplates: true,
        templatesUpdatedAt: Date.now(),
      });
    },

    selectTemplate: (id) => {
      const { selectedTemplateId, templates } = get();
      if (selectedTemplateId === id) {
        set({
          selectedTemplateId: null,
          mode: 'CREATE',
          form: getEmptyForm(),
          menuOpenId: null,
        });
        return;
      }

      const selectedTemplate = templates.find((template) => template.id === id);
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
      const { form, templates, totalCount } = get();
      const title = form.title.trim();
      const content = form.content.trim();

      if (!title || !content) return;

      const type = form.type;

      try {
        const createdTemplate = await createMessageTemplate({
          type,
          title,
          content,
        });
        const nextTemplates = [createdTemplate, ...templates];
        set({
          templates: nextTemplates,
          totalCount: totalCount + 1,
          selectedTemplateId: null,
          mode: 'CREATE',
          form: getEmptyForm(),
          menuOpenId: null,
          templatesUpdatedAt: Date.now(),
        });
      } catch (error) {
        console.error('Failed to create message template:', error);
      }
    },

    updateTemplate: async () => {
      const { selectedTemplateId, form, templates } = get();
      if (!selectedTemplateId) return;

      const title = form.title.trim();
      const content = form.content.trim();
      const type = form.type;
      if (!title || !content) return;

      const selectedTemplate = templates.find(
        (template) => template.id === selectedTemplateId,
      );
      if (!selectedTemplate) return;

      const payload: {
        type?: MessageTemplateType;
        title?: string;
        content?: string;
      } = {};
      if (selectedTemplate.type !== type) payload.type = type;
      if (selectedTemplate.title !== title) payload.title = title;
      if (selectedTemplate.content !== content) payload.content = content;
      if (Object.keys(payload).length === 0) return;

      try {
        const updatedTemplate = await updateMessageTemplate(
          selectedTemplateId,
          payload,
        );
        const nextTemplates = templates.map((template) =>
          template.id === selectedTemplateId ? updatedTemplate : template,
        );

        set({
          templates: nextTemplates,
          form: {
            type: updatedTemplate.type ?? DEFAULT_MESSAGE_TEMPLATE_TYPE,
            title: updatedTemplate.title,
            content: updatedTemplate.content,
          },
          templatesUpdatedAt: Date.now(),
        });
        useToastStore.getState().addToast('success', '템플릿이 수정되었습니다.');
      } catch (error) {
        console.error('Failed to update message template:', error);
        useToastStore
          .getState()
          .addToast('error', '템플릿 수정에 실패했습니다.');
      }
    },

    deleteTemplate: async (id) => {
      const { templates, selectedTemplateId, totalCount } = get();

      try {
        await deleteMessageTemplate(id);
      } catch (error) {
        console.error('Failed to delete message template:', error);
        useToastStore
          .getState()
          .addToast('error', '템플릿 삭제에 실패했습니다.');
        return;
      }

      const nextTemplates = templates.filter((template) => template.id !== id);
      const nextTotalCount = Math.max(0, totalCount - 1);

      if (!nextTemplates.length) {
        set({
          templates: [],
          totalCount: nextTotalCount,
          selectedTemplateId: null,
          mode: 'CREATE',
          form: getEmptyForm(),
          menuOpenId: null,
          templatesUpdatedAt: Date.now(),
        });
        useToastStore.getState().addToast('success', '삭제되었습니다.');
        return;
      }

      if (selectedTemplateId === id) {
        set({
          templates: nextTemplates,
          totalCount: nextTotalCount,
          selectedTemplateId: null,
          mode: 'CREATE',
          form: getEmptyForm(),
          menuOpenId: null,
          templatesUpdatedAt: Date.now(),
        });
        useToastStore.getState().addToast('success', '삭제되었습니다.');
        return;
      }

      set({
        templates: nextTemplates,
        totalCount: nextTotalCount,
        menuOpenId: null,
        templatesUpdatedAt: Date.now(),
      });
      useToastStore.getState().addToast('success', '삭제되었습니다.');
    },
  }),
);
