import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "./generated";

export interface QuestionState {
  id: string;
  type: QuestionType;
  title: string;
  options: string[];
}

interface FormEditorState {
  title: string;
  description: string;
  questions: QuestionState[];
}

const initialState: FormEditorState = {
  title: "",
  description: "",
  questions: [],
};

export const formEditorSlice = createSlice({
  name: "formEditor",
  initialState,

  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addQuestion: (state, action: PayloadAction<QuestionType>) => {
      const newQuestion: QuestionState = {
        id: Math.random().toString(36).substring(2, 9),
        type: action.payload,
        title: "",
        options:
          action.payload === QuestionType.Radio ||
          action.payload === QuestionType.Checkbox
            ? ["Варіант 1"]
            : [],
      };
      state.questions.push(newQuestion);
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },
    removeOption: (
      state,
      action: PayloadAction<{ id: string; index: number }>,
    ) => {
      const question = state.questions.find((q) => q.id === action.payload.id);
      if (question && question.options) {
        if (question.options.length > 1) {
          question.options.splice(action.payload.index, 1);
        }
      }
    },
    updateQuestion: (
      state,
      action: PayloadAction<{ id: string; title?: string; options?: string[] }>,
    ) => {
      const question = state.questions.find((q) => q.id === action.payload.id);
      if (question) {
        if (action.payload.title !== undefined) {
          question.title = action.payload.title;
        }
        if (action.payload.options !== undefined) {
          question.options = action.payload.options;
        }
      }
    },
    resetForm: () => initialState,
  },
});

export const {
  setTitle,
  setDescription,
  addQuestion,
  removeQuestion,
  removeOption,
  updateQuestion,
  resetForm,
} = formEditorSlice.actions;
