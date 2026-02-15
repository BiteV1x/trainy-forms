export enum QuestionType {
  TEXT = "TEXT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  DATE = "DATE",
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string;
}

export interface Response {
  id: string;
  formId: string;
  answers: Answer[];
}

export const forms: Form[] = [];
export const responses: Response[] = [];
